import React from 'react';
import PropTypes from 'prop-types';

const ImagePreview = ({ imageUrl, altText, style }) => {
  if (!imageUrl) return null;

  return (
    <div>
      <img
        src={imageUrl}
        alt={altText}
        style={style}
        aria-label="Image preview of the selected photo"
      />
    </div>
  );
};

ImagePreview.propTypes = {
  imageUrl: PropTypes.string, // URL of the image to display
  altText: PropTypes.string, // Alt text for the image
  style: PropTypes.object, // Optional styling for the image
};

ImagePreview.defaultProps = {
  imageUrl: '',
  altText: 'Image preview',
  style: { maxWidth: '100%', height: 'auto' },
};

export default ImagePreview;
