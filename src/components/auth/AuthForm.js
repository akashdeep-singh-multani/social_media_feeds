import React from "react";
import PropTypes from "prop-types";
import { FIELD_NAMES } from "../../constants";
import useAuthForm from "../../hooks/useAuthForm";
import "./centered-form.css";
import { Button, Input } from "../common/StyledComponents";

const AuthForm = ({ actionName, fields, validate, onSubmit }) => {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useAuthForm(
      { username: "", email: "", password: "" }, // Ensure initial values are always provided
      validate,
      onSubmit
    );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{actionName} Form</h2>

        {fields.includes(FIELD_NAMES.USERNAME) && (
          <div>
            <label htmlFor={FIELD_NAMES.USERNAME}>Username</label>
            <Input
              type="text"
              id={FIELD_NAMES.USERNAME}
              name={FIELD_NAMES.USERNAME}
              value={formData.username || ""}
              onChange={handleChange}
              aria-label="Username"
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
        )}

        <div>
          <label htmlFor={FIELD_NAMES.EMAIL}></label>
          <Input
            type="email"
            id={FIELD_NAMES.EMAIL}
            name={FIELD_NAMES.EMAIL}
            value={formData.email || ""}
            onChange={handleChange}
            aria-label="Email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <Input
            type="password"
            id={FIELD_NAMES.PASSWORD}
            name={FIELD_NAMES.PASSWORD}
            value={formData.password || ""}
            onChange={handleChange}
            aria-label="Password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {actionName}
        </Button>
      </form>
    </div>
  );
};

AuthForm.propTypes = {
  actionName: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  validate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AuthForm;
