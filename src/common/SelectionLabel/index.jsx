import React from 'react';
import PropTypes from 'prop-types';
import Selection from '../Selection';

export default function SelectionLabel(props) {
  const { label } = props;

  return (
    <div>
      <div><b>{label}</b></div>
      <div>
        <Selection {...props} />
      </div>
    </div>
  );
}

SelectionLabel.propTypes = {
  label: PropTypes.string.isRequired,
};
