import React, { useContext, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

import CreatTodo from './CreateTodo';
import TodoList from './TodoList';
import Button from '../../common/Button';

import './index.css';
import UpdateTodo from './UpdateTodo';
import { TodoContext } from '../../../App';
import Search from '../../common/Search';
import SortText from './SortText';

const timeDelay = 500; // milliseconds

export default function HomePage() {
  const [enable, setEnable] = useState(true);
  const [isUpdate, setUpdate] = useState(false);
  const [todo, setTodo] = useState({});

  const { findById, findAllTodoByName } = useContext(TodoContext);

  const onCancel = () => {
    setEnable(false);
  };

  const showForm = () => {
    setUpdate(false);
    setEnable(true);
  };

  const onUpdateTodo = (id) => {
    const currentTodo = findById(id);
    setTodo(() => currentTodo);
    setUpdate(true);
    setEnable(true);
  };

  const debouncedSave = useCallback(
    debounce((value) => findAllTodoByName(value), timeDelay),
    [],
  );

  const onChangeHandle = (event) => {
    debouncedSave(event.target.value);
  };

  const element = isUpdate ? (
    <UpdateTodo onCancel={onCancel} todo={todo} />
  ) : (
    <CreatTodo onCancel={onCancel} />
  );

  const elementWrapper = <div className="todo-form">{element}</div>;

  return (
    <>
      <div>
        <h1>Quản lý công việc</h1>
        <hr />
      </div>

      <div className="root-container">
        {enable && elementWrapper}

        <div className="todo-content">
          <Button onClick={showForm}>Thêm công việc</Button>
          <div>
            <Search onChange={onChangeHandle} />
            <SortText />
          </div>
          <TodoList onUpdateTodo={onUpdateTodo} onCancel={onCancel} />
        </div>
      </div>
    </>
  );
}
