import React, { useState, useEffect } from 'react';
import { Alert, Stack } from '@mui/material';

const Notification = ({ show, type, message, onHide }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(show);
    const timeout = setTimeout(() => {
      setShowAlert(false);
      onHide();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [show, onHide]);

  return (
    <Stack sx={{ width: 'flex' }} spacing={2}>
      <Alert severity={type} variant='filled' sx={{ display: showAlert ? 'flex' : 'none'}}>
        {message}
      </Alert>
    </Stack>
  );
};

export default Notification;
