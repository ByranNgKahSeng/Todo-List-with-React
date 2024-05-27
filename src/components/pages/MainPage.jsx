import { useState, useEffect } from "react";
import { Container, Typography, Box, CircularProgress, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Popup from "../Popup";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { getTasks, createTask, updateTask, deleteTask } from '../api';
import dayjs from "dayjs";
import { DragDropContext } from 'react-beautiful-dnd';
import { enqueueSnackbar } from "notistack";
import { type } from "@testing-library/user-event/dist/type";

export default function MainPage() {
    const [tasks, setTasks] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            console.error("There was an error fetching the tasks!", error);
        }
    };

    // const addOrEdit = async (task, resetForm) => {
    //     try {
    //         if (!task.id) {
    //             await createTask(task);
    //         } else {
    //             await updateTask(task.id, task);
    //         }
    //         fetchTasks();
    //         resetForm();
    //         setOpenPopup(false);
    //     } catch (error) {
    //         console.error('There was an error saving the task!', error);
    //     }
    // };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            enqueueSnackbar('Task deleted', { variant:'warning' });
            fetchTasks();
        } catch (error) {
            console.error('There was an error deleting the task!', error);
        }
    };

    const openInPopup = (item) => {
        setRecordForEdit(item);
        setOpenPopup(true);
    };

    const handleStatusChange = async (task) => {
        handleTaskAction(task);
    };

    const onFormSubmit = async (values) => {
        handleTaskAction(values);
    };

    const handleTaskAction = async (values) => {
        const formattedValues = {
            ...values,
            start_time: dayjs(values.start_time).toISOString(),
            due_time: values.due_time ? dayjs(values.due_time).toISOString() : null,
        };
    
        // Check if the duration unit is 'hours', if yes, convert it to 'Minutes'
        if (values.duration.unit === 'Hours') {
            formattedValues.duration_value = values.duration.value * 60; // Convert hours to minutes
            formattedValues.duration_unit = 'Minutes';
        } else {
            formattedValues.duration_value = values.duration.value;
            formattedValues.duration_unit = 'Minutes';
        }
    
        try {
            if (values.id) {
                // Update existing task
                const updatedTask = {
                    ...formattedValues,
                    status: values.status === 'Completed' ? 'Pending' : 'Completed',
                };
                await updateTask(values.id, updatedTask);
                enqueueSnackbar('Success!', { variant:'success' });
                const updatedTasks = tasks.map(t => t.id === values.id ? updatedTask : t);
                setTasks(updatedTasks);
            } else {
                // Create new task
                await createTask(formattedValues);
                enqueueSnackbar('Task Created!', { variant:'info' });
            }
            setOpenPopup(false);
        } catch (error) {
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
        }
    };    

    useEffect(() => {
        fetchTasks();
    }, [openPopup]);

    const onDragEnd = async (result) => {
        if (!result.destination) return;
    
        const { destination } = result;
    
        let movedTask = tasks.find(
          (task) => task.id.toString() === result.draggableId.toString()
        );
    
        movedTask.status = destination.droppableId;
    
        const updatedTaskPayload = {
          id: movedTask.id,
          title: movedTask.title,
          description: movedTask.description,
          start_time: movedTask.start_time,
          due_time: movedTask.due_time,
          status: movedTask.status,
          priority: movedTask.priority,
          risk: movedTask.risk,
          effort: movedTask.effort,
          duration_value: movedTask.duration.value,
          duration_unit: movedTask.duration.unit,
        };
    
        try {
          await updateTask(movedTask.id, updatedTaskPayload);
          setTasks((task) => {
            const filteredTask = task.filter((unit) => unit.id !== movedTask.id);
    
            return [...filteredTask, movedTask];
          });
        } catch (error) {
          console.error("Error updating task:", error);
        }
      };

    const completedTasks = tasks.filter(task => task.status === 'Completed').length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    return (
        <div style={{ maxHeight: 'calc(100vh - 20px)', overflowY: 'auto' }}>
            <Container>
                <Box mt={5} mb={3}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h4" fontWeight='bold'>Hello, Bella!</Typography>
                        <Button
                            variant="contained"
                            onClick={() => setOpenPopup(true)}
                            color="secondary"
                            style={{
                                borderRadius: '50%',
                                width: '64px',
                                height: '64px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            >
                            <AddIcon style={{ fontSize: 64, color: 'white' }} />
                        </Button>
                    </Box>

                    <Box mt={2} p={3} bgcolor="primary.main" color="black" borderRadius="8px" display="flex" alignItems="center">
                        <Box flexGrow={1}>
                            <Typography variant="h6">Today's Task</Typography>
                            <Typography variant="body2">May 13th, 2024</Typography>
                            <Typography variant="body2" paddingY={'20px'}>{`${completedTasks}/${totalTasks} Task Completed`}</Typography>
                        </Box>
                        <Box width="90px" mx={'10px'} alignItems={'center'} sx={{ position: 'relative', display: 'inline-flex' }}>
                            
                            <CircularProgress
                                variant="determinate"
                                value={100}
                                size={90}
                                sx={{'& .MuiCircularProgress-circle': {
                                    stroke: 'white', // Set the grey color for the remaining portion
                                },}}
                                style={{ position: 'absolute', top: 0, left: 0 }}
                            />
                            <CircularProgress
                                variant="determinate"
                                
                                value={progress}
                                size={90}
                                sx={{
                                color: 'orange', // Set the orange color
                                '& .MuiCircularProgress-circle': {
                                    stroke: 'secondary', // Set the grey color for the remaining portion
                                },
                                }}
                            />
                            <Box
                                sx={{
                                top: 3,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                }}
                            >
                                <Typography variant="caption" component="div" color="white" fontSize={'20px'} fontWeight={'bold'}>
                                {`${Math.round(progress)}%`}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <DragDropContext onDragEnd={onDragEnd}>
                    {['In Progress', 'Pending', 'Completed'].map((status,index) => (
                        <Box key={index} sx={{ width: '100%' }}>
                            <Typography variant="h5" pl={'25px'}>{status}</Typography>
                            <TodoList
                                tasks={tasks.filter((task) => task.status === status)}
                                status={status}
                                onEdit={openInPopup}
                                onDelete={handleDelete}
                                onStatusChange={handleStatusChange}
                            />
                        </Box>
                    ))}
                </DragDropContext>
            </Container>

            <Popup
                title="Todo Form"
                subtitle="Quickly add a new task"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                onSubmit={onFormSubmit}
            >
                <TodoForm
                    recordForEdit={recordForEdit}
                    onFormSubmit={onFormSubmit}
                />
            </Popup>
        </div>
    );
}
