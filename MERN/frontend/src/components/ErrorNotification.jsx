import React from 'react';
import '../styles/ErrorNotification.css';

const ErrorNotification = ({ message }) => {
  return (
    message ? (
      <div className="toast-notification">
        <p>{message}</p>
      </div>
    ) : null
  );
};

export default ErrorNotification;