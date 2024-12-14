import { environment } from '../config/environment';
import { apiRequest } from '../utils/apiRequest';
import Cookies from 'js-cookie';
import { decodeJwtToken } from '../utils/decode-jwt-token';
import { SESSION_TIME_LIMIT } from '../constants';

export const signupUser = async (request) => {
  return apiRequest(`${environment.BASE_URL}auth/signup`, 'POST', request);
};

export const loginUser = async (request) => {
  return apiRequest(`${environment.BASE_URL}auth/login`, 'POST', request);
};

export const setToken = (token) => {
  Cookies.set('jwt', token, {
    expires: 7,
    secure: true,
    sameSite: 'Strict',
  });
};

export const getToken = () => {
  return Cookies.get('jwt');
};

export const removeToken = () => {
  Cookies.remove('jwt');
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  try {
    const decodedToken = decodeJwtToken(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken?.exp < currentTime) {
      return false;
    }

    const lastActivity = decodedToken?.lastActivity;
    const inactivityLimit = SESSION_TIME_LIMIT;
    if (currentTime * 1000 - lastActivity > inactivityLimit) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

export const logout = () => {
  Cookies.remove('jwt');
};

export const getLoggedInUser = () => {
  const token = Cookies.get('jwt');
  const user = decodeJwtToken(token)?.user;
  return user;
};
