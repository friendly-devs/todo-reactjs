import React from 'react';
import PropTypes from 'prop-types';
import Selection from '../Selection';

export default function SelectionLabel(props) {
  const {
    label, value, options, onChange,
  } = props;

  return (
    <div>
      <div><b>{label}</b></div>
      <div>
        <Selection
          options={options}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
}

SelectionLabel.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
