import React, { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";

const AddTodo = ({ makeTodos }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Add Todo Function
  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    };

    makeTodos(newTodoItem);
    setNewTitle("");
    setNewDescription("");
  };

  return (
    <Stack direction="row" spacing={2} className='todo-input'>
      <div>
        <TextField
          required
          label="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="What's the task title?"
          className="todo-input-item"
        />
      </div>
      <div>
        <TextField
          label="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="What's the task description?"
          className="todo-input-item"
        />
      </div>
      <div className='todo-input-item'>
        <Button
          variant="contained"
          onClick={handleAddTodo}
          className="primaryBtn"
          disabled={!newTitle}
        >
          Add
        </Button>
      </div>
    </Stack>
  );
};

export default AddTodo;
