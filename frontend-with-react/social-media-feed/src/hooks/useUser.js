import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { USE_USER_HOOK_USAGE_ERROR } from '../constants';

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(USE_USER_HOOK_USAGE_ERROR);
  }
  return context;
};
