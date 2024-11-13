import React, { useState } from 'react';
import { TaskCreateCard } from './KanbanStyles';
import { Typography, TextField, Button, Box } from '@mui/material';

const CreateTask = ({ addTask }) => {
    const [taskDetails, setTaskDetails] = useState({
        title: '',
        description: '',
        assignedTo: '',
        timer: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails({ ...taskDetails, [name]: value });
    };

    const handleAddTask = () => {
        if (taskDetails.title && taskDetails.description && taskDetails.assignedTo && taskDetails.timer) {
            addTask(taskDetails); 
            setTaskDetails({ title: '', description: '', assignedTo: '', timer: '' }); 
        } else {
            console.log("Please fill all fields!");
        }
    };

    return (
        <TaskCreateCard>
            <Typography variant="h6" gutterBottom>
                Create New Task
            </Typography>
            <TextField
                label="Task Title"
                variant="outlined"
                name="title"
                value={taskDetails.title}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                variant="outlined"
                name="description"
                value={taskDetails.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={3}
                margin="normal"
            />
            <TextField
                label="Assigned To"
                variant="outlined"
                name="assignedTo"
                value={taskDetails.assignedTo}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Timer (minutes)"
                variant="outlined"
                name="timer"
                type="number"
                value={taskDetails.timer}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <Box mt={3}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddTask}
                    fullWidth
                >
                    Add Task
                </Button>
            </Box>
        </TaskCreateCard>
    );
};

export default CreateTask;
