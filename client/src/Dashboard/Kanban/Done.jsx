import React from 'react';
import { TaskListArea } from './KanbanStyles';
import TaskCardComponent from './TaskCard';
import { Typography } from '@mui/material';

const Done = () => {
    const tasks = [
        { title: 'Task 4', description: 'Description for Task 4', assignedTo: 'Dave', timer: 0 },
    ];

    return (
        <TaskListArea>
            <Typography variant="h6" textAlign="center" mb={5}>Completed</Typography>
            {tasks.map((task, index) => (
                <TaskCardComponent key={index} task={task} />
            ))}
        </TaskListArea>
    );
};

export default Done;
