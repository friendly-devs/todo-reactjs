import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import HomePage from './components/pages/HomePage';
import TodoListStorage from './context/TodoListStorage';

export const TodoContext = React.createContext();

export default function App() {
  return (
    <Provider store={store}>
      <TodoContext.Provider value={TodoListStorage()}>
        <HomePage />
      </TodoContext.Provider>
    </Provider>
  );
}
