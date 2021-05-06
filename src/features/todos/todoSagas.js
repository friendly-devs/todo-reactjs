import { put } from 'redux-saga/effects';
import api from '../../api/todoApi';

function* fetchTodoList() {
  try {
    window.console.log('Call api');
    const todoList = yield api.getTodoList();
    yield put({ type: 'todo/fetch_todo_list_success', payload: todoList });
  } catch (error) {
    yield put({ type: 'todo/fetch_todo_list_failed', payload: error });
  }
}

export default fetchTodoList;
