import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from '@mui/material';

import { showLoader, hideLoader } from '../../store/actions/loaderActions'; // Import loader actions
import PropTypes from 'prop-types'; // Import PropTypes for validation
import UserProfile from '../../pages/common/UserProfile';
import LikeButton from '../../pages/post/like_button';

import { loadComments } from '../../store/actions/commentActions';
import SocketManagerService from '../../services/socketManagerService';
import PostCommentForm from './comment_form';

const PostCommentList = ({ postId, closeDialog }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);
  const isLoading = useSelector((state) => state.loader.isLoading); // Access loader state from Redux
  const [newCommentReceived, setNewCommentReceived] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const socketManagerService = new SocketManagerService();

  useEffect(() => {
    dispatch(showLoader()); // Show loader when component is mounted
    dispatch(loadComments({ postId }));

    const newCommentSubscription =
      socketManagerService.newPostCommentReceived$.subscribe((comment) =>
        handleNewComment(comment)
      );

    const notificationSubscription =
      socketManagerService.notificationReceived$.subscribe((notification) =>
        handleNotification(notification)
      );

    return () => {
      newCommentSubscription.unsubscribe();
      notificationSubscription.unsubscribe();
      dispatch(hideLoader()); // Hide loader when component is unmounted or socket cleanup occurs
    };
  }, [dispatch, postId]);

  const handleNewComment = (comment) => {
    const commentExists = comments.some((cmnt) => cmnt._id === comment._id);
    if (!commentExists && !newCommentReceived) {
      setNewCommentReceived(true);
      dispatch(showLoader()); // Show loader when new comment is received
      dispatch(loadComments({ postId }));
      setTimeout(() => {
        setNewCommentReceived(false);
        dispatch(hideLoader()); // Hide loader after a delay
      }, 1000);
    }
  };

  const handleNotification = (notification) => {
    setSnackbarMessage(notification.message);
    setOpenSnackbar(true);
  };

  return (
    <>
      <Dialog open={true} onClose={closeDialog}>
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          <div className="comments-container">
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment._id} className="flex-row" aria-live="polite">
                  <UserProfile action="comment" commenter_info={comment} />
                  <LikeButton commentId={comment._id} />
                </div>
              ))}
            </div>
            <div className="flex-end-column">
              <PostCommentForm postId={postId} />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button onClick={closeDialog}>Close</button>
        </DialogActions>

        {/* Loader shown when isLoading is true */}
        {isLoading && (
          <div className="loader-overlay">
            <CircularProgress />
          </div>
        )}
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </>
  );
};

// Adding PropTypes for props validation
PostCommentList.propTypes = {
  postId: PropTypes.number.isRequired, // postId should be a number and is required
  closeDialog: PropTypes.func.isRequired, // closeDialog should be a function and is required
};

export default PostCommentList;
