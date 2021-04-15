import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default function TextFiled(props) {
  const {
    name, value, type, onChange, ...otherProps
  } = props;

  return (
    <input
      className="input-component"
      name={name}
      value={value}
      type={type}
      onChange={onChange}
      {...otherProps}
    />
  );
}

TextFiled.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextFiled.defaultProps = {
  type: 'text',
};
