import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../TextFiled';
import './index.css';

export default function Search({ onChange }) {
  return (
    <TextField
      name="search"
      type="search"
      placeholder="Nhập từ khóa"
      onChange={onChange}
    />
  );
}

Search.propTypes = {
  onChange: PropTypes.func,
};

Search.defaultProps = {
  onChange: undefined,
};
