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

const UserPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postsWithLikes, setPostsWithLikes] = useState([]);
  const [newPostReceived, setNewPostReceived] = useState(false);
  const posts = useSelector(selectPosts);
  const postLikes = useSelector(selectPostsWithLikes);
  // const user_id = useSelector((state) => state.auth.user_id); // Assuming user info is in auth state
  const user = useUser();
  console.log('user: ' + JSON.stringify(user));
  // const offset = environment.POST_OFFSET;
  // const limit = environment.POST_LIMIT;

  // Combine posts with their likes
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

  // Load posts and post likes
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

  // Handle new post arrival
  const handleNewPost = (newPost) => {
    if (!posts.some((post) => post._id === newPost._id) && !newPostReceived) {
      setNewPostReceived(true);
      dispatch(loadPost({ offset: 0, limit: 10, userId: user._id }));
      setTimeout(() => setNewPostReceived(false), 1000);
    }
  };

  // Handle incoming notifications
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

  const trackByPostId = (index, post) => post._id.toString();

  return (
    <div className="page_style">
      <div className="feed_buttons">
        <button
          className="feature_buttons"
          onClick={handleCreatePostClick}
          aria-label="Create a new post"
        >
          Create Post
        </button>
      </div>
      <div className="card-container">
        {postsWithLikes.length > 0 ? (
          postsWithLikes.map((post, index) => (
            <div key={trackByPostId(index, post)} className="responsive-card">
              <UserProfile
                posterInfo={post.userId}
                action="feed"
                aria-label="User profile avatar"
              />
              <div className="image_container">
                <img
                  src={`${environment.BASE_URL}uploads/${post.image}`}
                  className="post_image"
                  alt="Post"
                  aria-label="Image of the post"
                />
              </div>
              <div className="mat-card-actions">
                <LikeButton
                  isLiked={post.isLiked}
                  postId={post._id}
                  onLikeToggled={toggleLike}
                  aria-label="Like this post"
                />
                <CommentButton
                  aria-label="Add comment to this post"
                  postId={post._id}
                />
              </div>
              <div className="mat-card-content">{post.text}</div>
            </div>
          ))
        ) : (
          <div aria-live="polite">
            <p>No Posts yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

// UserPost.propTypes = {
//   myProfileObj: PropTypes.shape({
//     userId: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default UserPost;
