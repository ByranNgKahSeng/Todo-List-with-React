import React, { useState, useEffect } from 'react';
import { Alert } from '@mui/material';

const Notification = ({ show, type, message }) => {
  const [showAlert, setShowAlert] = useState(show);

  useEffect(() => {
    if (show) {
      setShowAlert(true);

      // Set a timeout to hide the notification after 3 seconds
      const timeout = setTimeout(() => {
        setShowAlert(false);
        console.log(`trigger 'show' = "${show}"`);
      }, 3000);

      // Clean up the timeout when the component unmounts or when `show` changes
      return () => clearTimeout(timeout);
    } else {
      // If `show` changes to `false`, reset showAlert to `false`
      setShowAlert(false);
    }
  }, [show]);

  return (
    <Alert severity={type} variant="filled" sx={{ display: showAlert ? 'flex' : 'none' }}>
      {message}
    </Alert>
  );
};

export default Notification;
