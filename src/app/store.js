import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

function logger({ getState }) {
  return (next) => (action) => {
    window.console.log('will dispatch', action);

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);

    window.console.log('state after dispatch', getState());

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
}

// function saveTodos({ getState }) {
//   return (next) => (action) => {
//     const { todo: todoBefore } = getState();
//     const { list: listBefore } = todoBefore;

//     const returnValue = next(action);

//     const { todo: todoAfter } = getState();
//     const { list: listAfter } = todoAfter;

//     if (listBefore !== listAfter) {
//       // Save to localStorage
//       window.localStorage.setItem('KEY_TODO', JSON.stringify(listAfter));
//       window.console.log('Save change');
//     }

//     return returnValue;
//   };
// }

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const middleware = [logger, sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export default store;
