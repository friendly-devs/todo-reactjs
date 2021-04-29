import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default function Button(props) {
  const {
    children, variant, onClick, onBlur,
  } = props;
  return (
    <button
      type="button"
      className={`button-component ${variant}`}
      onClick={onClick}
      onBlur={onBlur}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
};

Button.defaultProps = {
  variant: 'primary',
  onClick: undefined,
  onBlur: undefined,
};
