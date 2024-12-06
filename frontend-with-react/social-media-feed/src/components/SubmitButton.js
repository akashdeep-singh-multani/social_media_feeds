import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ onClick, ariaLabel, children }) => {
  return (
    <button
      className="feature_buttons submit_button"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default SubmitButton;
