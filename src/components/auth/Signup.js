import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router"; // Router for navigation
import { selectIsLoggedIn } from "../../store/selectors/authSelectors"; // Redux selector
import { ACTION_NAMES, FIELD_NAMES, ERROR_MESSAGES } from "../../constants";
import useAuthForm from "../../hooks/useAuthForm"; // Importing the refactored custom hook
import * as AuthActions from "../../store/actions/authActions";
import "./centered-form.css";
import { Button, Input } from "../common/StyledComponents";

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  // Form validation logic for Signup
  const validateSignup = (data) => {
    const errors = {};
    if (!data.username) errors.username = ERROR_MESSAGES.USERNAME_REQUIRED;
    if (!data.email) errors.email = ERROR_MESSAGES.EMAIL_REQUIRED;
    if (!data.password) errors.password = ERROR_MESSAGES.PASSWORD_REQUIRED;
    return errors;
  };

  // Signup submission callback
  const handleSignup = (formData) => {
    dispatch(
      AuthActions.signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
    );
  };

  // Using the custom hook to handle form logic
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useAuthForm(
      { username: "", email: "", password: "" },
      validateSignup,
      handleSignup
    );

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user_post");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="centered-container">
      <form className="authForm" onSubmit={handleSubmit}>
        <h2>{ACTION_NAMES.SIGNUP}</h2>
        <div>
          <label htmlFor={FIELD_NAMES.USERNAME}>Username</label>
          <Input
            type="text"
            id={FIELD_NAMES.USERNAME}
            name={FIELD_NAMES.USERNAME}
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div>
          <label htmlFor={FIELD_NAMES.EMAIL}>Email</label>
          <Input
            type="email"
            id={FIELD_NAMES.EMAIL}
            name={FIELD_NAMES.EMAIL}
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
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
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {ACTION_NAMES.SIGNUP}
        </Button>
      </form>
    </div>
  );
};

export default Signup;
