import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useUser } from '../../hooks/useUser';
import { addComment } from '../../store/actions/commentActions';
import { showLoader, hideLoader } from '../../store/actions/loaderActions';
import { PropTypes } from 'prop-types';

import {
  CommentFormWrapper,
  CommentInputWrapper,
  CommentInput,
  SubmitButtonWrapper,
  SubmitButton,
} from '../../components/styled-components/PostCommentForm.styled';

const PostCommentForm = ({ postId }) => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const userId = user?._id;

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return;

    dispatch(showLoader());

    const newComment = {
      postId,
      text: comment,
      commenterId: userId,
    };

    try {
      dispatch(addComment(newComment));
      setComment(''); // Reset comment field after successful submission
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      dispatch(hideLoader()); // Hide loader after action completion
    }
  };

  return (
    <CommentFormWrapper onSubmit={handleSubmit}>
      <CommentInputWrapper>
        <CommentInput
          formControlName="comment"
          placeholder="Add a comment"
          value={comment}
          onChange={handleCommentChange}
        />
      </CommentInputWrapper>

      <SubmitButtonWrapper>
        <SubmitButton label="Post" type="submit" disabled={!comment.trim()}>
          Post
        </SubmitButton>
      </SubmitButtonWrapper>
    </CommentFormWrapper>
  );
};

PostCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default PostCommentForm;
