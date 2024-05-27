import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/tasks/';

export const getTasks = () => axios.get(API_URL);

export const createTask = (task) => axios.post(API_URL, task);

export const updateTask = (id, task) => {
    const formattedTask = {
        id: task.id,
        title: task.title,
        description: task.description || "",
        start_time: task.start_time ? new Date(task.start_time).toISOString() : null,
        due_time: task.due_time ? new Date(task.due_time).toISOString() : null,
        status: task.status,
        priority: task.priority || "Low",
        risk: task.risk || "Low",
        effort: task.effort || "",
        duration_value: task.duration_value,
        duration_unit: task.duration_unit,
    };

    console.log("Formatted Task: ", formattedTask); // Debugging statement

    return axios.put(`${API_URL}${id}/`, formattedTask);
};

export const deleteTask = (id) => axios.delete(`${API_URL}${id}/`);
