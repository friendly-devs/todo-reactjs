import React, { useContext, useState } from "react";
import Button from "../../../common/Button";
import SortType from "../../../../constants/SortType";
import { TodoContext } from "../../../../App";
import "./index.css";

function ListSort({ onClose }) {
  const { setSort } = useContext(TodoContext);

  const listItem = [
    {
      name: "Tên A-Z",
      type: SortType.INCREASE,
    },
    {
      name: "Tên Z-A",
      type: SortType.DECREASE,
    },
    {
      name: "Trạng thái kích hoạt",
      type: SortType.STATUS_ACTIVE,
    },
    {
      name: "Trạng thái ẩn",
      type: SortType.STATUS_INACTIVE,
    },
  ];

  const elements = listItem.map((item) => (
    <li
      onBlur={() => console.log('bug')}
      key={item.type}
      onClick={() => {
        onClose();
        setSort(item.type);
      }}
    >
      {item.name}
    </li>
  ));

  return <ul className="sort-head-component">{elements}</ul>;
}

export default function Sort() {
  const [show, setShow] = useState(false);

  const onClose = () => {
    setShow(false);
  };

  const onClick = () => {
    setShow(!show);
  };

  const element = show ? <ListSort onClose={onClose} /> : null;

  return (
    <span className="sort-container">
      <Button onClick={onClick}>Sắp xếp</Button>
      {element}
    </span>
  );
}
