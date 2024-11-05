import React from 'react';
import { TaskListArea } from './KanbanStyles';
import TaskCardComponent from './TaskCard';
import { Typography } from '@mui/material';
import CreateTask from './CreateTask';

const Todo = ({ tasks, moveTaskToNextList, addTask }) => {

    const userType="Leader";
    return (
        <TaskListArea>
            <Typography variant="h6" textAlign="center" mb={5}>To Do</Typography>
            {userType==="Leader"?<CreateTask addTask={addTask}/>:null}
            {tasks.map((task, index) => (
                <TaskCardComponent key={index} task={task} moveTaskToNextList={moveTaskToNextList} />
            ))}
        </TaskListArea>
    );
};

export default Todo;
