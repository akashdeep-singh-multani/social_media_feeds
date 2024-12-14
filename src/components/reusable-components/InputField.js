import React from 'react';
import PropTypes from 'prop-types';

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
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
};

export default InputField;
