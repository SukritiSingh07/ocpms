import React from 'react';
import { TaskListArea } from './KanbanStyles';
import TaskCardComponent from './TaskCard';
import { Typography } from '@mui/material';
import CreateTask from './CreateTask';

const Todo = ({ tasks, moveTaskToNextList, addTask, organisations, selectedproj, userId }) => {
    const members = selectedproj?.member_id || [];  
    // console.log(userId);
    // Check if there is at least one member with the role "Admin"
    const hasAdminRole = members.find((memberObj) => (memberObj.role === "Admin" && memberObj.member._id === userId));
    // console.log(hasAdminRole);
    const handleAddTask = (taskDetails) => {
        const taskData = {
            title: taskDetails.title,
            description: taskDetails.description,
            assignedTo: taskDetails.assignedTo,
            assignedId: taskDetails.assignedId,
            timer: taskDetails.timer
        };
        addTask(taskData);
    };
    const filteredTasks = tasks.filter(task => task.assigned_id === userId || hasAdminRole);

    return (
        <TaskListArea>
            <Typography variant="h6" textAlign="center" mb={5}>To Do</Typography>
            {/* Render CreateTask only if there is an Admin */}
            {hasAdminRole && (
                <CreateTask 
                    addTask={handleAddTask} 
                    organisations={organisations} 
                    selectedproj={selectedproj}
                />
            )}
            {filteredTasks?.map((task, index) => (
                <TaskCardComponent 
                    key={index} 
                    task={task} 
                    moveTaskToNextList={moveTaskToNextList} 
                    organisations={organisations} 
                    hasAdminRole={hasAdminRole?.role}
                    userId={userId}
                />
            ))}
        </TaskListArea>
    );
};

export default Todo;
