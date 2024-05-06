import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { Stack, Box } from "@mui/material";
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';

function TodoList({ isCompleteScreen, allTodos, setTodos, handleNotification }) {
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(" ");
  const [currentEditedItem, setCurrentEditItem] = useState(" ");
  const { enqueueSnackbar } = useSnackbar();
  const [notificationShown, setNotificationShown] = useState([]);

  // Delete Todo Function
  const handleDeleteTodo = ({ index, message, variant }) => {
    let reduceTodo = [...allTodos];
    reduceTodo.splice(index, 1);

    // Save it in local storage
    localStorage.setItem('todolist', JSON.stringify(reduceTodo));
    setTodos(reduceTodo);
    
    enqueueSnackbar(message, { variant: variant });
  }

  // Complete Todo Function
  const handleCompleteTodo = index => {
    let now = dayjs();
    let dd = now.get('date');
    let mm = now.get('month') + 1;
    let yy = now.get('year');
    let h = now.get('hour');
    let m = now.get('minute');
    let s = now.get('second');
    let completedOn = `${dd}-${mm}-${yy} at ${h}:${m}:${s}`;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo({ index, message: 'Task completed !', variant: 'success' });

    // saved it into local storage
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));

    //show success notification
    handleNotification('success', 'Task Completed !');
  }

  // Delete "Completed" Todo Function
  const handleDeleteCompletedTodo = index => {
    let reduceTodo = [...completedTodos];
    reduceTodo.splice(index, 1);

    // Save it in local storage
    localStorage.setItem('completedTodos', JSON.stringify(reduceTodo));
    setCompletedTodos(reduceTodo);

    //show warning notification
    handleNotification('warning', 'Completed Task Deleted !');
  }

  const handleEdit = (index, item) => {
    console.log(index);
    setCurrentEdit(index);
    setCurrentEditItem(item);
  }

  const handleUpdateTitle = (value) => {
    setCurrentEditItem(prev => {
      return { ...prev, title: value }
    })
  }

  const handleUpdateDescription = (value) => {
    setCurrentEditItem(prev => {
      return { ...prev, description: value }
    })
  }

  const handleUpdateTodo = (index) => {
    let EditedTodo = [...allTodos];
    EditedTodo[currentEdit] = currentEditedItem;
    setTodos(EditedTodo);
    setCurrentEdit("");
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist')); //convert into array
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  
    const showNotification = (item, index) => {
      if (!notificationShown[index]) {
        enqueueSnackbar(`Deadline for task "${item.title}" has passed!`, { variant: 'info' });
        setNotificationShown(prev => {
          const updatedShown = [...prev];
          updatedShown[index] = true;
          return updatedShown;
        });
      }
    };
  
    allTodos.forEach((item, index) => {
      const deadline = item.deadline ? dayjs(item.deadline) : null;
      const hasDeadlinePassed = deadline && deadline.isBefore(dayjs());
  
      if (hasDeadlinePassed) {
        showNotification(item, index);
      }
    });
  }, [allTodos, enqueueSnackbar, notificationShown, setTodos, setCompletedTodos]);
  

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
                      onChange={(e) => handleUpdateTitle(e.target.value)}
                      value={currentEditedItem.title}
                    />
                    <p>Description</p>
                    <input
                      type='text'
                      placeholder='Update Description'
                      onChange={(e) => handleUpdateDescription(e.target.value)}
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
                    <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo({ index, message: 'Task deleted !', variant: 'warning' })} title='Delete?' />
                    <BsCheckLg className='check-icon' onClick={() => handleCompleteTodo(index, item)} title='Complete?' />
                    <AiOutlineEdit className='check-icon' onClick={() => handleEdit(index, item)} title='Edit?' />
                  </Stack>
                </Box>
              );
            }
          })}
        {isCompleteScreen === true &&
          completedTodos.map((item, index) => {
            return (
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
                  <AiOutlineDelete
                    className='icon'
                    onClick={() => handleDeleteCompletedTodo(index)}
                    title='Delete?'
                  />
                </div>
              </div>
            );
          })}
      </div>

    </Box>
  );
}

export default TodoList;
