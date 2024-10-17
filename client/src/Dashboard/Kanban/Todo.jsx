import React from 'react';
import { TaskListArea } from './KanbanStyles';
import TaskCardComponent from './TaskCard';
import { Typography } from '@mui/material';
import CreateTask from './CreateTask';

const Todo = () => {
    const tasks = [
        { title: 'Task 1', description: 'Description for Task 1', assignedTo: 'Alice', timer: 120 },
        { title: 'Task 2', description: 'Description for Task 2', assignedTo: 'Bob', timer: 90 },
    ]; 

    return (
        <TaskListArea>
            <Typography variant="h6" textAlign="center" mb={5}>To Do</Typography>
            <CreateTask />
            {tasks.map((task, index) => (
                <TaskCardComponent key={index} task={task} />
            ))}
        </TaskListArea>
    );
};

export default Todo;
