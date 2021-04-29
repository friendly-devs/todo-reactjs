import actionTypes from '../../constants/actionTypes';
import SortTypes from '../../constants/sortTypes';
import StringUtils from '../../utils/StringUtils';
import UUID from '../../utils/UUID';

const KEY_TODO = 'KEY_TODO';

function readTodoList() {
  const data = window.localStorage.getItem(KEY_TODO);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

function addTodo(states, { name, status }) {
  const { list } = states;

  const id = UUID.generateId();
  const slug = StringUtils.toSlug(name);

  if (slug === '') {
    return {
      ...states,
      message: {
        content: 'Nội dung không hợp lệ',
        type: 'error',
      },
    };
  }

  const todo = {
    id,
    slug,
    status,
    name,
  };

  // check slug
  const itemDuplicate = list.find((item) => item.slug === todo.slug);
  if (itemDuplicate != null) {
    return {
      ...states,
      message: {
        content: 'Nội dung đã tồn tại',
        type: 'error',
      },
    };
  }

  return {
    ...states,
    list: [...list, todo],
    message: {
      content: 'Thêm mới thành công',
      type: 'success',
    },
  };
}

function updateTodo(states, { id, name, status }) {
  const { list } = states;

  const slug = StringUtils.toSlug(name);

  if (slug === '') {
    return {
      ...states,
      message: {
        content: 'Nội dung không hợp lệ',
        type: 'error',
      },
    };
  }

  const todo = {
    id,
    slug,
    status,
    name,
  };

  // check error
  const listDuplicate = list.filter((item) => item.id !== todo.id && item.slug === todo.slug);
  if (listDuplicate.length > 0) {
    return {
      ...states,
      message: {
        content: 'Nội dung đã tồn tại',
        type: 'error',
      },
    };
  }

  // update list
  const newList = list.map((item) => (item.id === todo.id ? todo : item));

  return {
    ...states,
    list: newList,
    message: {
      content: 'Cập nhật thành công',
      type: 'success',
    },
  };
}

function deleteTodo(states, id) {
  const { list } = states;
  const newList = list.filter((item) => item.id !== id);

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
  const listSelected = list.filter((item) => item.id === id);

  if (listSelected.length === 0) {
    return states;
  }

  const todoSelected = listSelected[0];
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
const todoSelected = null;
const message = null;
const sortType = SortTypes.INCREASE;
const textSearch = '';

const initialState = {
  list,
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
