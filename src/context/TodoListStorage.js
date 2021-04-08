import { useEffect, useState } from 'react'

const keyMap = 'todo.map'
const keyId = 'todo.id'

function readMapFromLocalStorage() {
  const map = new Map()
  const data = localStorage.getItem(keyMap)

  if (data != null) {
    const obj = JSON.parse(data)

    for (const key in obj) {
      map.set(key, obj[key])
    }
  }

  return map
}

function readIdFromLocalStorage() {
  const data = localStorage.getItem(keyId)
  if (data != null) {
    return parseInt(data)
  }

  return 1
}

const initialTodoMap = readMapFromLocalStorage()
const initialId = readIdFromLocalStorage()
const initialTodoList = []

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

  const updateTodoList = (map) => {
    const list = []

    map.forEach((value, key) => {
      list.push({
        id: key,
        name: value.name,
        status: value.status
      })
    })

    setTodoList(list)
  }

  const saveToLocalStorage = (id, map) => {
    const json = {}

    map.forEach((value, key) => {
      json[key] = value
    })

    localStorage.setItem(keyId, JSON.stringify(id))
    localStorage.setItem(keyMap, JSON.stringify(json))
  }

  useEffect(() => {
    updateTodoList(todoMap)
    saveToLocalStorage(id, todoMap)
  }, [id, todoMap])


  const saveTodo = (name, status) => {
    const newTodo = {
      name,
      status
    }

    const newMap = new Map(todoMap)
    newMap.set(id, newTodo)

    setTodoMap(newMap)
    setId((currentId) => currentId + 1)
  }

  const deleteTodo = (id) => {
    if (todoMap.has(id)) {
      const newMap = new Map(todoMap)
      newMap.delete(id)

      setTodoMap(newMap)
    } else {
      throw new Error(`Can't delete key ${id}`)
    }
  }

  const updateTodo = (id, name, status) => {
    if (todoMap.has(id)) {
      const todo = {
        name,
        status
      }

      const newMap = new Map(todoMap)
      newMap.set(id, todo)

      setTodoMap(newMap)
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
