import { useContext } from 'react'
import { TodoContext } from '../../../../App'
import FormTodo from '../FormTodo'

const title = 'Cập nhật công việc'

export default function UpdateTodo(props) {
  const { todo, onCancel } = props
  const { name, status, id } = todo

  const { updateTodo } = useContext(TodoContext)

  const onSubmit = (name, status) => {
    updateTodo(id, name, status)
  }

  return <FormTodo
    defaultName={name}
    defaultStatus={status}
    defaultTitle={title}
    onCancel={onCancel}
    onSubmit={onSubmit} />
}
