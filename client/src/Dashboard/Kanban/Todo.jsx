import React from 'react';
import { TaskListArea } from './KanbanStyles';
import TaskCardComponent from './TaskCard';
import { Typography } from '@mui/material';
import CreateTask from './CreateTask';

const Todo = ({ tasks, moveTaskToNextList, addTask, organisations }) => {

    const userType="Leader";

    const handleAddTask = (taskDetails) => {
        // Prepare the data to send to the backend
        const taskData = {
            title: taskDetails.title,
            description: taskDetails.description,
            assignedTo: taskDetails.assignedTo,
            assignedId: taskDetails.assignedId,
            timer: taskDetails.timer
        };
        // Add the task using addTask function (to be sent to the backend)
        addTask(taskData);
    };
    return (
        <TaskListArea>
            <Typography variant="h6" textAlign="center" mb={5}>To Do</Typography>
            {userType==="Leader"?<CreateTask addTask={handleAddTask} organisations={organisations}/>:null}
            {tasks?.map((task, index) => (
                <TaskCardComponent key={index} task={task} moveTaskToNextList={moveTaskToNextList} organisations={organisations}/>
            ))}
        </TaskListArea>
    );
};

export default Todo;
