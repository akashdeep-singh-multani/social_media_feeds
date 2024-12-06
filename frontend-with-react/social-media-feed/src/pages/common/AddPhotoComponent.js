import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import SubmitButton from '../../components/SubmitButton';
import FileInput from '../../components/FileInput';
import ImagePreview from '../../components/ImagePreview';

const AddPhotoComponent = ({
  onPhotoSelection,
  displayImagePreview = true,
  actionName = 'Add',
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Handle the "Add Photo" button click
  const handleAddPhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click event
    }
  };

  // Handle when a file is selected
  const onFileSelected = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setSelectedImage(file); // Store the selected image file
      setImagePreviewUrl(URL.createObjectURL(file)); // Generate a preview URL
    } else {
      setSelectedImage(null); // If no file is selected, reset the state
      setImagePreviewUrl(null);
    }
    onPhotoSelection(file); // Callback to pass the selected file
  };

  return (
    <div>
      {/* Button to trigger file input */}
      <SubmitButton
        className="feature_buttons"
        onClick={handleAddPhotoClick}
        aria-label="Add Photo"
      >
        {actionName} Photo
      </SubmitButton>

      {/* Hidden file input */}
      <FileInput
        ref={fileInputRef}
        onFileSelected={onFileSelected}
        id="file-input"
        style={{ display: 'none' }}
        ariaLabel="Select a photo to upload"
      />

      {/* Show image preview if a photo is selected */}
      {displayImagePreview && selectedImage && (
        <ImagePreview imageUrl={imagePreviewUrl} altText="Image Preview" />
      )}
    </div>
  );
};

AddPhotoComponent.propTypes = {
  onPhotoSelection: PropTypes.func.isRequired, // Required callback for the photo selection
  displayImagePreview: PropTypes.bool, // Boolean to toggle the image preview
  actionName: PropTypes.string, // Action name to display on the button (default is "Add")
};

export default AddPhotoComponent;
