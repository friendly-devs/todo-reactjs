import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import CreatTodo from '../../todos/CreateTodo';
import SortText from '../../todos/SortText';
import TodoList from '../../todos/TodoList';
import UpdateTodo from '../../todos/UpdateTodo';

import Button from '../../../common/Button';
import Search from '../../../common/Search';
import Alert from '../../../common/Alert';
import formTypes from '../../../constants/formTypes';

import setFormType from '../homeAction';
import { setTextSearch } from '../../todos/todoAction';
import './index.css';

const TIME_DELAY = 300; // milliseconds
const defaultMessage = {
  content: '',
  type: '',
};

function getFormByFormType(type, onCancel) {
  switch (type) {
    case formTypes.FORM_CREATE:
      return <CreatTodo onCancel={onCancel} />;

    case formTypes.FORM_UPDATE:
      return <UpdateTodo onCancel={onCancel} />;

    default:
      return null;
  }
}

export default function HomePage() {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const form = useSelector((states) => states.home.form);
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

  const setCloseForm = () => {
    dispatch(setFormType(formTypes.NONE));
  };

  const setOpenFormCreate = () => {
    dispatch(setFormType(formTypes.FORM_CREATE));
  };

  const onChangeHandle = (event) => {
    debouncedSave(event.target.value);
  };

  const element = getFormByFormType(form, setCloseForm);

  return (
    <>
      <div>
        <h1>Quản lý công việc</h1>
        <hr />
      </div>

      <div className="root-container">
        <div className="todo-form">{element}</div>

        <div className="todo-content">
          <Button onClick={setOpenFormCreate}>Thêm công việc</Button>
          <div className="todo-content-header">
            <Search onChange={onChangeHandle} />
            <SortText />
          </div>
          <TodoList onCancel={setCloseForm} />
          <Alert key={count} message={content} variant={type} />
        </div>
      </div>
    </>
  );
}
