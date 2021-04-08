import { useState } from 'react'

const initialTodoMap = new Map()
const initialTodoList = []
const initialId = 1

/**
 * 
 * @returns {
 * saveTodo,
 * deleteTodo,
 * updateTodo,
 * todoList
 * }
 */
export default function TodoListStorage() {
  const [id, setId] = useState(initialId)
  const [todoMap, setTodoMap] = useState(initialTodoMap)
  const [todoList, setTodoList] = useState(initialTodoList)

  const updateTodoList = () => {
    const newTodoList = []

    todoMap.forEach((value, key) => {
      newTodoList.push({
        id: key,
        name: value.name,
        status: value.status
      })
    })

    setTodoList(newTodoList)
  }

  const saveTodo = (name, status) => {
    const newTodo = {
      name,
      status
    }

    setTodoMap((map) => {
      map.set(id, newTodo)

      updateTodoList()

      return map
    })

    setId((currentId) => currentId + 1)
  }

  const deleteTodo = (id) => {
    if (todoMap.has(id)) {
      setTodoMap((map) => {
        map.delete(id)

        updateTodoList()

        return map
      })
    } else {
      throw new Error(`Can't delete key ${id}`)
    }
  }

  const updateTodo = (id, name, status) => {
    if (todoMap.has(id)) {
      setTodoMap((map) => {
        const todo = {
          name,
          status
        }

        map.set(id, todo)

        updateTodoList()

        return map
      })
    } else {
      throw Error(`Cannot update todo ${id}`)
    }
  }

  const findById = (id) => {
    const value = todoMap.get(id)
    return {
      ...value,
      id,
    }
  }

  return {
    saveTodo,
    deleteTodo,
    updateTodo,
    findById,
    todoList
  }
}
