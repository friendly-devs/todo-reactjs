import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default function TextFiled(props) {
  const {
    name, value, type, onChange,
  } = props;

  return (
    <input
      className="input-component"
      name={name}
      value={value}
      type={type}
      onChange={onChange}
    />
  );
}

TextFiled.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextFiled.defaultProps = {
  type: 'text',
  value: undefined, // for uncontrolled
};
