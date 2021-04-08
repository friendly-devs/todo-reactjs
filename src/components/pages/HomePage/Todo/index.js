import { useContext } from "react"
import { TodoContext } from "../../../../App"
import Button from "../../../common/Button"


export default function Todo(props) {
  const { todo, onUpdateTodo } = props
  const { id, name, status } = todo

  const { deleteTodo } = useContext(TodoContext)

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{status}</td>
      <td>
        <Button variant='warning' onClick={() => onUpdateTodo(id)}>Sửa</Button>
        <Button variant='error' onClick={() => deleteTodo(id)}>Xóa</Button>
      </td>
    </tr>
  )
}
