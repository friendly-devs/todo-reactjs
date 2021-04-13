import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TodoContext } from '../../../../App';
import FormTodo from '../FormTodo';

export default function CreateTodo(props) {
  const { onCancel } = props;
  const { saveTodo } = useContext(TodoContext);

  const onSubmit = (name, status) => {
    try {
      saveTodo(name, status);
    } catch (e) {
      alert(e.message);
    }
  };

  return <FormTodo onSubmit={onSubmit} onCancel={onCancel} />;
}

CreateTodo.propTypes = {
  onCancel: PropTypes.func.isRequired,
};
