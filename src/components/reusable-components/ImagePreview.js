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
  imageUrl: PropTypes.string,
  altText: PropTypes.string,
  style: PropTypes.object,
};

ImagePreview.defaultProps = {
  imageUrl: '',
  altText: 'Image preview',
  style: { maxWidth: '100%', height: 'auto' },
};

export default ImagePreview;
