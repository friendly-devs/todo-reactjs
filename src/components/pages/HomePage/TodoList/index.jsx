import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Todo from '../Todo';
import './index.css';

const KEY_TODO = 'KEY_TODO';

export default function TodoList(props) {
  const { onUpdateTodo, onCancel } = props;
  const list = useSelector((state) => state.todo.list);

  useEffect(() => {
    const data = JSON.stringify(list);
    window.localStorage.setItem(KEY_TODO, data);
  }, [list]);

  const elements = list.map((todo, index) => (
    <Todo
      key={todo.id}
      todo={todo}
      index={index}
      onCancel={onCancel}
      onUpdateTodo={onUpdateTodo}
    />
  ));

  return (
    <table>
      <thead>
        <tr>
          <td>STT</td>
          <td>Tên</td>
          <td>Trạng thái</td>
          <td>Hành động</td>
        </tr>
      </thead>
      <tbody>{elements}</tbody>
    </table>
  );
}

TodoList.propTypes = {
  onUpdateTodo: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
