import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import FormTodo from '../FormTodo';
import { updateTodo } from '../todoAction';

const title = 'Cập nhật công việc';

export default function UpdateTodo() {
  const dispatch = useDispatch();
  const { todoId } = useParams();

  const list = useSelector((states) => states.todo.list);
  const todo = list.find((item) => item.id === todoId);

  const { name, status, id } = todo;

  const onSubmit = (nameValue, statusValue) => {
    dispatch(updateTodo(id, nameValue, statusValue));
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
