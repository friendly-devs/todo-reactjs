import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import FormTodo from '../FormTodo';
import { addTodo } from '../todoAction';

export default function CreateTodo() {
  const dispatch = useDispatch();
  const history = useHistory();

  const redirectToHome = () => {
    history.push('/');
  };

  const onSubmit = (name, status) => {
    dispatch(addTodo(name, status));
    redirectToHome();
  };

  return (
    <>
      <FormTodo onSubmit={onSubmit} />
    </>
  );
}
