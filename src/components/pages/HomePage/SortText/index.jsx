import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../common/Button';
import SortType from '../../../../constants/SortType';
import { TodoContext } from '../../../../App';
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
  const { setSort } = useContext(TodoContext);

  const elements = listItem.map((item) => (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      key={item.type}
      onMouseDown={() => {
        onClose();
        setType(item.type);
        setSort(item.type);
      }}
    >
      {item.type === type ? `${item.name} *` : `${item.name}`}
    </li>
  ));

  return <ul className="sort-head-component">{elements}</ul>;
}

export default function Sort() {
  const [show, setShow] = useState(false);
  const [type, setType] = useState(SortType.NONE);

  const onTypeChange = (value) => {
    setType(value);
  };

  const onClose = () => {
    setShow(false);
  };

  const onClick = () => {
    setShow(!show);
  };

  const element = show ? (
    <ListSort type={type} onClose={onClose} setType={onTypeChange} />
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

ListSort.propTypes = {
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
};
