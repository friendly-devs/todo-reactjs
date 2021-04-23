import React from 'react';
import { useSelector } from 'react-redux';

import Todo from '../Todo';
import './index.css';
import SortTypes from '../../../constants/sortTypes';
import StringUtils from '../../../utils/StringUtils';

function getSortCompare(sortType) {
  switch (sortType) {
    case SortTypes.DECREASE:
      return (i1, i2) => i2.name.localeCompare(i1.name);

    case SortTypes.STATUS_ACTIVE:
      return (i1, i2) => i2.status.localeCompare(i1.status);

    case SortTypes.STATUS_INACTIVE:
      return (i1, i2) => i1.status.localeCompare(i2.status);

    default:
      return (i1, i2) => i1.name.localeCompare(i2.name);
  }
}

function isIncludeText(target, value) {
  const searchSlug = StringUtils.toSlug(value);
  return target.includes(searchSlug);
}

function useTodoList() {
  const list = useSelector((state) => state.todo.list);
  const textSearch = useSelector((states) => states.todo.textSearch);
  const sortType = useSelector((state) => state.todo.sortType);

  const listFilter = list.filter((item) => isIncludeText(item.slug, textSearch));
  const sortCompare = getSortCompare(sortType);
  return listFilter.sort(sortCompare);
}

export default function TodoList() {
  const list = useTodoList();
  const elements = list.map((todo, index) => (
    <Todo
      key={todo.id}
      todo={todo}
      index={index}
    />
  ));

  return (
    <table>
      <thead>
        <tr>
          <td>STT</td>
          <td>Tên</td>
          <td>Trạng thái</td>
          <td>Hành động</td>
        </tr>
      </thead>
      <tbody>{elements}</tbody>
    </table>
  );
}
