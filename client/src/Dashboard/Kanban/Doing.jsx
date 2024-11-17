import React from 'react';
import { TaskListArea } from './KanbanStyles';
import TaskCardComponent from './TaskCard';
import { Typography } from '@mui/material';

const Doing = ({ tasks, moveTaskToNextList, startTimer, userId, selectedproj }) => {
    const members = selectedproj?.member_id || [];  
    const hasAdminRole = members.find((memberObj) => (memberObj.role === "Admin" && memberObj.member._id === userId));
    const filteredTasks = tasks.filter(task => task.assigned_id === userId || hasAdminRole);
    // const filteredTasks = tasks.filter(task => task.assigned_id === userId);
    return (
        <TaskListArea>
            <Typography variant="h6" textAlign="center" mb={5}>In Progress</Typography>
            {filteredTasks?.map((task, index) => (
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
