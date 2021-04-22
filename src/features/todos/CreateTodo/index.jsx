import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import FormTodo from '../FormTodo';
import { addTodo } from '../todoAction';

export default function CreateTodo(props) {
  const { onCancel } = props;

  const dispatch = useDispatch();

  const onSubmit = (name, status) => {
    dispatch(addTodo(name, status));
  };

  return (
    <>
      <FormTodo onSubmit={onSubmit} onCancel={onCancel} />
    </>
  );
}

CreateTodo.propTypes = {
  onCancel: PropTypes.func.isRequired,
};
