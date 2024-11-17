import React from 'react';
import { TaskListArea } from './KanbanStyles';
import TaskCardComponent from './TaskCard';
import { Typography } from '@mui/material';

const Doing = ({ tasks, moveTaskToNextList, startTimer }) => {
    return (
        <TaskListArea>
            <Typography variant="h6" textAlign="center" mb={5}>In Progress</Typography>
            {tasks?.map((task, index) => (
                <TaskCardComponent 
                    key={index} 
                    task={task} 
                    moveTaskToNextList={moveTaskToNextList} 
                    startTimer={startTimer}
                />
            ))}
        </TaskListArea>
    );
};

export default Doing;
