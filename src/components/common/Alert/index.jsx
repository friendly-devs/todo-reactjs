import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default function Alert(props) {
  const { message, variant } = props;
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setHide(false);

    const timeoutId = setTimeout(() => {
      setHide(true);
    }, 2000);

    return () => {
      window.console.log('Clear timeout');
      clearTimeout(timeoutId);
    };
  }, [message]);

  if (hide) {
    return null;
  }

  return (
    <div className={`alert alert-${variant}`} role="alert">
      {message}
    </div>
  );
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

Alert.defaultProps = {
  variant: 'primary',
};
