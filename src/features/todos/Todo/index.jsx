import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../../../common/Button';
import { deleteTodo } from '../todoAction';

export default function Todo(props) {
  const { index, todo } = props;
  const { id, name, status } = todo;

  const dispatch = useDispatch();

  const handleDeleteTodo = () => {
    const result = window.confirm('Bạn có muốn xóa công việc này?');
    if (result) {
      dispatch(deleteTodo(id));
    }
  };

  return (
    <tr className="todo-row">
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>{status}</td>
      <td>
        <Link to={`/todos/${id}`}>
          <Button
            style={{ marginRight: '10px' }}
            variant="warning"
          >
            Sửa
          </Button>
        </Link>
        <Button variant="error" onClick={handleDeleteTodo}>
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
};
