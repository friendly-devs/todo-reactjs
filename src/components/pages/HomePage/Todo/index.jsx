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
    const result = window.confirm('Bạn có muốn xóa công việc này?');
    if (result) {
      deleteTodo(id);
      onCancel();
    }
  };

  return (
    <tr className="todo-row">
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>{status}</td>
      <td>
        <Button style={{ marginRight: '10px' }} variant="warning" onClick={() => onUpdateTodo(id)}>
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
