import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { Stack, Box } from "@mui/material";
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';

function TodoList({ isCompleteScreen, allTodos, setTodos }) {
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [currentEditedItem, setCurrentEditedItem] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteTodo = async (index) => {
    const todoToDelete = allTodos[index];

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/todos/${todoToDelete.id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      const updatedTodos = allTodos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
      enqueueSnackbar('Task deleted !', { variant: 'warning' });
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  const handleDeleteCompletedTodo = async (index) => {
    const todoToDelete = completedTodos[index];

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/completed_todos/${todoToDelete.id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete completed todo');
      }

      const updatedCompletedTodos = completedTodos.filter((_, i) => i !== index);
      setCompletedTodos(updatedCompletedTodos);
      enqueueSnackbar('Completed Task deleted !', { variant: 'info' });
    } catch (error) {
      console.error('Error deleting completed todo:', error.message);
    }
  };

  const handleCompleteTodo = async (index) => {
    const todoToComplete = allTodos[index];
    const completedOn = dayjs().format('YYYY-MM-DD HH:mm:ss');
  
    try {
      // Move todo to completed todos endpoint
      const response = await fetch(`http://127.0.0.1:8000/api/completed_todos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...todoToComplete, completedOn }),
      });
      if (!response.ok) {
        throw new Error('Failed to complete todo');
      }
  
      // Delete todo from todos endpoint
      const deleteResponse = await fetch(`http://127.0.0.1:8000/api/todos/${todoToComplete.id}/`, {
        method: 'DELETE',
      });
      if (!deleteResponse.ok) {
        throw new Error('Failed to delete todo');
      }
  
      // Update state with completed todos
      const updatedCompletedTodos = [...completedTodos, { ...todoToComplete, completedOn }];
      setCompletedTodos(updatedCompletedTodos);
  
      // Remove completed todo from allTodos
      const updatedAllTodos = allTodos.filter((_, i) => i !== index);
      setTodos(updatedAllTodos);
  
      enqueueSnackbar('Task completed !', { variant: 'success' });
    } catch (error) {
      console.error('Error completing todo:', error.message);
    }
  };
  

  const handleEdit = (index, item) => {
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  };

  
  const handleUpdateTodo = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/todos/${currentEditedItem.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentEditedItem),
      });
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      // Update the todo in the local state
      const updatedTodos = allTodos.map((todo, index) => (index === currentEdit ? currentEditedItem : todo));
      setTodos(updatedTodos);

      // Reset edit state
      setCurrentEdit(null);
      setCurrentEditedItem({});

      enqueueSnackbar('Task updated !', { variant: 'success' });
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
  };

  useEffect(() => {
    // Fetch completed todos from the backend on component mount
    const fetchCompletedTodos = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/completed_todos/');
        if (!response.ok) {
          throw new Error('Failed to fetch completed todos');
        }
        const data = await response.json();
        setCompletedTodos(data);
      } catch (error) {
        console.error('Error fetching completed todos:', error.message);
      }
    };

    fetchCompletedTodos();
  }, []);

  return (
    <Box>
      <div className='todo-list'>
        {isCompleteScreen === false &&
          allTodos.map((item, index) => {
            const deadline = item.deadline ? dayjs(item.deadline) : null;
            const hasDeadlinePassed = deadline && deadline.isBefore(dayjs());
            const itemClassName = hasDeadlinePassed ? 'todo-list-item-deadline-passed' : 'todo-list-item';

            if (currentEdit === index) {
              // Edit the Todo List
              return (
                <div className='edit-wrapper' key={index}>
                  <div>
                    <p>Title</p>
                    <input
                      type='text'
                      placeholder='Update Title'
                      onChange={(e) => setCurrentEditedItem({ ...currentEditedItem, title: e.target.value })}
                      value={currentEditedItem.title}
                    />
                    <p>Description</p>
                    <input
                      type='text'
                      placeholder='Update Description'
                      onChange={(e) => setCurrentEditedItem({ ...currentEditedItem, description: e.target.value })}
                      value={currentEditedItem.description}
                    />
                  </div>
                  <div>
                    <button type='button' onClick={handleUpdateTodo} className='primaryBtn'>
                      Update
                    </button>
                  </div>
                </div>
              );
            } else {
              // Shows Todo list
              return (
                <Box className={itemClassName} key={index}>
                  <Stack>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Due Date: {dayjs(item.deadline).format('YYYY-MM-DD HH:mm:ss')}</small>
                    </p>
                  </Stack>
                  <Stack direction={'row'}>
                    <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} title='Delete?' />
                    <BsCheckLg className='check-icon' onClick={() => handleCompleteTodo(index)} title='Complete?' />
                    <AiOutlineEdit className='check-icon' onClick={() => handleEdit(index, item)} title='Edit?' />
                  </Stack>
                </Box>
              );
            }
          })}
        {isCompleteScreen === true &&
          completedTodos.map((item, index) => (
            // Shows Completed Todo list
            <div className='todo-list-item' key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>
                  <small>Completed on: {item.completedOn}</small>
                </p>
              </div>
              <div>
                <AiOutlineDelete className='icon' onClick={() => handleDeleteCompletedTodo(index)} title='Delete?' />
              </div>
            </div>
          ))}
      </div>
    </Box>
  );
}

export default TodoList;
