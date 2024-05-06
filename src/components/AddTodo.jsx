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

  // Add Todo Function
  const handleAddTodo = () => {
    // Combine date and time to set the deadline
    const deadline = dayjs(newDate).set('hour', newTime.hour()).set('minute', newTime.minute());

    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      deadline: deadline,  // Use the combined datetime as the deadline
    };

    makeTodos(newTodoItem);  // Assuming makeTodos handles the new item
    // Reset form fields
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
          />

          <Button
            variant="contained"
            onClick={handleAddTodo}
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
              onChange={(newVal) => setDate(newVal)}
              minDate={dayjs()}
            />
          <TimePicker
              label="Due Time"
              value={newTime}
              onChange={(newVal) => setTime(newVal)}
            />
          </LocalizationProvider>
      </Stack>

      <Stack sx={{ borderBottom: '2px solid #325158', paddingBottom: '25px' }}>
        <TextField
            label="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="What's the task description?"
          />
      </Stack>
    </Box>
  );
};

export default AddTodo;
