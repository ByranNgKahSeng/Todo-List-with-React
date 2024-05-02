import './App.css';
import React, { useState } from 'react';
import { Stack, Box } from "@mui/material";
import AddTodo from './components/AddTodo';
import TodoList from './components/Todolist';
import Notification from './components/Alert';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [showAlert, setShowAlert] = useState(true);
  const [alertConfig, setAlertConfig] = useState({ type: 'success', message: 'Page Loaded Successfully!' });
 
  const makeTodos = (newTodoItem) => {
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  }

  const handleNotification = ( type1, message1 ) => {
    // Logic for handling the completion of a todo
    setAlertConfig({ type: type1, message: message1 });
    setShowAlert(true);
  };

  const handleAlertHide = () => {
    setShowAlert(false);
  };

  return (
    <Stack className="App">
      <h1>Todo-List</h1>
      <div className='todo-wrapper'>
        
        <AddTodo makeTodos={makeTodos} />
        
        <Stack direction="row" className='btn-area'>

          <button 
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} 
            onClick={()=>setIsCompleteScreen(false)}>
            Task
            </button>

          <button 
            className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} 
            onClick={()=>setIsCompleteScreen(true)}>
            Completed
            </button>
        </Stack>

        <TodoList 
          isCompleteScreen={isCompleteScreen} 
          allTodos={allTodos} 
          setTodos={setTodos} 
          handleNotification={handleNotification}
        />
        
      </div>

      <Box direction='column' 
        sx={{ display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center', // Centers the content vertically within the box
              alignItems: 'center',     // Centers the content horizontally within the box
              position: 'fixed', 
              left: '50%',              // Moves the left edge to the center of the screen
              bottom: 0,
              transform: 'translateX(-50%)', // Moves it back 50% of its width, centering it horizontally
              width: '100%',            // Optional: spans the entire width if needed for design
              textAlign: 'center',
              marginBottom:"15px"
               }}>
        <Notification 
        show={showAlert} 
        type={alertConfig.type}
        message={alertConfig.message} 
        onHide={handleAlertHide} 
        />
      </Box>
    </Stack>
  );
}

export default App;
