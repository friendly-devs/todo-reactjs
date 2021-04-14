import { useEffect, useState } from 'react';
import Utils from '../utils/StringUtils';
import SortType from '../constants/SortType';

const KEY_MAP = 'todo.map';

function readMapFromLocalStorage() {
  const map = new Map();
  const data = localStorage.getItem(KEY_MAP);

  if (data != null) {
    const obj = JSON.parse(data);

    Object.keys(obj).forEach((key) => {
      map.set(key, obj[key]);
    });
  }

  return map;
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

function convertToList(map) {
  const list = [];

  map.forEach((value, key) => {
    list.push({
      id: key,
      name: value.name,
      status: value.status,
    });
  });

  return list;
}

function saveToLocalStorage(map) {
  const json = {};

  map.forEach((value, key) => {
    json[key] = value;
  });

  localStorage.setItem(KEY_MAP, JSON.stringify(json));
}

function getListSearch(list, text) {
  if (text.trim() === '') {
    return list;
  }
  return list.filter(({ name }) => Utils.includesIgnoreCase(name, text));
}

function getListSearchAndSort(list, text, sort) {
  const listSearched = getListSearch(list, text);

  if (sort === SortType.NONE) {
    return listSearched;
  }

  const compare = getSortFunction(sort);
  return listSearched.sort(compare);
}

const initialTodoMap = readMapFromLocalStorage();
const initialTodoList = [];

/**
 *
 * @returns {
 * saveTodo,
 * deleteTodo,
 * updateTodo,
 * findById,
 * findAllTodoByName,
 * setSort,
 * todoList,
 * }
 */
export default function TodoListStorage() {
  const [sort, setSort] = useState(SortType.NONE);
  const [textSearch, setTextSearch] = useState('');
  const [todoMap, setTodoMap] = useState(initialTodoMap);
  const [todoList, setTodoList] = useState(initialTodoList);

  useEffect(() => {
    const list = convertToList(todoMap);
    const showList = getListSearchAndSort(list, textSearch, sort);
    window.console.log('change todo map');
    setTodoList(showList);
    saveToLocalStorage(todoMap);
  }, [todoMap]);

  useEffect(() => {
    const list = convertToList(todoMap);
    const showList = getListSearchAndSort(list, textSearch, sort);
    window.console.log('change search or sort');
    setTodoList(showList);
  }, [textSearch, sort]);

  const saveTodo = (name, status) => {
    const nameFormatted = name.trim();
    if (nameFormatted === '') {
      throw new Error('Tên không được để trống');
    }

    const id = Utils.toSlug(nameFormatted);
    if (todoMap.has(id)) {
      throw new Error('Tên đã tồn tại');
    }

    const newMap = new Map(todoMap);
    const todo = {
      name: nameFormatted,
      status,
    };

    newMap.set(id, todo);
    setTodoMap(newMap);
  };

  const deleteTodo = (id) => {
    if (todoMap.has(id)) {
      const newMap = new Map(todoMap);
      newMap.delete(id);

      setTodoMap(newMap);
    } else {
      throw new Error(`Can't delete key ${id}`);
    }
  };

  const updateTodo = (id, name, status) => {
    if (todoMap.has(id)) {
      const nameFormatted = name.trim();
      const todo = {
        name: nameFormatted,
        status,
      };

      const newId = Utils.toSlug(nameFormatted);

      if (todoMap.has(newId)) {
        throw new Error('Tên đã tồn tại');
      } else {
        const newMap = new Map(todoMap);
        newMap.delete(id);
        newMap.set(newId, todo);

        setTodoMap(newMap);
      }
    } else {
      throw Error(`Cannot update todo ${id}`);
    }
  };

  const findById = (id) => {
    const value = todoMap.get(id);
    return {
      ...value,
      id,
    };
  };

  const findAllTodoByName = (text) => {
    const textFormatted = text.trim();
    setTextSearch(textFormatted);
  };

  return {
    saveTodo,
    deleteTodo,
    updateTodo,
    findById,
    findAllTodoByName,
    setSort,
    todoList,
  };
}
