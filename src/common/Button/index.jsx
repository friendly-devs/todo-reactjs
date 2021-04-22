import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default function Button(props) {
  const { children, variant, ...otherProps } = props;
  return (
    <button
      type="button"
      className={`button-component ${variant}`}
      {...otherProps}
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
};

Button.defaultProps = {
  variant: 'primary',
};
