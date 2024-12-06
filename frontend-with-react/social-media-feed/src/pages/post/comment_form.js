import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useUser } from '../../hooks/useUser'; // assuming useUser is a custom hook
import { addComment } from '../../store/actions/commentActions';
import { showLoader, hideLoader } from '../../store/actions/loaderActions'; // Redux actions for loader
import SubmitButton from '../../components/SubmitButton';
import InputField from '../../components/InputField';
import { PropTypes } from 'prop-types';

const PostCommentForm = ({ postId }) => {
  const { user } = useUser(); // Assuming user is an object with user details
  const dispatch = useDispatch();
  // Local state for the form field
  const [comment, setComment] = useState('');

  const userId = user?._id;

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return;

    dispatch(showLoader()); // Show loader before submitting the comment

    const newComment = {
      postId,
      text: comment,
      commenterId: userId,
    };

    try {
      // Dispatch action to add comment (assuming you handle this in your store)
      dispatch(addComment(newComment));
      setComment(''); // Reset comment field after successful submission
    } catch (error) {
      console.error('Error adding comment:', error);
      // You might want to show an error notification here
    } finally {
      dispatch(hideLoader()); // Hide loader after the action is complete
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-labelledby="Comments form heading">
      <InputField
        formControlName="comment"
        placeholder="Add a comment"
        value={comment}
        onChange={handleCommentChange}
      />
      <SubmitButton
        label="Post a comment"
        onClick={handleSubmit} // Disable button if comment is empty or loading is in progress
      />
    </form>
  );
};

PostCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default PostCommentForm;
