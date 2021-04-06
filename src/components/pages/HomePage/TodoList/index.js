import Todo from '../Todo/'
import { TodoContext } from '..'
import './index.css'
import { useContext } from 'react'
import './index.css'

export default function TodoList(props) {
  const { todoList } = useContext(TodoContext)

  console.log(todoList);

  const elements = todoList.map(todo => <Todo key={todo.id} todo={todo} />)

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
      <tbody>
        {elements}
      </tbody>
    </table>
  )
}