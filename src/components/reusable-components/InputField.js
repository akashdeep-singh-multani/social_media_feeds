import React from 'react';
import PropTypes from 'prop-types';

// Reusable Input Field Component
const InputField = ({ value, onChange, placeholder, ariaLabel, isValid }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-label={ariaLabel}
      className="input-field"
      style={{ borderColor: isValid ? 'black' : 'red' }}
    />
  );
};

InputField.propTypes = {
  value: PropTypes.string.isRequired, // value should be a string and is required
  onChange: PropTypes.func.isRequired, // onChange should be a function and is required
  placeholder: PropTypes.string.isRequired, // placeholder should be a string and is required
  ariaLabel: PropTypes.string.isRequired, // ariaLabel should be a string and is required
  isValid: PropTypes.bool.isRequired, // isValid should be a boolean and is required
};

export default InputField;
