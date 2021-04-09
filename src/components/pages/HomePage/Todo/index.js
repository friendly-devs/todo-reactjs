import { useContext } from "react"
import { TodoContext } from "../../../../App"
import Button from "../../../common/Button"

export default function Todo(props) {
  const { todo, onUpdateTodo, onCancel } = props
  const { id, name, status } = todo

  const { deleteTodo } = useContext(TodoContext)

  const deleteTodoHandle = () => {
    deleteTodo(id)
    onCancel()
  }

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{status}</td>
      <td>
        <Button variant='warning' onClick={() => onUpdateTodo(id)}>Sửa</Button>
        <Button variant='error' onClick={deleteTodoHandle}>Xóa</Button>
      </td>
    </tr>
  )
}
