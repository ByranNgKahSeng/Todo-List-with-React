import React, { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';

const AddTodo = ({ makeTodos }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTime, setTime] = useState(dayjs());
  const [newDate, setDate] = useState(dayjs());
  // Determine if the selected date is today to adjust minTime
  const minTime = dayjs().isSame(newTime, 'date') ? dayjs() : dayjs().startOf('day');


  // Add Todo Function
  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      time: newTime,
      date: newDate,
    };

    makeTodos(newTodoItem);
    setNewTitle("");
    setNewDescription("");
    setTime(dayjs());
    setDate(dayjs());
  };

  return (
    <Box >
      <Stack direction="row" spacing={2} sx={{display:'flex', paddingBottom:'15px', justifyContent:"space-between"}}>
        
          <TextField
            required
            label="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="What's the task title?"
            sx={{'& .MuiFormLabel-root': {
              // Modify label styles
              color: 'white',}}}
          />

          

          <Button
            variant="contained"
            onClick={handleAddTodo}
            className="primaryBtn"
            disabled={!newTitle}
          >
            Add
          </Button>
      </Stack>

      <Stack direction="row" spacing={2} sx={{display:'flex', paddingBottom:'15px'}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker 
              label="Due Date"
              value={newDate}
              onChange={(selectedDate) => setDate(selectedDate)} 
              minDate={dayjs()}
              sx={{'& .MuiFormLabel-root': {
                color: 'white',}}}
            />
          <TimePicker
              label="Due Time"
              value={newTime}
              onChange={(selectedTime) => setTime(selectedTime)}
              minTime={minTime}
              sx={{'& .MuiFormLabel-root': {
                color: 'white',}}}
            />
          </LocalizationProvider>
      </Stack>

      <Stack sx={{ borderBottom: '2px solid #325158', paddingBottom: '25px' }}>
        <TextField
            label="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="What's the task description?"
            sx={{'& .MuiFormLabel-root': {
              // Modify label styles
              color: 'white',}}}
          />
      </Stack>
    </Box>
  );
};

export default AddTodo;
