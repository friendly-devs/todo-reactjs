import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { TodoContext } from '../../../../App';
import FormTodo from '../FormTodo';
import Alert from '../../../common/Alert';

export default function CreateTodo(props) {
  const { onCancel } = props;
  const { saveTodo } = useContext(TodoContext);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [count, setCount] = useState(0);

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
      saveTodo(name, status);
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
