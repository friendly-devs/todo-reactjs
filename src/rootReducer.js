import { combineReducers } from 'redux';
import todoReducer from './reducer/todo';
import homePageReducer from './reducer/homePage';

const rootReducer = combineReducers({
  todo: todoReducer,
  homePage: homePageReducer,
});

export default rootReducer;
