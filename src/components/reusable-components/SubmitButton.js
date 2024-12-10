import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../styled-components/SubmitButton.styled';

const SubmitButton = ({ onClick, ariaLabel, children }) => {
  return (
    <Button onClick={onClick} aria-label={ariaLabel}>
      {children}
    </Button>
  );
};

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default SubmitButton;
