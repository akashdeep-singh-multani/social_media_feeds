import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getLoggedInUser } from '../services/authService';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const decodedUser = getLoggedInUser();
    if (decodedUser) {
      setUser(decodedUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
