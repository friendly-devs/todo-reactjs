import React, { useState } from 'react'
import CreatTodo from './CreateTodo'
import TodoListStorage from '../../../context/TodoListStorage'
import TodoList from './TodoList'
import Button from '../../common/Button'

import './index.css'

export const TodoContext = React.createContext()

export default function HomePage() {
  const [enable, setEnable] = useState(true)

  const onCancel = () => {
    setEnable(false)
  }

  const showForm = () => {
    setEnable(true)
  }

  return (
    <TodoContext.Provider value={TodoListStorage()}>
      <div>
        <h1>Quản lý công việc</h1>
        <hr />
      </div>

      <div className='root-container'>
        {
          enable && (
            <div className='todo-form'>
              <CreatTodo onCancel={onCancel} />
            </div>
          )
        }

        <div className='todo-content'>
          <Button onClick={showForm}>Thêm công việc</Button>
          <TodoList />
        </div>
      </div>
    </TodoContext.Provider>
  )
}