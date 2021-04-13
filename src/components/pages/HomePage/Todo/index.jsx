import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TodoContext } from '../../../../App';
import Button from '../../../common/Button';

export default function Todo(props) {
  const {
    index, todo, onUpdateTodo, onCancel,
  } = props;
  const { id, name, status } = todo;

  const { deleteTodo } = useContext(TodoContext);

  const deleteTodoHandle = () => {
    deleteTodo(id);
    onCancel();
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>{status}</td>
      <td>
        <Button variant="warning" onClick={() => onUpdateTodo(id)}>
          Sửa
        </Button>
        <Button variant="error" onClick={deleteTodoHandle}>
          Xóa
        </Button>
      </td>
    </tr>
  );
}

Todo.propTypes = {
  index: PropTypes.number.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
