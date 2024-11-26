import { loginUser, setToken, signupUser } from "../../services/authService";

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await loginUser(username, password);
    setToken(response.data.token);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: { username },
    });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      error: error.message,
    });
  }
};

export const signup = (username, email, password) => async (dispatch) => {
  try {
    const response = await signupUser(username, email, password);
    setToken(response.data.token);
    dispatch({
      type: "SIGNUP_SUCCESS",
      payload: { username, email },
    });
  } catch (error) {
    dispatch({
      type: "SIGNUP_FAILURE",
      error: error.message,
    });
  }
};
