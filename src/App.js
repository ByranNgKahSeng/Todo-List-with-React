import './App.css';
import React, { useEffect, useState } from 'react';
import { Stack, Box } from "@mui/material";
import AddTodo from './components/AddTodo';
import TodoList from './components/Todolist';
import Notification from './components/Alert';
import dayjs from 'dayjs';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [notificationShown, setNotificationShown] = useState([]);

  const makeTodos = (newTodoItem) => {
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);  
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  }

  const handleNotification = (type, message) => {
    setAlerts(prevAlerts => [...prevAlerts, { type, message }]);
    console.log('Notification triggered:', type, message);
  };

  const showNotification = (item, index) => {
    if (!notificationShown[index]) {
      handleNotification('info', `Deadline for task "${item.title}" has passed!`);
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
  
  useEffect(() => {
    const fetchData = async () => {
      const apiurl = "http://127.0.0.1:8000/api/api/todos/";

      try {
        const response = await fetch(apiurl);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }

    fetchData();

    
  }, []);
  
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

        <Notification alerts={alerts} />
      </Box>

      
    </Stack>
    
  );
}

export default App;
