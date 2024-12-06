import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaComment } from 'react-icons/fa'; // Using react-icons for comment icon
import Modal from 'react-modal'; // React Modal for dialog functionality
import PostCommentList from '../post/comment_list'; // Import your PostCommentList component

// React version of CommentButton component
const CommentButton = ({ postId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle opening the modal dialog
  const handleCommentClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="dialog-content">
      <button
        className="without-background-button"
        onClick={handleCommentClick}
        aria-label="Add a comment"
      >
        <FaComment size={24} />
      </button>

      {/* Modal for comment list */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Post Comments"
        className="full-screen-dialog" // Custom styles for full-screen modal
        overlayClassName="modal-overlay" // Custom overlay style
      >
        <PostCommentList postId={postId} onClose={handleCloseModal} />
      </Modal>
    </div>
  );
};

// Prop types for validation
CommentButton.propTypes = {
  postId: PropTypes.number.isRequired, // postId passed as prop
};

export default CommentButton;
