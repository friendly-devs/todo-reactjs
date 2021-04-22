import actionTypes from '../actionTypes';
import SortType from '../constants/SortType';
import StringUtils from '../utils/StringUtils';

const KEY_TODO = 'KEY_TODO';

function getSortFunction(sortType) {
  switch (sortType) {
    case SortType.DECREASE:
      return (i1, i2) => i2.name.localeCompare(i1.name);

    case SortType.STATUS_ACTIVE:
      return (i1, i2) => i2.status.localeCompare(i1.status);

    case SortType.STATUS_INACTIVE:
      return (i1, i2) => i1.status.localeCompare(i2.status);

    default:
      return (i1, i2) => i1.name.localeCompare(i2.name);
  }
}

function filterAndSort(list, textSearch, sortType) {
  let listSorted = [...list];
  if (textSearch !== '') {
    listSorted = listSorted.filter((item) => StringUtils.includesIgnoreCase(item.name, textSearch));
  }
  const sortFunc = getSortFunction(sortType);
  return listSorted.sort(sortFunc);
}

function readTodoList() {
  const data = window.localStorage.getItem(KEY_TODO);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

function addTodo(states, todo) {
  const { list, textSearch, sortType } = states;

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

  const newList = [...list, todo];
  const listSorted = filterAndSort(newList, textSearch, sortType);

  return {
    ...states,
    listSorted,
    list: newList,
  };
}

function updateTodo(states, todo) {
  const { list, textSearch, sortType } = states;

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

  const listSorted = filterAndSort(list, textSearch, sortType);

  return {
    ...states,
    listSorted,
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

function selectTodo(states, id) {
  const { list } = states;
  let todoSelected = null;

  for (let i = 0; i < list.length; i += 1) {
    if (list[i].id === id) {
      todoSelected = list[i];
      break;
    }
  }

  return {
    ...states,
    todoSelected,
  };
}

function setTextSearch(states, textSearch) {
  return {
    ...states,
    textSearch,
  };
}

function setSortType(states, sortType) {
  return {
    ...states,
    sortType,
  };
}

const list = readTodoList();
const listSorted = [...list];
const todoSelected = null;
const message = null;
const sortType = SortType.NONE;
const textSearch = '';

const initialState = {
  list,
  listSorted,
  todoSelected,
  message,
  sortType,
  textSearch,
};

export default function todoReducer(states = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case actionTypes.todo.ADD_TODO:
      return addTodo(states, payload);

    case actionTypes.todo.UPDATE_TODO:
      return updateTodo(states, payload);

    case actionTypes.todo.DELETE_TODO:
      return deleteTodo(states, payload);

    case actionTypes.todo.SELECT_TODO:
      return selectTodo(states, payload);

    case actionTypes.todo.SET_TEXT_SEARCH:
      return setTextSearch(states, payload);

    case actionTypes.todo.SET_SORT_TYPE:
      return setSortType(states, payload);

    default:
      return states;
  }
}
