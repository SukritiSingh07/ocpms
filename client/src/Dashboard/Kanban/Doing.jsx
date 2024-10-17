import React from 'react';
import { Box, Typography } from '@mui/material';
import TaskCard from './TaskCard';

const Doing = () => {
    const dummyTasks = [
        { title: 'Task 3', description: 'Description of Task 3' },
    ];

    return (
        <Box p={2} bgcolor="#f0f0f0" borderRadius={2}>
            <Typography variant="h6" mb={2}>In Progress</Typography>
            {dummyTasks.map((task, index) => (
                <TaskCard key={index} task={task} />
            ))}
        </Box>
    );
};

export default Doing;
