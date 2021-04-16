import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import debounce from 'lodash.debounce';

import CreatTodo from './CreateTodo';
import SortText from './SortText';
import TodoList from './TodoList';
import UpdateTodo from './UpdateTodo';

import Button from '../../common/Button';
import Search from '../../common/Search';
import setFormType from '../../../action/homePage';
import formType from '../../../constants/formType';
import './index.css';

// const timeDelay = 500; // milliseconds

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

export default function HomePage() {
  const dispatch = useDispatch();

  const form = useSelector((states) => states.homePage.form);

  // const { findById, findAllTodoByName } = useContext(TodoContext);

  const onUpdateTodo = (id) => {
    // const currentTodo = findById(id);
    // setTodo(() => currentTodo);
    /**
     * code here
     */
    console.log(id);
    // setUpdate(true);
    // setEnable(true);
  };

  // const debouncedSave = useCallback(
  //   debounce((value) => findAllTodoByName(value), timeDelay),
  //   [],
  // );

  const setCloseForm = () => {
    dispatch(setFormType(formType.NONE));
  };

  const setOpenFormCreate = () => {
    dispatch(setFormType(formType.FORM_CREATE));
  };

  const onChangeHandle = (event) => {
    // debouncedSave(event.target.value);
    /**
     * code here
     */
    console.log(event);
  };

  const element = getFormByFormType(form, setCloseForm);
  const elementWrapper = <div className="todo-form">{element}</div>;

  return (
    <>
      <div>
        <h1>Quản lý công việc</h1>
        <hr />
      </div>

      <div className="root-container">
        {elementWrapper}

        <div className="todo-content">
          <Button onClick={setOpenFormCreate}>Thêm công việc</Button>
          <div className="todo-content-header">
            <Search onChange={onChangeHandle} />
            <SortText />
          </div>
          <TodoList onUpdateTodo={onUpdateTodo} onCancel={setCloseForm} />
        </div>
      </div>
    </>
  );
}
