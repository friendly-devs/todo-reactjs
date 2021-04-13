import React, { useContext } from "react";
import Todo from "../Todo/";
import { TodoContext } from "../../../../App";
import "./index.css";

export default function TodoList(props) {
  const { onUpdateTodo, onCancel } = props;

  const { todoList } = useContext(TodoContext);

  const elements = todoList.map((todo, index) => (
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
