import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa'; // Using React Icons for the thumbs up icon

// Reusable LikeButton component
const LikeButton = ({ isLiked, postId, onLikeToggled }) => {
  const [liked, setLiked] = useState(isLiked);

  // Side effect to sync the initial isLiked value with the state
  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const handleLikeToggle = () => {
    if (liked === undefined) return; // Avoid toggle if undefined
    const newLikeStatus = !liked;
    setLiked(newLikeStatus);
    onLikeToggled(postId, newLikeStatus); // Emit the like toggle change
  };

  return (
    <button
      className="without-background-button"
      onClick={handleLikeToggle}
      aria-label="Like button"
    >
      {liked ? (
        <FaThumbsUp size={24} /> // Display filled thumbs-up icon when liked
      ) : (
        <FaRegThumbsUp size={24} /> // Display outlined thumbs-up icon when not liked
      )}
      {liked ? 'Liked' : 'Like'}
    </button>
  );
};

// Prop types validation
LikeButton.propTypes = {
  isLiked: PropTypes.bool, // Boolean indicating whether the post is liked
  postId: PropTypes.string.isRequired, // The ID of the post being liked
  onLikeToggled: PropTypes.func.isRequired, // Callback function when like is toggled
};

export default LikeButton;
