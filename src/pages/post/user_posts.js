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
  selectPostLikes,
  selectPosts,
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
import { handleError } from '../../utils/errorHandler';
import { ERROR_MESSAGES } from '../../constants';

const UserPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postsWithLikes, setPostsWithLikes] = useState([]);
  const [newPostReceived, setNewPostReceived] = useState(false);
  const posts = useSelector(selectPosts);
  const postLikes = useSelector(selectPostLikes);
  const user = useUser();
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);
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
    const fetchPostsAndLikes = async () => {
      try {
        // Step 1: Dispatch loadPost action to load posts
        await dispatch(loadPost());

        // Step 2: After posts are loaded, execute the subsequent code
        posts.forEach((post) => {
          dispatch(getPostLikes({ postId: String(post._id) }));
        });

        // Set the flag to true once posts are loaded
        setIsPostsLoaded(true);

        // Step 3: Setup socket listeners
        const newPostReceived$ = SocketManagerService.newPostReceivedSource;
        newPostReceived$?.subscribe((newPost) => handleNewPost(newPost));

        const notificationReceived$ =
          SocketManagerService.notificationReceivedSource;
        notificationReceived$?.subscribe((notification) =>
          handleNotification(notification)
        );
      } catch (error) {
        handleError(error, ERROR_MESSAGES.LOAD_POST_FAILURE);
      }
    };

    // Call the asynchronous function
    if (!isPostsLoaded) {
      fetchPostsAndLikes();
    }

    // Cleanup socket subscriptions on component unmount
    return () => {
      // Unsubscribe from socket events
      const newPostReceived$ = SocketManagerService.newPostReceivedSource;
      const notificationReceived$ =
        SocketManagerService.notificationReceivedSource;
      newPostReceived$?.unsubscribe();
      notificationReceived$?.unsubscribe();
    };
  }, [dispatch, posts]); // Dependency array includes `posts` to trigger effect when posts change

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
    const { postId, newLikeStatus } = event; // Get new like status

    // Find the likeInfo for the post
    const likeInfo = postLikes.find((like) => like?.postId === postId);

    // Dispatch show loader action
    dispatch(showLoader());

    if (newLikeStatus && !likeInfo) {
      // If liked and no existing like record, create a new like
      const request = { postId, userId: user?.user?._id };
      dispatch(createPostLike(request))
        .then(() => {
          // Update postsWithLikes state to reflect the like status change
          setPostsWithLikes((prevPosts) =>
            prevPosts.map((post) =>
              post._id === postId ? { ...post, isLiked: true } : post
            )
          );
          dispatch(hideLoader());
        })
        .catch((error) => {
          dispatch(hideLoader());
          handleError(error);
        });
    } else if (!newLikeStatus && likeInfo) {
      // If unliked and there is a like record, delete the like
      dispatch(deletePostLike({ postId, likeId: likeInfo?._id }))
        .then(() => {
          // Update postsWithLikes state to reflect the like status change
          setPostsWithLikes((prevPosts) =>
            prevPosts.map((post) =>
              post._id === postId ? { ...post, isLiked: false } : post
            )
          );
          dispatch(hideLoader());
        })
        .catch((error) => {
          dispatch(hideLoader());
          handleError(error);
        });
    }
  };

  const handleCommentButtonClick = () => {
    setIsCommentDialogOpen(true); // Open the comment dialog
  };

  const trackByPostId = (index, post) => post._id.toString();

  return (
    <div>
      {isPostsLoaded ? (
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
                      isLiked={post?.isLiked}
                      postId={post?._id}
                      onLikeToggled={toggleLike} // Pass the toggle function
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
              postId={parseInt(postsWithLikes[0]._id)} // Pass postId as needed
              closeDialog={() => setIsCommentDialogOpen(false)}
            />
          )}
        </PostStyled.FeedContainer>
      ) : (
        <div>Loading posts...</div> // Display loading message if posts are still loading
      )}
    </div>
  );
};

export default UserPost;
