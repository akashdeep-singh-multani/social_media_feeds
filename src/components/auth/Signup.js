import React from "react";
import AuthForm from "./AuthForm";
import {
  ACTION_NAMES,
  FIELD_NAMES,
  ERROR_MESSAGES,
  INFO_MESSAGES,
} from "../../constants";
import { signupUser } from "../../services/authService";
// import logger from "../../utils/logger";

const Signup = () => {
  const validateSignup = (data) => {
    const errors = {};
    if (!data.username) errors.username = ERROR_MESSAGES.USERNAME_REQUIRED;
    if (!data.email) errors.email = ERROR_MESSAGES.EMAIL_REQUIRED;
    if (!data.password) errors.password = ERROR_MESSAGES.PASSWORD_REQUIRED;
    return errors;
  };

  const handleSignup = (formData) => {
    signupUser(formData.username, formData.email, formData.password)
      .then((response) => {
        // logger.log(INFO_MESSAGES.SUCCESS_LOG);
      })
      .catch((error) => {
        // logger.error(`${ERROR_MESSAGES.SIGNUP_FAILURE}: ${error}`);
      });
  };

  return (
    <div>
      <h2>{ACTION_NAMES.SIGNUP}</h2>
      <AuthForm
        actionName={ACTION_NAMES.SIGNUP}
        fields={[FIELD_NAMES.USERNAME, FIELD_NAMES.EMAIL, FIELD_NAMES.PASSWORD]}
        validate={validateSignup}
        onSubmit={handleSignup}
      />
    </div>
  );
};

export default Signup;
