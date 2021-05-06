import { takeEvery, takeLatest } from '@redux-saga/core/effects';
import { fetchTodoList, deleteTodo } from '../features/todos/todoSagas';

function* rootSaga() {
  yield takeEvery('todo/fetch_todo_list', fetchTodoList);
  yield takeLatest('todo/delete_todo', deleteTodo);
}

export default rootSaga;
