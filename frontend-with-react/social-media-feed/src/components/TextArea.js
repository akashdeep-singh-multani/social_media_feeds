import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({
  value,
  onChange,
  placeholder,
  className,
  rows,
  cols,
  ariaLabel,
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      rows={rows}
      cols={cols}
      aria-label={ariaLabel}
    />
  );
};

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  rows: PropTypes.number,
  cols: PropTypes.number,
  ariaLabel: PropTypes.string,
};

export default TextArea;
