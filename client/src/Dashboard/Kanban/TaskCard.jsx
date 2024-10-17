import React from 'react';
import { TaskCard } from './KanbanStyles';
import { Typography, Box, Avatar, Stack } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import DoneIcon from '@mui/icons-material/Done';

const TaskCardComponent = ({ task }) => {
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
                        {task.timer} mins left
                    </Typography>
                </Stack>
                <DoneIcon />
            </Box>
        </TaskCard>
    );
};

export default TaskCardComponent;
