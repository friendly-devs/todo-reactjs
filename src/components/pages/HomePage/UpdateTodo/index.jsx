import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import FormTodo from '../FormTodo';
import { updateTodo } from '../../../../action/todo';

const title = 'Cập nhật công việc';

export default function UpdateTodo({ onCancel }) {
  const dispatch = useDispatch();

  const { name, status, id } = useSelector((states) => states.todo.todoSelected);

  const onSubmit = (nameValue, statusValue) => {
    dispatch(updateTodo(id, nameValue, statusValue));
  };

  return (
    <FormTodo
      defaultName={name}
      defaultStatus={status}
      defaultTitle={title}
      onCancel={onCancel}
      onSubmit={onSubmit}
    />
  );
}

UpdateTodo.propTypes = {
  onCancel: PropTypes.func.isRequired,
};
