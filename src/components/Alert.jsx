import React, { useState, useEffect } from 'react';
import { Alert } from '@mui/material';

const Notification = ({ alerts }) => {
  const [alertQueue, setAlertQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Whenever alerts change, add them to the queue
    setAlertQueue(prevQueue => [...prevQueue, ...alerts]);
  }, [alerts]);

  // Function to handle closing an alert
  const handleClose = index => {
    if (index === currentIndex) {
      setCurrentIndex(prevIndex => prevIndex );
    }
    setAlertQueue(prevQueue => prevQueue.filter((_, i) => i !== index));
  };

  return (
    <>
      {alertQueue.map((alert, index) => (
        <Alert
          key={index}
          severity={alert.type}
          variant="filled"
          sx={{ display: index === currentIndex ? 'flex' : 'none' }}
          onClose={() => handleClose(index)}
        >
          {alert.message}
        </Alert>
      ))}
    </>
  );
};

export default Notification;
