import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import FormTodo from '../FormTodo';
import Alert from '../../../common/Alert';
import { addTodo } from '../../../../action/todo';

export default function CreateTodo(props) {
  const { onCancel } = props;
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const alertMessage = message !== '' ? (
    <Alert key={count} message={message} variant={messageType} />
  ) : null;

  const showMessage = (text, type = 'success') => {
    setCount(count + 1);
    setMessage(text);
    setMessageType(type);
  };

  const onSubmit = (name, status) => {
    try {
      dispatch(addTodo(name, status));
      showMessage('Thêm thành công');
    } catch (e) {
      showMessage(e.message, 'error');
    }
  };

  return (
    <>
      <FormTodo onSubmit={onSubmit} onCancel={onCancel} />
      {alertMessage}
    </>
  );
}

CreateTodo.propTypes = {
  onCancel: PropTypes.func.isRequired,
};
