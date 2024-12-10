import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadPost } from '../../store/actions/postActions';
import {
  getPostLikes,
  createPostLike,
  deletePostLike,
} from '../../store/actions/likeActions';
import {
  selectPosts,
  selectPostsWithLikes,
} from '../../store/selectors/postSelectors';

import SocketManagerService from '../../services/socketManagerService';
import { environment } from '../../config/environment';
import LikeButton from './like_button';
import CommentButton from './comment_button';
import UserProfile from '../common/UserProfile';
import { hideLoader, showLoader } from '../../store/actions/loaderActions';
import { showSuccessToast } from '../toast/ToastNotifications';
import { useUser } from '../../hooks/useUser';
import { PostStyled } from '../../components/styled-components/post.styled';
import PostCommentList from './comment_list';

const UserPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postsWithLikes, setPostsWithLikes] = useState([]);
  const [newPostReceived, setNewPostReceived] = useState(false);
  const posts = useSelector(selectPosts);
  const postLikes = useSelector(selectPostsWithLikes);
  const user = useUser();
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);

  useEffect(() => {
    setPostsWithLikes(
      posts.map((post) => ({
        ...post,
        isLiked: postLikes.some(
          (like) => String(like.postId) === String(post._id)
        ),
      }))
    );
  }, [posts, postLikes]);

  useEffect(() => {
    dispatch(loadPost());
    posts.forEach((post) => {
      dispatch(getPostLikes({ postId: String(post._id) }));
    });
    const newPostReceived$ = SocketManagerService.newPostReceivedSource;
    newPostReceived$?.subscribe((newPost) => handleNewPost(newPost));

    const notificationReceived$ =
      SocketManagerService.notificationReceivedSource;
    notificationReceived$?.subscribe((notification) =>
      handleNotification(notification)
    );
  }, [dispatch, user._id]);

  const handleNewPost = (newPost) => {
    if (!posts.some((post) => post._id === newPost._id) && !newPostReceived) {
      setNewPostReceived(true);
      dispatch(loadPost({ offset: 0, limit: 10, userId: user._id }));
      setTimeout(() => setNewPostReceived(false), 1000);
    }
  };

  const handleNotification = (notification) => {
    showSuccessToast(notification.message);
  };

  const handleCreatePostClick = () => {
    navigate('/create_post');
  };

  const toggleLike = (event) => {
    const { postId, isLiked } = event;
    const likeInfo = postLikes.find((like) => like.postId === postId);
    dispatch(showLoader());
    if (!isLiked && likeInfo) {
      dispatch(deletePostLike({ postId, likeId: likeInfo._id }))
        .then(() => {
          dispatch(hideLoader());
        })
        .catch((error) => {
          dispatch(hideLoader());
          throw error;
        });
    } else {
      dispatch(createPostLike({ postId, userId: user._id }))
        .then(() => {
          dispatch(hideLoader());
        })
        .catch((error) => {
          dispatch(hideLoader());
          throw error;
        });
    }
  };

  const handleCommentButtonClick = () => {
    setIsCommentDialogOpen(true); // Open the comment dialog
  };

  const handleCloseCommentDialog = () => {
    setIsCommentDialogOpen(false);
  };

  const trackByPostId = (index, post) => post._id.toString();

  return (
    <PostStyled.FeedContainer>
      <div>
        <PostStyled.CreatePostButton
          onClick={handleCreatePostClick}
          aria-label="Create a new post"
        >
          Create Post
        </PostStyled.CreatePostButton>
      </div>
      <PostStyled.PostList>
        {postsWithLikes.length > 0 ? (
          postsWithLikes.map((post, index) => (
            <PostStyled.PostCard key={trackByPostId(index, post)}>
              <UserProfile posterInfo={post.userId} action="feed" />
              <PostStyled.PostImage>
                <img
                  src={`${environment.BASE_URL}uploads/${post.image}`}
                  alt="Post"
                  aria-label="Post image"
                />
              </PostStyled.PostImage>
              <PostStyled.PostActions>
                <LikeButton
                  isLiked={post.isLiked}
                  postId={post._id}
                  onLikeToggled={toggleLike}
                  aria-label="Like this post"
                />
                <CommentButton
                  postId={post._id}
                  aria-label="Comment on this post"
                  onClick={handleCommentButtonClick}
                />
              </PostStyled.PostActions>
              <PostStyled.PostText>{post.text}</PostStyled.PostText>
            </PostStyled.PostCard>
          ))
        ) : (
          <PostStyled.NoPosts>
            <p>No Posts yet</p>
          </PostStyled.NoPosts>
        )}
      </PostStyled.PostList>
      {isCommentDialogOpen && (
        <PostCommentList
          postId={postsWithLikes[0]._id} // Pass postId as needed
          closeDialog={handleCloseCommentDialog} // Pass the close dialog function
        />
      )}
    </PostStyled.FeedContainer>
  );
};

export default UserPost;
