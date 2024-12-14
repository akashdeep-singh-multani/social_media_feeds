export const VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: 'Email is required',
  PASSWORD_REQUIRED: 'Password is required',
  USERNAME_REQUIRED: 'Username is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  WEAK_PASSWORD: 'Password must be at least 6 characters',
};
export const ACTION_NAMES = {
  LOGIN: 'Login',
  SIGNUP: 'Signup',
};

export const FIELD_NAMES = {
  EMAIL: 'email',
  PASSWORD: 'password',
  USERNAME: 'username',
};

export const INITIAL_VALUES = {
  LOGIN: { email: '', password: '' },
  SIGNUP: { username: '', email: '', password: '' },
};

export const INFO_MESSAGES = {
  SUCCESS_LOG: 'Api request is successful',
  PROFILE_UPDATION_SUCCESSFUL: 'Profile Updated Successfully',
  LOGIN_SUCCESSFUL: 'Login Successful',
};

export const ERROR_MESSAGES = {
  LOGIN_FAILURE: 'Login Failed',
  SIGNUP_FAILURE: 'Signup Failed',
  LOAD_POST_FAILURE: 'Error loading post',
  ADD_COMMENTS_FAILURE: 'Something went wrong while adding comments',
  SOMETHING_WENT_WRONG: 'Something went wrong! Please try again later',
  FORM_SUBMISSION_FAILED: 'Form Submission Failed',
};

export const POST_OFFSET = 1;
export const POST_LIMIT = 10;
export const USE_USER_HOOK_USAGE_ERROR =
  'useUser must be used within a UserProvider';
export const POST_CONTENT_PLACEHOLDER = 'What/s on your mind?';
export const POST_ARIA_LABEL = 'Enter post content';
