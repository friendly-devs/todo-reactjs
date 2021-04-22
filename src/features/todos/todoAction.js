import actionTypes from '../../constants/actionTypes';

const addTodo = (name, status) => ({
  type: actionTypes.todo.ADD_TODO,
  payload: {
    name,
    status,
  },
});

const updateTodo = (id, name, status) => ({
  type: actionTypes.todo.UPDATE_TODO,
  payload: {
    id,
    name,
    status,
  },
});

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
