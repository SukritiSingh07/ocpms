import React from 'react';
import { Box, Typography } from '@mui/material';
import TaskCard from './TaskCard';

const Todo = () => {
    const dummyTasks = [
        { title: 'Task 1', description: 'Description of Task 1' },
        { title: 'Task 2', description: 'Description of Task 2' },
    ];

    return (
        <Box p={2} bgcolor="#f0f0f0" borderRadius={2}>
            <Typography variant="h6" mb={2}>To Do</Typography>
            {dummyTasks.map((task, index) => (
                <TaskCard key={index} task={task} />
            ))}
        </Box>
    );
};

export default Todo;
