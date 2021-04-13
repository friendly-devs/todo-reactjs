import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TodoContext } from '../../../../App';
import FormTodo from '../FormTodo';

const title = 'Cập nhật công việc';

export default function UpdateTodo(props) {
  const { todo, onCancel } = props;
  const { name, status, id } = todo;

  const { updateTodo } = useContext(TodoContext);

  const onSubmit = (nameValue, statusValue) => {
    updateTodo(id, nameValue, statusValue);
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
  todo: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};
