const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        token: action.token,
      };
    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default authReducer;
