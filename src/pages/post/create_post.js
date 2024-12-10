import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { hideLoader, showLoader } from '../../store/actions/loaderActions';
import { addPost } from '../../store/actions/postActions';
import { POST_ARIA_LABEL, POST_CONTENT_PLACEHOLDER } from '../../constants';
import TextArea from '../../components/reusable-components/TextArea';
import SubmitButton from '../../components/reusable-components/SubmitButton';
import AddPhoto from '../common/AddPhotoComponent';

const CreatePost = () => {
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useUser();

  const handleTextChange = (event) => {
    setPostText(event.target.value);
  };

  const handlePhotoSelection = (imageObj) => {
    setSelectedImage(imageObj);
  };

  const handleCreatePostSubmission = () => {
    const formData = new FormData();
    formData.append('text', postText);
    formData.append('userId', user._id.toString());
    if (selectedImage) {
      formData.append('image', selectedImage);
    }
    dispatch(showLoader());
    dispatch(addPost(formData))
      .then(() => {
        dispatch(hideLoader());
        navigate('/user_post');
      })
      .catch(() => {
        dispatch(hideLoader());
      });
  };

  return (
    <div className="page_style">
      <TextArea
        value={postText}
        onChange={handleTextChange}
        placeholder={POST_CONTENT_PLACEHOLDER}
        className="post_textarea"
        rows={6}
        cols={50}
        aria-label={POST_ARIA_LABEL}
      />
      <div className="button-container">
        <SubmitButton
          onClick={handleCreatePostSubmission}
          ariaLabel="Submit your Post"
        >
          Submit
        </SubmitButton>
        <AddPhoto
          onPhotoSelection={handlePhotoSelection}
          ariaLabel="Add a photo"
        />
      </div>
    </div>
  );
};

export default CreatePost;
