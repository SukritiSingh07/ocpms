import React from 'react';
import { TaskListArea } from './KanbanStyles';
import TaskCardComponent from './TaskCard';
import { Typography } from '@mui/material';

const Doing = () => {
    const tasks = [
        { title: 'Task 3', description: 'Description for Task 3', assignedTo: 'Charlie', timer: 60 },
    ];

    return (
        <TaskListArea>
            <Typography variant="h6" textAlign="center" mb={5}>In Progress</Typography>
            {tasks.map((task, index) => (
                <TaskCardComponent key={index} task={task} />
            ))}
        </TaskListArea>
    );
};

export default Doing;
