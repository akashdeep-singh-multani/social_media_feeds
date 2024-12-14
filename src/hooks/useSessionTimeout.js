import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { SESSION_TIME_LIMIT } from '../constants';
import { useEffect } from 'react';

const useSessionTimeout = () => {
  const navigate = useNavigate();
  let timeout;

  const resetTimer = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      logout();
      navigate('/login');
    }, SESSION_TIME_LIMIT);
  };

  useEffect(() => {
    const events = ['click', 'keydown', 'mousemove', 'scroll'];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timeout);
    };
  }, []);

  return resetTimer;
};

export default useSessionTimeout;
