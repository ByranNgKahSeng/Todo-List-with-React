import React from 'react';
import { TextField, Stack } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const TimeSelection = ({ selectedTime, handleTimeChange }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
                label="Select a time"
                value={selectedTime}
                onChange={handleTimeChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
};

export default TimeSelection;
