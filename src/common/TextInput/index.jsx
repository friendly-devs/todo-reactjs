import React from 'react';
import PropTypes from 'prop-types';
import TextFiled from '../TextFiled';

export default function TextInput(props) {
  const {
    label, name, value, type, onChange,
  } = props;

  return (
    <div>
      <div>
        <b>{label}</b>
      </div>
      <div>
        <TextFiled
          name={name}
          value={value}
          type={type}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  type: 'text',
  value: undefined, // for uncontrolled
};
