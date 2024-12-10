import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { environment } from '../../config/environment'; // Assuming you have this in your environment
import { useUser } from '../../hooks/useUser'; // Use the useUser hook to get the user info
import '../../styles/css/UserProfile.css';

const UserProfile = ({ commenterInfo, action, posterInfo }) => {
  const { user } = useUser(); // Using the useUser hook to get the logged-in user
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [avatarImage, setAvatarImage] = useState('');

  useEffect(() => {
    if (action === 'feed') {
      getPostUserInfo();
    } else if (action === 'comment') {
      getCommentUserInfo();
    } else if (user) {
      setTitle(user.username); // Using the user object from context
      setAvatarImage(`${environment.BASE_URL}uploads/${user.image}`);
    }
  }, [action, commenterInfo, posterInfo, user]);

  const getPostUserInfo = () => {
    if (posterInfo) {
      setAvatarImage(`${environment.BASE_URL}uploads/${posterInfo.image}`);
      setTitle(posterInfo.username);
    } else {
      setAvatarImage('https://via.placeholder.com/40'); // Fallback image if posterInfo is missing
      setTitle('Unknown User'); // Fallback title if posterInfo is missing
    }
  };

  const getCommentUserInfo = () => {
    if (commenterInfo && commenterInfo.commenterInfo) {
      setAvatarImage(
        `${environment.BASE_URL}uploads/${commenterInfo.commenterInfo.image}`
      );
      setTitle(commenterInfo.commenterInfo.username);
      setSubtitle(commenterInfo.text);
    } else {
      setAvatarImage('https://via.placeholder.com/40'); // Fallback image if commenterInfo is missing
      setTitle('Anonymous User'); // Fallback title if commenterInfo is missing
      setSubtitle('No comment available');
    }
  };

  // Display a loading state if the user object is not available
  if (!user && !commenterInfo && !posterInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile-header">
      <img
        src={avatarImage}
        alt="User Avatar"
        className="avatar"
        aria-label="avatar image"
      />
      <div className="user-info">
        <h2 className="profile-title" aria-label="Profile Name">
          {title}
        </h2>
        {subtitle && (
          <h3 className="profile-subtitle" aria-label="Profile description">
            {subtitle}
          </h3>
        )}
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  commenterInfo: PropTypes.shape({
    commenterInfo: PropTypes.shape({
      image: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
    text: PropTypes.string.isRequired,
  }),
  action: PropTypes.string,
  posterInfo: PropTypes.shape({
    image: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
};

export default UserProfile;
