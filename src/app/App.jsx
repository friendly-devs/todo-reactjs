import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from './store';

import HomePage from '../features/home/HomePage';
import CreateTodo from '../features/todos/CreateTodo';
import UpdateTodo from '../features/todos/UpdateTodo';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/todos/create" exact>
            <CreateTodo />
          </Route>
          <Route path="/todos/:todoId" exact>
            <UpdateTodo />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}
