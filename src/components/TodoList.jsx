import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { Stack, Box } from "@mui/material";
import dayjs from 'dayjs';


function TodoList({ isCompleteScreen, allTodos, setTodos, handleNotification}){
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(" ");
  const [currentEditedItem, setCurrentEditItem] = useState(" ");
  


  // Delete Todo Function
  const handleDeleteTodo = index => {
    let reduceTodo = [...allTodos];
    reduceTodo.splice(index, 1);

    // Save it in local storage
    localStorage.setItem('todolist', JSON.stringify(reduceTodo));
    setTodos(reduceTodo);
  }

  // Complete Todo Function
  const handleCompleteTodo = index => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yy + " at " + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);

    // saved it into local storage
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));

    //show success notification
    handleNotification('success','Task completed !');
  }

  // Delete "Completed" Todo Function
  const handleDeleteCompletedTodo = index => {
    let reduceTodo = [...completedTodos];
    reduceTodo.splice(index, 1);

    // Save it in local storage
    localStorage.setItem('completedTodos', JSON.stringify(reduceTodo));
    setCompletedTodos(reduceTodo);

    //show warning notification
    handleNotification('warning','Completed Task Deleted !');
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
  }, [setTodos, setCompletedTodos])

  return (
    <Box>
    <div className='todo-list'>
      {isCompleteScreen === false &&
        allTodos.map((item, index) => {
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
              <Box className='todo-list-item' key={index}>
                <Stack>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>
                    <small>Due Date: {dayjs(item.date).format('YYYY-MM-DD') + ' ' + dayjs(item.time).format('HH:mm A')}</small>
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
