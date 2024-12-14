import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../services/authService';

const PrivateRoute = () => {
  const token = getToken(); // Get token from cookies or local storage

  if (!token) {
    // Redirect to login if no token is found (not logged in)
    return <Navigate to="/login" />;
  }

  // If there's a token, render the nested routes (child routes)
  return <Outlet />;
};

export default PrivateRoute;
