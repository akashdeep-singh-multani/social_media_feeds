import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showLoader, hideLoader } from '../../store/actions/loaderActions'; // Import loader actions
import PropTypes from 'prop-types'; // Import PropTypes for validation
import UserProfile from '../../pages/common/UserProfile';
// import LikeButton from '../../pages/post/like_button';

import { loadComments } from '../../store/actions/commentActions';
import SocketManagerService from '../../services/socketManagerService';
import PostCommentForm from './comment_form';
import {
  CloseButton,
  CommentItemWrapper,
  CommentsList,
  DialogActionsWrapper,
  DialogContentWrapper,
  DialogTitleWrapper,
  DialogWrapper,
  SnackbarWrapper,
} from '../../components/styled-components/CommentList.styled';

const PostCommentList = ({ postId, closeDialog }) => {
  const dispatch = useDispatch();

  const comments = useSelector((state) => {
    return state?.comment?.comments.data ? state?.comment?.comments.data : [];
  });
  // const isLoading = useSelector((state) => state.loader.isLoading); // Access loader state from Redux
  const [newCommentReceived, setNewCommentReceived] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(true);
  const socketManagerService = SocketManagerService();
  const dialogRef = useRef(null);

  useEffect(() => {
    // dispatch(showLoader()); // Show loader when component is mounted
    dispatch(loadComments(postId));

    const newCommentSubscription =
      socketManagerService.newPostCommentReceivedSource.subscribe((comment) => {
        return handleNewComment(comment);
      });

    const notificationSubscription =
      socketManagerService.notificationReceivedSource.subscribe(
        (notification) => handleNotification(notification)
      );

    return () => {
      newCommentSubscription.unsubscribe();
      notificationSubscription.unsubscribe();
      dispatch(hideLoader()); // Hide loader when component is unmounted or socket cleanup occurs
    };
  }, [dispatch, postId]);

  useEffect(() => {
    if (dialogOpen && dialogRef.current) {
      dialogRef.current.focus(); // Set focus to dialog when opened
    }
  }, [dialogOpen]);

  const handleNewComment = (comment) => {
    const commentExists = comments.some((cmnt) => cmnt._id === comment._id);
    if (!commentExists && !newCommentReceived) {
      setNewCommentReceived(true);
      dispatch(showLoader()); // Show loader when new comment is received
      dispatch(loadComments(postId));
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

  const handleCloseDialog = () => {
    setDialogOpen(false);
    if (closeDialog) {
      closeDialog();
    }
  };

  return (
    <>
      <DialogWrapper
        open={dialogOpen}
        fullWidth
        maxWidth="md"
        ref={dialogRef}
        tabIndex="-1"
      >
        <DialogTitleWrapper>Comments</DialogTitleWrapper>

        <DialogContentWrapper>
          <CommentsList>
            {comments.map((comment) => (
              <CommentItemWrapper key={comment._id}>
                <UserProfile action="comment" commenterInfo={comment} />
              </CommentItemWrapper>
            ))}
          </CommentsList>

          <PostCommentForm postId={postId} />
        </DialogContentWrapper>

        <DialogActionsWrapper>
          <CloseButton onClick={handleCloseDialog}>Close</CloseButton>
        </DialogActionsWrapper>
      </DialogWrapper>

      {/* Snackbar for notifications */}
      <SnackbarWrapper
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </>
  );
};

// Adding PropTypes for props validation
PostCommentList.propTypes = {
  postId: PropTypes.string.isRequired, // postId should be a number and is required
  closeDialog: PropTypes.func, // closeDialog should be a function and is required
};

export default PostCommentList;
