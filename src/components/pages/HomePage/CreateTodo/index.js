import { useContext } from 'react';
import { TodoContext } from '..';
import FormTodo from '../FormTodo'

export default function CreateTodo(props) {
  const { onCancel } = props
  const { saveTodo } = useContext(TodoContext)

  const onSubmit = (name, status) => {
    saveTodo(name, status)
  }

  return <FormTodo onSubmit={onSubmit} onCancel={onCancel} />
}