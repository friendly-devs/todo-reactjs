import { useContext, useState } from 'react'
import Button from '../../../common/Button'
import TextInput from '../../../common/TextInput'
import SelectionLabel from '../../../common/SelectionLabel'
import todoStatus from '../../../../constants/todoStatus'
import { TodoContext } from '..'

import './index.css'

const initialName = ''
const initialStatus = todoStatus.ACTIVE

export default function CreateTodo() {
  const { saveTodo } = useContext(TodoContext)
  const [name, setName] = useState(initialName)
  const [status, setStatus] = useState(initialStatus)

  const addTodo = () => {

    if (name === '') {
      alert('Không được để trống dữ liệu')
      return
    }

    saveTodo(name, status)

    setName(initialName)
    setStatus(initialStatus)
  }

  const cancel = () => {

  }

  const handleChangeName = (event) => {
    setName(event.target.value)
  }

  const handleChangeStatus = (event) => {
    setStatus(event.target.value)
  }

  return (
    <div className='wrapper'>
      <div className='header'>
        <p>Thêm công việc</p>
      </div>

      <div className='container'>
        <TextInput
          value={name}
          label='Tên:'
          name='name'
          onChange={handleChangeName} />

        <SelectionLabel
          label={'Trạng thái:'}
          value={status}
          options={[todoStatus.ACTIVE, todoStatus.INACTIVE]}
          onChange={handleChangeStatus} />

        <div>
          <Button onClick={addTodo}>Lưu lại</Button>
          <Button variant='error' onClick={cancel}>Hủy bỏ</Button>
        </div>
      </div>
    </div>
  )
}