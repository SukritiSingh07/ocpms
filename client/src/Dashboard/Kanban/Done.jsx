import React from 'react';
import { TaskListArea } from './KanbanStyles';
import TaskCardComponent from './TaskCard';
import { Typography } from '@mui/material';

const Done = ({ tasks, delTask }) => {
    return (
        <TaskListArea>
            <Typography variant="h6" textAlign="center" mb={5}>Completed</Typography>
            {tasks.map((task, index) => (
                <TaskCardComponent key={index} task={task} delTask={delTask} />
            ))}
        </TaskListArea>
    );
};

export default Done;
