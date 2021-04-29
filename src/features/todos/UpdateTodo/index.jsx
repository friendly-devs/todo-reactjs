import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import FormTodo from '../FormTodo';
import { updateTodo } from '../todoAction';

const title = 'Cập nhật công việc';

export default function UpdateTodo() {
  const dispatch = useDispatch();
  const history = useHistory();
  const message = useSelector((states) => states.todo.message);
  const { todoId } = useParams();

  const redirectToHome = useCallback(() => {
    if (message && message.type === 'success') {
      history.push('/');
    }
  }, []);

  const list = useSelector((states) => states.todo.list);
  const todo = list.find((item) => item.id === todoId);

  const { name, status, id } = todo;

  const onSubmit = (nameValue, statusValue) => {
    dispatch(updateTodo(id, nameValue, statusValue));
    redirectToHome();
  };

  return (
    <FormTodo
      defaultName={name}
      defaultStatus={status}
      defaultTitle={title}
      onSubmit={onSubmit}
    />
  );
}
