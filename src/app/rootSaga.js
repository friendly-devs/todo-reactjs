import { takeEvery } from 'redux-saga';
import fetchTodoList from '../features/todos/todoSagas';

function* rootSaga() {
  yield takeEvery('todo/fetch_todo_list', fetchTodoList);
}

export default rootSaga;
