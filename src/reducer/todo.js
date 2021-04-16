import actionTypes from '../actionTypes';

const KEY_TODO = 'KEY_TODO';

function readTodoList() {
  const data = window.localStorage.getItem(KEY_TODO);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

function updateTodo(list, todo) {
  const newList = [...list];

  for (let i = 0; i < newList.length; i += 1) {
    if (newList[i].id === todo.id) {
      newList[i] = todo;
    }
  }

  return newList;
}

function deleteTodo(list, id) {
  const newList = [];

  for (let i = 0; i < list.length; i += 1) {
    if (list[i].id !== id) {
      newList.push(list[i]);
    }
  }

  return newList;
}

function selectTodo(list, id) {
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].id === id) {
      return list[i];
    }
  }
  return null;
}

const list = readTodoList();
const todoSelected = null;

const initialState = {
  list,
  todoSelected,
};

export default function todoReducer(states = initialState, action) {
  switch (action.type) {
    case actionTypes.todo.ADD_TODO:
      return {
        ...states,
        list: [...states.list, action.payload],
      };

    case actionTypes.todo.UPDATE_TODO:
      return {
        ...states,
        list: updateTodo(states.list, action.payload),
      };

    case actionTypes.todo.DELETE_TODO:
      return {
        ...states,
        list: deleteTodo(states.list, action.payload),
      };

    case actionTypes.todo.SELECT_TODO:
      return {
        ...states,
        todoSelected: selectTodo(states.list, action.payload),
      };

    default:
      return states;
  }
}
