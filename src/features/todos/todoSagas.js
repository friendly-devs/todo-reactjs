import { put } from 'redux-saga/effects';
import api from '../../api/todoApi';

function* fetchTodoList() {
  try {
    const todoList = yield api.getTodoList();
    yield put({ type: 'todo/fetch_todo_list_success', payload: todoList });
  } catch (error) {
    yield put({ type: 'todo/fetch_todo_list_failed', payload: error });
  }
}

function* deleteTodo({ payload }) {
  try {
    yield api.deleteTodo(payload);
    yield put({ type: 'todo/fetch_todo_list' });
  } catch (error) {
    window.console.log(error);
  }
}

export { fetchTodoList, deleteTodo };
