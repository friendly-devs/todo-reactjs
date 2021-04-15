import React from 'react';
import TextField from '../TextFiled';
import './index.css';

export default function Search(props) {
  return (
    <TextField name="search" type="search" placeholder="Nhập từ khóa" {...props} />
  );
}
