//Pageheader, Toolbar(add new), Todoitem list, popup dialog
//https://github.com/CodAffection/React-Material-UI-Dialog-Modal-Popup/blob/master/src/pages/Employees/Employees.js#L142
import { useState, useEffect } from "react";
import { Container, Typography, Box, CircularProgress, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Popup from "../Popup";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { getTasks, createTask, updateTask, deleteTask } from '../api'

export default function MainPage() {
    const [tasks, setTasks] = useState([]);
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
        const response = await getTasks();
        setTasks(response.data);
        } catch (error) {
        console.error("There was an error fetching the tasks!", error);
        }
    };

    const addOrEdit = async (tasks, resetForm) => {
        try {
          if (!tasks.id) {
            await createTask(tasks);
          } else {
            await updateTask(tasks.id, tasks);
          }
          fetchTasks();
          resetForm();
          setOpenPopup(false);
        } catch (error) {
          console.error('There was an error saving the task!', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            fetchTasks();
        } catch (error) {
            console.error('There was an error deleting the task!', error);
        }
    };

    const openInPopup = (item) => {
        setRecordForEdit(item);
        setOpenPopup(true);
    };
    
    const handleFormSubmit = (formValues) => {
        // Handle form submission logic here
        console.log("Form submitted with values:", formValues);
        // Close the popup if needed
        setOpenPopup(false);
    };


    const [completedTasks, setCompletedTasks] = useState([4]);

    const handleToggle = (id) => {
        setCompletedTasks((prev) => 
        prev.includes(id) ? prev.filter(taskId => taskId !== id) : [...prev, id]
        );
    };

    const progress = (completedTasks.length / tasks.length) * 100;

    return(
        <div>
            <Container>
                <Box mt={5} mb={3}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h5">Hello, Bella!</Typography>
                        <Button variant="contained" onClick={()=>{setOpenPopup(true)}} color="primary" startIcon={<AddIcon />}>Add Task</Button>
                    </Box>
                    
                    <Box mt={2} p={2} bgcolor="primary.main" color="white" borderRadius="8px" display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography variant="h6">Today's Task</Typography>
                        <Typography variant="body2">May 13th, 2024</Typography>
                        <Typography variant="body2">{`${completedTasks.length}/${tasks.length} Task Completed`}</Typography>
                    </Box>
                    <Box width="50px">
                        <CircularProgress variant="determinate" value={progress} color="success"/>
                        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(progress)}%`}</Typography>
                    </Box>
                    </Box>
                </Box>


                <TodoList 
                    tasks={tasks} 
                    setTasks={setTasks} 
                    onDelete={handleDelete} 
                    onEdit={openInPopup} />

            </Container>

            <Popup
                title="Todo Form"
                subtitle="Quickly add a new task"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup} 
                onSubmit={handleFormSubmit}
                >
                <TodoForm
                    recordForEdit={recordForEdit}
                    onFormSubmit={handleFormSubmit} />
            </Popup>
        </div>
    )
}