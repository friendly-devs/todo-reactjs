import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../common/Button';
import TextInput from '../../../common/TextInput';
import SelectionLabel from '../../../common/SelectionLabel';
import todoStatus from '../../../../constants/todoStatus';

import './index.css';

const initialName = '';
const initialStatus = todoStatus.ACTIVE;
const initialTitle = 'Thêm công việc';

export default function FormTodo(props) {
  const {
    defaultName = initialName,
    defaultStatus = initialStatus,
    defaultTitle = initialTitle,
    onSubmit,
    onCancel,
  } = props;

  const [name, setName] = useState(defaultName);
  const [status, setStatus] = useState(defaultStatus);

  useEffect(() => {
    setName(defaultName);
  }, [defaultName]);

  useEffect(() => {
    setStatus(defaultStatus);
  }, [defaultStatus]);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const onClick = () => {
    if (name !== '') {
      onSubmit(name, status);

      if (defaultTitle === initialTitle) {
        setName(initialName);
        setStatus(initialStatus);
      }
    } else {
      alert('Nhập đầy đủ dữ liệu!');
    }
  };

  return (
    <div className="wrapper">
      <div className="header">
        <p>{defaultTitle}</p>
      </div>

      <div className="container">
        <TextInput
          value={name}
          label="Tên:"
          name="name"
          onChange={handleChangeName}
        />

        <SelectionLabel
          label="Trạng thái:"
          value={status}
          options={[todoStatus.ACTIVE, todoStatus.INACTIVE]}
          onChange={handleChangeStatus}
        />

        <div className="bottom-wrapper">
          <Button onClick={onClick}>Lưu lại</Button>
          <Button variant="error" onClick={onCancel}>
            Hủy bỏ
          </Button>
        </div>
      </div>
    </div>
  );
}

FormTodo.propTypes = {
  defaultName: PropTypes.string,
  defaultStatus: PropTypes.string,
  defaultTitle: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

FormTodo.defaultProps = {
  defaultName: initialName,
  defaultStatus: initialStatus,
  defaultTitle: initialTitle,
};
