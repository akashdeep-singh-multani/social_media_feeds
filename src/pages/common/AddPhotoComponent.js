import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import SubmitButton from '../../components/reusable-components/SubmitButton';
import FileInput from '../../components/reusable-components/FileInput';
import ImagePreview from '../../components/reusable-components/ImagePreview';

const AddPhotoComponent = ({
  onPhotoSelection,
  displayImagePreview = true,
  actionName = 'Add',
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Function to handle "Add Photo" button click
  const handleAddPhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Open file input dialog
    }
  };

  // Handler for file selection
  const onFileSelected = (event) => {
    // Make sure event.target and event.target.files are accessible
    const file = event?.target?.files ? event.target.files[0] : null;

    if (file) {
      // Update the image preview and set selected image
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));

      // Callback to parent (onPhotoSelection) if provided
      if (onPhotoSelection) {
        onPhotoSelection(file);
      }
    } else {
      setSelectedImage(null);
      setImagePreviewUrl(null);
    }
  };

  return (
    <div>
      <SubmitButton
        className="feature_buttons"
        onClick={handleAddPhotoClick}
        aria-label="Add Photo"
      >
        {actionName} Photo
      </SubmitButton>

      <FileInput
        onFileSelected={onFileSelected}
        id="file-input"
        style={{ display: 'none' }}
        ariaLabel="Select a photo to upload"
        ref={fileInputRef} // Pass ref to the FileInput
      />

      {/* Render image preview if selected */}
      {displayImagePreview && selectedImage && (
        <ImagePreview imageUrl={imagePreviewUrl} altText="Image Preview" />
      )}
    </div>
  );
};

AddPhotoComponent.propTypes = {
  onPhotoSelection: PropTypes.func.isRequired,
  displayImagePreview: PropTypes.bool,
  actionName: PropTypes.string,
};

export default AddPhotoComponent;
