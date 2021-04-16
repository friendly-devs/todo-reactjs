import actionTypes from '../actionTypes';

const KEY_TODO = 'KEY_TODO';

function readTodoList() {
  const data = window.localStorage.getItem(KEY_TODO);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

function addTodo(states, todo) {
  const { list } = states;

  // check slug
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    if (item.slug === todo.slug) {
      return {
        ...states,
        message: {
          content: 'Nội dung đã tồn tại',
          type: 'error',
        },
      };
    }
  }

  return {
    ...states,
    list: [...list, todo],
  };
}

function updateTodo(states, todo) {
  const { list } = states;

  // check error
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    if (item.id !== todo.id && item.slug === todo.slug) {
      return {
        ...states,
        message: {
          content: 'Nội dung đã tồn tại',
          type: 'error',
        },
      };
    }
  }

  // update list
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    if (item.id === todo.id) {
      list[i] = todo;
      break;
    }
  }

  return {
    ...states,
    message: {
      content: 'Cập nhật thành công',
      type: 'success',
    },
  };
}

function deleteTodo(states, id) {
  const { list } = states;
  const newList = [];

  for (let i = 0; i < list.length; i += 1) {
    if (list[i].id !== id) {
      newList.push(list[i]);
    }
  }

  if (newList.length < list.length) {
    return {
      ...states,
      list: newList,
      message: {
        content: 'Xóa thành công',
        type: 'success',
      },
    };
  }

  return {
    ...states,
    message: {
      content: `Không thể xóa todo ${id}`,
      type: 'error',
    },
  };
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
const message = null;

const initialState = {
  list,
  todoSelected,
  message,
};

export default function todoReducer(states = initialState, action) {
  switch (action.type) {
    case actionTypes.todo.ADD_TODO:
      return addTodo(states, action.payload);

    case actionTypes.todo.UPDATE_TODO:
      return updateTodo(states, action.payload);

    case actionTypes.todo.DELETE_TODO:
      return deleteTodo(states, action.payload);

    case actionTypes.todo.SELECT_TODO:
      return {
        ...states,
        todoSelected: selectTodo(states.list, action.payload),
      };

    default:
      return states;
  }
}
