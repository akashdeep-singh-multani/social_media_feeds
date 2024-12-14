import { loginUser, setToken, signupUser } from '../../services/authService';

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await loginUser(username, password);
    setToken(response.data.token);
    dispatch({
      type: 'LOGIN_SUCCESS',
      token: response.data.token,
    });
    return response;
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      error: error.message,
    });
    throw error;
  }
};

export const signup = (username, email, password) => async (dispatch) => {
  try {
    const response = await signupUser(username, email, password);
    setToken(response.data.token);
    dispatch({
      type: 'SIGNUP_SUCCESS',
      payload: { username, email },
    });
  } catch (error) {
    dispatch({
      type: 'SIGNUP_FAILURE',
      error: error.message,
    });
  }
};
