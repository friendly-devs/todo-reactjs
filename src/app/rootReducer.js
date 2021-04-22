import { combineReducers } from 'redux';
import todoReducer from '../features/todos/todoReducer';
import homeReducer from '../features/home/homeReducer';

const rootReducer = combineReducers({
  todo: todoReducer,
  home: homeReducer,
});

export default rootReducer;
