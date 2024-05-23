import './App.css';
import Mainpage from './components/pages/MainPage';
//import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126',
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526',
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    },
    MuiDialog:{
      paper:{
        borderRadius:'16px',
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  },
})

// const useStyles = makeStyles({
//   appMain: {
//     paddingLeft: '320px',
//     width: '100%'
//   }
// })

function App() {
  // const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  // const [allTodos, setTodos] = useState([]);
  // const [alerts, setAlerts] = useState([]);
  // const [notificationShown, setNotificationShown] = useState([]);
  // const classes = useStyles();

  // // Function to fetch data from Django backend
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/api/todos/");
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch data');
  //     }
  //     const data = await response.json();
  //     setTodos(data); // Set the fetched todos in the state
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error.message);
  //   }
  // };

  // // Function to handle adding a new todo
  // const makeTodos = async (newTodoItem) => {
  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/api/todos/", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newTodoItem),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to add todo');
  //     }
  //     fetchData(); // Fetch updated todo list after adding a new todo
  //   } catch (error) {
  //     console.error('Error adding todo:', error.message);
  //   }
  // };
  

  // const handleNotification = (type, message) => {
  //   setAlerts(prevAlerts => [...prevAlerts, { type, message }]);
  //   console.log('Notification triggered:', type, message);
  // };

  // const showNotification = (item, index) => {
  //   if (!notificationShown[index]) {
  //     handleNotification('info', `Deadline for task "${item.title}" has passed!`);
  //     setNotificationShown(prev => {
  //       const updatedShown = [...prev];
  //       updatedShown[index] = true;
  //       return updatedShown;
  //     });
  //   }
  // };

  // allTodos.forEach((item, index) => {
  //   const deadline = item.deadline ? dayjs(item.deadline) : null;
  //   const hasDeadlinePassed = deadline && deadline.isBefore(dayjs());

  //   if (hasDeadlinePassed) {
  //     showNotification(item, index);
  //   }
  // });
  
  // useEffect(() => {
  //   fetchData();
  // }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <div>
       <Mainpage/>
      </div>
      
    </ThemeProvider>
  );
}

export default App;
