import React, { useEffect, useState } from 'react';
import { TaskCard } from './KanbanStyles';
import { Typography, Box, Stack } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import DoneIcon from '@mui/icons-material/Done';
import DelIcon from '@mui/icons-material/Delete';

const TaskCardComponent = ({ task, moveTaskToNextList, delTask }) => {
    
    const [timeLeft, setTimeLeft] = useState(task.timer);

    useEffect(() => {
        let intervalId;
        if (task.list === 'doing' && timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev > 0) {
                        return prev - 1; 
                    } else {
                        clearInterval(intervalId); 
                        return 0;
                    }
                });
            }, 60000); 
        }

        return () => clearInterval(intervalId); 
    }, [task.list, timeLeft]);

    return (
        <TaskCard>
            <Typography 
                variant="h6" 
                textAlign="center" 
                mb={5} 
                fontWeight="bold"
            >
                {task.title}
            </Typography>

            <Typography 
                variant="body1" 
                mb={5}
            >
                {task.description}
            </Typography>

            <Box mt={5} display="flex" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                    <PersonIcon color="action" />
                    <Typography variant="body2" color="textSecondary">
                        {task.assignedTo}
                    </Typography>
               </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <AccessTimeIcon color="action" />
                    <Typography variant="body2" color="textSecondary">
                        {timeLeft > 0 ? `${timeLeft} mins left` : 'Time over!'}
                    </Typography>
                </Stack>

                {task.status === "done" ? (
                    <DelIcon onClick={() => delTask(task._id)} style={{ cursor: 'pointer' }} />
                ) : (
                    <DoneIcon onClick={() => moveTaskToNextList(task._id)} style={{ cursor: 'pointer' }} />
                )}
            </Box>
        </TaskCard>
    );
};

export default TaskCardComponent;
