import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import FormTodo from '../FormTodo';
import Alert from '../../../common/Alert';
import { TodoContext } from '../../../../App';

const title = 'Cập nhật công việc';

export default function UpdateTodo(props) {
  const { todo, onCancel } = props;
  const { name, status, id } = todo;
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [count, setCount] = useState(0);

  const { updateTodo } = useContext(TodoContext);

  const alertMessage = message !== '' ? (
    <Alert key={count} message={message} variant={messageType} />
  ) : null;

  const showMessage = (text, type = 'success') => {
    setCount(count + 1);
    setMessage(text);
    setMessageType(type);
  };

  const onSubmit = (nameValue, statusValue) => {
    try {
      updateTodo(id, nameValue, statusValue);
      onCancel();
      showMessage('Cập nhật thành công');
    } catch (e) {
      showMessage(e.message, 'error');
    }
  };

  return (
    <>
      <FormTodo
        defaultName={name}
        defaultStatus={status}
        defaultTitle={title}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
      {alertMessage}
    </>
  );
}

UpdateTodo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};
