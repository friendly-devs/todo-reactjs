import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Todo from '../Todo';
import './index.css';

export default function TodoList({ onCancel }) {
  const list = useSelector((states) => states.todo.listSorted);
  const elements = list.map((todo, index) => (
    <Todo
      key={todo.id}
      todo={todo}
      index={index}
      onCancel={onCancel}
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
  onCancel: PropTypes.func.isRequired,
};
