import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

// Wrap FileInput with forwardRef to handle refs properly
const FileInput = forwardRef(
  ({ onFileSelected, ariaLabel, accept, style, id }, ref) => {
    const handleFileChange = (event) => {
      // Check if files exist before passing to the onFileSelected handler
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
  onFileSelected: PropTypes.func.isRequired, // Function to handle file selection
  ariaLabel: PropTypes.string, // For accessibility
  accept: PropTypes.string, // File types to accept (e.g., 'image/*')
  style: PropTypes.object, // Optional styles
  id: PropTypes.string, // Optional ID for the input element
};

FileInput.defaultProps = {
  ariaLabel: 'Select a photo to upload',
  accept: 'image/*',
  style: { display: 'none' },
  id: 'file-input', // Default ID if not provided
};

export default FileInput;
