import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { Link } from 'react-router-dom';

import SortText from '../../todos/SortText';
import TodoList from '../../todos/TodoList';

import Button from '../../../common/Button';
import Search from '../../../common/Search';
import Alert from '../../../common/Alert';

import { setTextSearch } from '../../todos/todoAction';
import './index.css';

const TIME_DELAY = 300; // milliseconds
const defaultMessage = {
  content: '',
  type: '',
};

export default function HomePage() {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const message = useSelector((states) => states.todo.message);

  const { content, type } = message ?? defaultMessage;

  useEffect(() => {
    setCount(count + 1);
  }, [message]);

  const debouncedSave = useCallback(
    debounce((value) => {
      dispatch(setTextSearch(value));
    }, TIME_DELAY),
    [],
  );

  const onChangeHandle = (event) => {
    debouncedSave(event.target.value);
  };

  return (
    <>
      <div>
        <h1>Quản lý công việc</h1>
        <hr />
      </div>

      <div className="root-container">
        <div className="todo-content">
          <Link to="/todos/create">
            <Button>Thêm công việc</Button>
          </Link>

          <div className="todo-content-header">
            <Search onChange={onChangeHandle} />
            <SortText />
          </div>
          <TodoList />
          <Alert key={count} message={content} variant={type} />
        </div>
      </div>
    </>
  );
}
