import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { setSortType } from '../../../../action/todo';
import Button from '../../../common/Button';
import SortType from '../../../../constants/SortType';
import './index.css';

const listItem = [
  {
    name: 'Tên A-Z',
    type: SortType.INCREASE,
  },
  {
    name: 'Tên Z-A',
    type: SortType.DECREASE,
  },
  {
    name: 'Trạng thái kích hoạt',
    type: SortType.STATUS_ACTIVE,
  },
  {
    name: 'Trạng thái ẩn',
    type: SortType.STATUS_INACTIVE,
  },
];

function ListSort({ type, setType, onClose }) {
  const elements = listItem.map((item) => (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      key={item.type}
      onMouseDown={() => {
        onClose();
        setType(item.type);
      }}
    >
      {item.type === type ? `${item.name} *` : `${item.name}`}
    </li>
  ));

  return <ul className="sort-head-component">{elements}</ul>;
}

ListSort.propTypes = {
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
};

export default function SortText() {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const sortType = useSelector((states) => states.todo.sortType);

  const onTypeChange = (value) => {
    dispatch(setSortType(value));
  };

  const onClose = () => {
    setShow(false);
  };

  const onClick = () => {
    setShow(!show);
  };

  const element = show ? (
    <ListSort type={sortType} onClose={onClose} setType={onTypeChange} />
  ) : null;

  return (
    <span className="sort-container">
      <Button onClick={onClick} onBlur={onClose}>
        Sắp xếp
      </Button>
      {element}
    </span>
  );
}
