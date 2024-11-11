import React, { useEffect, useState } from 'react';
import { TaskCard } from './KanbanStyles';
import { Typography, Box, Stack } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import DoneIcon from '@mui/icons-material/Done';
import DelIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

const TaskCardComponent = ({ task, moveTaskToNextList, delTask }) => {
    const [timeLeft, setTimeLeft] = useState(0); // To hold remaining time in minutes
    const [timeDiff, setTimeDiff] = useState(0); // To hold difference from expected time
    const [formattedEndTime, setFormattedEndTime] = useState(""); // To hold formatted end time

    useEffect(() => {
        const timerInterval = setInterval(() => {
            const currentTime = new Date();
            const expectedEndTime = new Date(task.timerEnd); // The time when the task should end
            const diffInMinutes = Math.floor((currentTime - expectedEndTime) / 60000); // Difference in minutes

            setTimeDiff(diffInMinutes);

            const remainingTime = Math.max(0, Math.floor((expectedEndTime - currentTime) / 60000)); // Remaining time in minutes
            setTimeLeft(remainingTime);
        }, 60000); // Update every minute

        // Format the expected end time
        const expectedTime = new Date(task.timerEnd);
        const formattedTime = `${expectedTime.getHours() > 12 ? expectedTime.getHours() - 12 : expectedTime.getHours()}:${expectedTime.getMinutes() < 10 ? '0' + expectedTime.getMinutes() : expectedTime.getMinutes()} ${expectedTime.getHours() >= 12 ? 'PM' : 'AM'}`;
        setFormattedEndTime(formattedTime);

        return () => clearInterval(timerInterval); // Clean up interval on component unmount
    }, [task.timerEnd]);

    // Helper function to format time in hh:mm AM/PM
    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}:${mins < 10 ? '0' + mins : mins}`;
    };


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
                <Tooltip title={task.assignedTo || "Unassigned"} arrow>
                <PersonIcon color="action" style={{ cursor: 'pointer' }} />
                </Tooltip>
                <Typography variant="body2" color="textSecondary">
                    {task.assignedTo}
                </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <AccessTimeIcon color="action" />
                    <Typography variant="body2" color="textSecondary">
                        {/* Show the expected end time in hh:mm AM/PM */}
                        {formattedEndTime}
                    </Typography>
                    {timeDiff !== 0 && (
                        <Typography variant="body2" color={timeDiff > 0 ? 'error' : 'success'}>
                            {timeDiff > 0 ? `-${Math.abs(timeDiff)} mins` : `+${Math.abs(timeDiff)} mins`}
                        </Typography>
                    )}
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
