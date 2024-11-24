import React from "react";
import AuthForm from "./AuthForm";
import {
  ACTION_NAMES,
  FIELD_NAMES,
  VALIDATION_MESSAGES,
} from "../../constants";
// import logger from "../../utils/logger";
import { loginUser } from "../../services/authService";

const Login = () => {
  const validateLogin = (data) => {
    const errors = {};
    if (!data.email) errors.email = VALIDATION_MESSAGES.EMAIL_REQUIRED;
    if (!data.password) errors.password = VALIDATION_MESSAGES.PASSWORD_REQUIRED;
    return errors;
  };

  const handleLogin = (formData) => {
    loginUser(formData.email, formData.password)
      .then((response) => {
        // logger.log(INFO_MESSAGES.SUCCESS_LOG);
      })
      .catch((error) => {
        // logger.error(`${ERROR_MESSAGES.LOGIN_FAILURE}: ${error}`);
      });
  };

  return (
    <div>
      <h2>{ACTION_NAMES.LOGIN}</h2>
      <AuthForm
        actionName={ACTION_NAMES.LOGIN}
        fields={[FIELD_NAMES.EMAIL, FIELD_NAMES.PASSWORD]}
        validate={validateLogin}
        onSubmit={handleLogin}
      />
    </div>
  );
};

export default Login;
