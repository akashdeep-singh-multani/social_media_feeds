import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import UserPost from './pages/post/user_posts';
import CreatePost from './pages/post/create_post';

const RouterConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user_post" element={<UserPost />} />
        <Route path="/create_post" element={<CreatePost />} />
      </Routes>
    </Router>
  );
};

export default RouterConfig;
