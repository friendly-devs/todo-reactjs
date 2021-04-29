import { combineReducers } from 'redux';
import todoReducer from '../features/todos/todoReducer';

const rootReducer = combineReducers({
  todo: todoReducer,
});

export default rootReducer;
