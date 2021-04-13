import React from 'react';
import PropTypes from 'prop-types';
import TextFiled from '../TextFiled';

export default function TextInput(props) {
  const { label } = props;

  return (
    <div>
      <div>
        <b>{label}</b>
      </div>
      <div>
        <TextFiled {...props} />
      </div>
    </div>
  );
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
};
