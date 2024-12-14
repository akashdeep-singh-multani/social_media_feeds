export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsTokenAvailable = (state) => {
  return state.auth.token;
};
