/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import Button from '../../../common/Button';
import { TodoContext } from '..';

export default function Todo(props) {
  const { id, name, status } = props.todo;

  const { deleteTodo } = useContext(TodoContext);

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{status}</td>
      <td>
        <Button variant="warning">Sửa</Button>
        <Button variant="error" onClick={() => deleteTodo(id)}>Xóa</Button>
      </td>
    </tr>
  );
}
