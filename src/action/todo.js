import actionTypes from '../actionTypes';
import UUID from '../utils/UUID';
import StringUtils from '../utils/StringUtils';

const addTodo = (name, status) => {
  const id = UUID.generateId();
  const slug = StringUtils.toSlug(name);
  const todo = {
    id,
    name,
    status,
    slug,
  };

  return {
    type: actionTypes.todo.ADD_TODO,
    payload: todo,
  };
};

const updateTodo = (id, name, status) => {
  const slug = StringUtils.toSlug(name);
  const todo = {
    id,
    name,
    status,
    slug,
  };

  return {
    type: actionTypes.todo.UPDATE_TODO,
    payload: todo,
  };
};

const deleteTodo = (id) => ({
  type: actionTypes.todo.DELETE_TODO,
  payload: id,
});

const selectTodo = (id) => ({
  type: actionTypes.todo.SELECT_TODO,
  payload: id,
});

const setTextSearch = (textSearch) => ({
  type: actionTypes.todo.SET_TEXT_SEARCH,
  payload: textSearch,
});

const setSortType = (sortType) => ({
  type: actionTypes.todo.SET_SORT_TYPE,
  payload: sortType,
});

export {
  addTodo,
  updateTodo,
  deleteTodo,
  selectTodo,
  setTextSearch,
  setSortType,
};
