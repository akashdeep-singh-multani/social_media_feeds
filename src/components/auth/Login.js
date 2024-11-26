import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router"; // Similar to Angular's Router
import * as AuthActions from "../../store/actions/authActions";
import { selectIsLoggedIn } from "../../store/selectors/authSelectors"; // Redux selector
import useAuthForm from "../../hooks/useAuthForm";
import {
  ACTION_NAMES,
  FIELD_NAMES,
  VALIDATION_MESSAGES,
} from "../../constants";
import { Button, ErrorMessage, Input } from "../common/StyledComponents";
import "./centered-form.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Form validation logic
  const validateLogin = (data) => {
    const errors = {};
    if (!data.username) errors.username = VALIDATION_MESSAGES.USERNAME_REQUIRED;
    if (!data.password) errors.password = VALIDATION_MESSAGES.PASSWORD_REQUIRED;
    return errors;
  };

  const handleLogin = (formData) => {
    dispatch(
      AuthActions.login({
        username: formData.username,
        password: formData.password,
      })
    );
  };

  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useAuthForm({ username: "", password: "" }, validateLogin, handleLogin);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user_post");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="centered-container">
      <form className="authForm" onSubmit={handleSubmit}>
        <h2>{ACTION_NAMES.LOGIN}</h2>
        <div>
          <label htmlFor={FIELD_NAMES.USERNAME}>Username</label>
          <Input
            type="text"
            id={FIELD_NAMES.USERNAME}
            name={FIELD_NAMES.USERNAME}
            value={formData.USERNAME}
            onChange={handleChange}
            required
          />
          {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
        </div>

        <div>
          <label htmlFor={FIELD_NAMES.PASSWORD}>Password</label>
          <Input
            type="password"
            id={FIELD_NAMES.PASSWORD}
            name={FIELD_NAMES.PASSWORD}
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {ACTION_NAMES.LOGIN}
        </Button>
      </form>
    </div>
  );
};

export default Login;
