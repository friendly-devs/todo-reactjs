import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Button from '../../../common/Button';
import { deleteTodo, selectTodo } from '../../../../action/todo';
import setFormType from '../../../../action/homePage';
import formType from '../../../../constants/formType';

export default function Todo(props) {
  const { index, todo, onCancel } = props;
  const { id, name, status } = todo;

  const dispatch = useDispatch();

  const deleteTodoHandle = () => {
    const result = window.confirm('Bạn có muốn xóa công việc này?');
    if (result) {
      dispatch(deleteTodo(id));
      onCancel();
    }
  };

  const onSelectTodo = () => {
    dispatch(selectTodo(id));
    dispatch(setFormType(formType.FORM_UPDATE));
  };

  return (
    <tr className="todo-row">
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>{status}</td>
      <td>
        <Button
          style={{ marginRight: '10px' }}
          variant="warning"
          onClick={onSelectTodo}
        >
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
  onCancel: PropTypes.func.isRequired,
};
