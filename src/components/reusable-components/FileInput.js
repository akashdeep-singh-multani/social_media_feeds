import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const FileInput = forwardRef(
  ({ onFileSelected, ariaLabel, accept, style, id }, ref) => {
    const handleFileChange = (event) => {
      if (onFileSelected && event.target.files) {
        onFileSelected(event);
      }
    };

    return (
      <input
        ref={ref}
        type="file"
        onChange={handleFileChange}
        accept={accept}
        style={style}
        aria-label={ariaLabel}
        id={id}
      />
    );
  }
);

FileInput.displayName = 'FileInput';

FileInput.propTypes = {
  onFileSelected: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  accept: PropTypes.string,
  style: PropTypes.object,
  id: PropTypes.string,
};

FileInput.defaultProps = {
  ariaLabel: 'Select a photo to upload',
  accept: 'image/*',
  style: { display: 'none' },
  id: 'file-input', // Default ID if not provided
};

export default FileInput;
