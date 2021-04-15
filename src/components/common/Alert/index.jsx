import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default function Alert(props) {
  const { message, variant } = props;
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHide(true);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (hide || message === '') {
    return null;
  }

  return (
    <div className={`alert alert-${variant}`} role="alert">
      {message}
    </div>
  );
}

Alert.propTypes = {
  message: PropTypes.string,
  variant: PropTypes.string,
};

Alert.defaultProps = {
  message: '',
  variant: 'primary',
};
