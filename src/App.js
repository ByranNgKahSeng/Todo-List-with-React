import './App.css';
import Mainpage from './components/pages/MainPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme({
  palette: {
    primary: {
      main: "#AED3E6",
      light: '#3c44b126',
    },
    secondary: {
      main: "#F3C86A",
      light: '#f8324526',
      dark: '#111111',
    },
    background: {
      default: "#F3F8FC"
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

function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <div>
       <Mainpage/>
      </div>
      
    </ThemeProvider>
  );
}

export default App;
