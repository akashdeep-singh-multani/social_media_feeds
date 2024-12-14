import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import { LikeButtonStyled } from '../../components/styled-components/LikeButton.styled';

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
    onLikeToggled({ postId, newLikeStatus }); // Emit the like toggle change
  };

  return (
    <LikeButtonStyled
      className="without-background-button"
      onClick={handleLikeToggle}
      aria-label="Like button"
    >
      {liked ? <FaThumbsUp size={24} /> : <FaRegThumbsUp size={24} />}
      {liked ? 'Liked' : 'Like'}
    </LikeButtonStyled>
  );
};

LikeButton.propTypes = {
  isLiked: PropTypes.bool, // Boolean indicating whether the post is liked
  postId: PropTypes.string.isRequired, // The ID of the post being liked
  onLikeToggled: PropTypes.func.isRequired, // Callback function when like is toggled
};

export default LikeButton;
