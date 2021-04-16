import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';

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

const store = createStore(rootReducer, applyMiddleware(logger));

export default store;
