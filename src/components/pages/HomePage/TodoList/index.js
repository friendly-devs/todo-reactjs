import Todo from '../Todo/'
import './index.css'
import { useContext } from 'react'
import './index.css'
import { TodoContext } from '../../../../App'

export default function TodoList(props) {
  const { onUpdateTodo, onCancel } = props

  const { todoList } = useContext(TodoContext)

  const elements = todoList.map(todo => (
    <Todo
      key={todo.id}
      todo={todo}
      onCancel={onCancel}
      onUpdateTodo={onUpdateTodo} />
  ))

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
