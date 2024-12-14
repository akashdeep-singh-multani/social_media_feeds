import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import UserPost from './pages/post/user_posts';
import CreatePost from './pages/post/create_post';
import EditUserProfile from './pages/common/EditUserProfile';
import useSessionTimeout from './hooks/useSessionTimeout';
import PrivateRoute from './pages/PrivateRoute';

const RouterConfig = () => {
  useSessionTimeout();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoute />}>
        <Route path="/user_post" element={<UserPost />} />
        <Route path="/create_post" element={<CreatePost />} />
        <Route path="/edit_user_profile" element={<EditUserProfile />} />
      </Route>
    </Routes>
  );
};

export default RouterConfig;
