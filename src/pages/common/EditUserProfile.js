import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setToken } from '../../services/authService';

import AddPhotoComponent from './AddPhotoComponent';
import UserPost from '../post/user_posts';
import { showErrorToast, showSuccessToast } from '../toast/ToastNotifications';
import { loadPost } from '../../store/actions/postActions';
import { environment } from '../../config/environment';
import { useUser } from '../../hooks/useUser';
import { updateProfile } from '../../services/userService';
import {
  EditUserProfileContainer,
  EditUserProfileImage,
  EditUserProfileInputContainer,
  EditUserProfileInputField,
  EditUserProfileParentContainer,
} from '../../components/styled-components/EditUserProfile.styled';
import { SubmitButton } from '../../components/styled-components/PostCommentForm.styled';
import { ERROR_MESSAGES, INFO_MESSAGES } from '../../constants';

const EditUserProfile = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [username, setUsername] = useState('');
  const [isInputChanged, setIsInputChanged] = useState(false);
  const [selectedImageObj, setSelectedImageObj] = useState(null);
  const [myProfileObj, setMyProfileObj] = useState({ userId: -1 });
  const [cachedUsername, setCachedUsername] = useState('');
  const user = useUser(); // Custom hook to get the current logged-in user
  const dispatch = useDispatch();

  // Initialize the component with the user data
  useEffect(() => {
    if (user) {
      updateUserDetails(user);
    }
  }, [user]); // Dependency on user: will trigger whenever user data changes

  const updateUserDetails = (user) => {
    setUsername(user?.user?.username);
    setCachedUsername(user?.user?.username);
    setMyProfileObj({ userId: user?.user?._id });
    setAvatarUrl(`${environment.BASE_URL}uploads/${user?.user?.image}`);
  };

  // Function to handle the photo selection
  const onSelectedImageObj = (imageObj) => {
    setSelectedImageObj(imageObj); // Store the selected image
    handleProfileEdit(imageObj); // Immediately update profile after selection
  };

  // Function to handle the username input change
  const onProfileNameChange = (event) => {
    const input = event.target.value;
    if (cachedUsername === input) {
      setIsInputChanged(false);
      setCachedUsername(input);
      return;
    }
    setUsername(input);
    setIsInputChanged(true);
  };

  // Function to save the changes (image & username)
  const handleProfileEdit = (imageObj = selectedImageObj) => {
    const formData = new FormData();
    if (isInputChanged) {
      formData.append('username', username);
    }
    if (imageObj) {
      formData.append('image', imageObj); // Append the selected image
    }
    formData.append('userId', user?.user?._id.toString());

    updateProfile(formData)
      .then((response) => {
        if (response.status) {
          const newAvatarUrl = `${environment.BASE_URL}uploads/${response.data.user.image}`;
          setAvatarUrl(newAvatarUrl);
          const newToken = response.data.token;
          dispatch(loadPost());
          setToken(newToken);
          showSuccessToast(INFO_MESSAGES.PROFILE_UPDATION_SUCCESSFUL);
        } else {
          showErrorToast(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
        }
      })
      .catch((error) => {
        showErrorToast(error.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG);
      });
  };

  return (
    <EditUserProfileParentContainer>
      <EditUserProfileContainer>
        <EditUserProfileImage
          src={avatarUrl} // Render the avatar using the current avatarUrl
          className="profile-avatar"
          alt="Profile avatar"
        />
        <AddPhotoComponent
          displayImagePreview={false}
          actionName="Edit"
          onPhotoSelection={onSelectedImageObj} // Immediately call onSelectedImageObj
          aria-label="Edit profile photo"
        />
        <EditUserProfileInputContainer>
          <EditUserProfileInputField
            value={username}
            type="text"
            className="edit-input"
            onInput={onProfileNameChange}
            aria-label="Edit username"
          />
          {isInputChanged && (
            <SubmitButton
              className="feature_buttons"
              onClick={handleProfileEdit} // Save the username change
              aria-label="Save profile details"
            >
              Save
            </SubmitButton>
          )}
        </EditUserProfileInputContainer>
      </EditUserProfileContainer>
      <div className="profile-posts-container">
        <UserPost
          myProfileObj={myProfileObj}
          aria-label="User's all posts section"
        />
      </div>
    </EditUserProfileParentContainer>
  );
};

export default EditUserProfile;
