import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import CreatTodo from './CreateTodo';
import SortText from './SortText';
import TodoList from './TodoList';
import UpdateTodo from './UpdateTodo';

import Button from '../../common/Button';
import Search from '../../common/Search';
import Alert from '../../common/Alert';
import setFormType from '../../../action/homePage';
import SortType from '../../../constants/SortType';
import formType from '../../../constants/formType';
import './index.css';
import Utils from '../../../utils/StringUtils';
import { setTextSearch } from '../../../action/todo';

const KEY_TODO = 'KEY_TODO';
const TIME_DELAY = 500; // milliseconds

function getFormByFormType(type, onCancel) {
  switch (type) {
    case formType.FORM_CREATE:
      return <CreatTodo onCancel={onCancel} />;

    case formType.FORM_UPDATE:
      return <UpdateTodo onCancel={onCancel} />;

    default:
      return null;
  }
}

function getSortFunction(sortType) {
  switch (sortType) {
    case SortType.DECREASE:
      return (i1, i2) => i2.name.localeCompare(i1.name);

    case SortType.STATUS_ACTIVE:
      return (i1, i2) => i2.status.localeCompare(i1.status);

    case SortType.STATUS_INACTIVE:
      return (i1, i2) => i1.status.localeCompare(i2.status);

    default:
      return (i1, i2) => i1.name.localeCompare(i2.name);
  }
}

function filterAndSort(list, text, sortType) {
  let items = [...list];
  if (text !== '') {
    items = items.filter((item) => Utils.includesIgnoreCase(item.name, text));
  }
  const sortFunc = getSortFunction(sortType);
  return items.sort(sortFunc);
}

function useTodoList() {
  const [text, setText] = useState('');
  const [sort, setSort] = useState(SortType.NONE);

  const originalList = useSelector((state) => state.todo.list);
  const list = filterAndSort(originalList, text, sort);

  useEffect(() => {
    const data = JSON.stringify(list);
    window.localStorage.setItem(KEY_TODO, data);
  }, [list]);

  return {
    sort,
    setSort,
    setText,
    list,
  };
}

export default function HomePage() {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const {
    sort, setSort, list,
  } = useTodoList();

  const form = useSelector((states) => states.homePage.form);
  const message = useSelector((states) => states.todo.message);
  const defaultMessage = {
    content: '',
    type: '',
  };
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
    dispatch(setFormType(formType.NONE));
  };

  const setOpenFormCreate = () => {
    dispatch(setFormType(formType.FORM_CREATE));
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
            <SortText sort={sort} setSort={setSort} />
          </div>
          <TodoList list={list} onCancel={setCloseForm} />
          <Alert key={count} message={content} variant={type} />
        </div>
      </div>
    </>
  );
}
