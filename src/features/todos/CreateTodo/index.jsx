import React from 'react';
import { useDispatch } from 'react-redux';

import FormTodo from '../FormTodo';
import { addTodo } from '../todoAction';

export default function CreateTodo() {
  const dispatch = useDispatch();

  const onSubmit = (name, status) => {
    dispatch(addTodo(name, status));
  };

  return (
    <>
      <FormTodo onSubmit={onSubmit} />
    </>
  );
}
