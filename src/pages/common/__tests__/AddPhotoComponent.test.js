import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AddPhotoComponent from '../AddPhotoComponent';

describe('AddPhotoComponent', () => {
  test('should render Add Photo button', () => {
    render(<AddPhotoComponent onPhotoSelection={jest.fn()} />);

    // Check if the button with text "Add Photo" is rendered
    expect(screen.getByText('Add Photo')).toBeInTheDocument();
  });

  test('should open file input dialog when Add Photo button is clicked', () => {
    render(<AddPhotoComponent onPhotoSelection={jest.fn()} />);

    const addButton = screen.getByText('Add Photo');
    fireEvent.click(addButton);

    // Check if the file input is triggered by checking the presence of file input
    const fileInput = screen.getByLabelText('Select a photo to upload');
    expect(fileInput).toBeInTheDocument();
  });

  test('should show image preview when a file is selected', async () => {
    const file = new File([''], 'test-image.jpg', { type: 'image/jpeg' });

    const { container } = render(
      <AddPhotoComponent onPhotoSelection={jest.fn()} />
    );

    // Simulate file selection
    const fileInput = screen.getByLabelText('Select a photo to upload');
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Check if image preview is displayed
    await waitFor(() => {
      expect(container.querySelector('img')).toBeInTheDocument();
      expect(container.querySelector('img').src).toContain('blob:');
    });
  });

  test('should call onPhotoSelection with selected file', async () => {
    const file = new File([''], 'test-image.jpg', { type: 'image/jpeg' });
    const onPhotoSelectionMock = jest.fn();

    render(<AddPhotoComponent onPhotoSelection={onPhotoSelectionMock} />);

    // Simulate file selection
    const fileInput = screen.getByLabelText('Select a photo to upload');
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Check if onPhotoSelection is called with the selected file
    await waitFor(() => {
      expect(onPhotoSelectionMock).toHaveBeenCalledWith(file);
    });
  });

  test('should not show image preview if displayImagePreview is false', () => {
    render(
      <AddPhotoComponent
        onPhotoSelection={jest.fn()}
        displayImagePreview={false}
      />
    );

    const file = new File([''], 'test-image.jpg', { type: 'image/jpeg' });

    // Simulate file selection
    const fileInput = screen.getByLabelText('Select a photo to upload');
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Check that image preview is not shown
    expect(screen.queryByAltText('Image Preview')).not.toBeInTheDocument();
  });

  test('should allow custom action name', () => {
    render(
      <AddPhotoComponent onPhotoSelection={jest.fn()} actionName="Upload" />
    );

    // Check if the button text is "Upload Photo" instead of default "Add Photo"
    expect(screen.getByText('Upload Photo')).toBeInTheDocument();
  });
});
