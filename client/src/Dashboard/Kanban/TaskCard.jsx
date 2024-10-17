import React from 'react';
import { Card, Typography } from '@mui/material';

const TaskCard = ({ task }) => {
    return (
        <Card style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#e0e0e0' }}>
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body2">{task.description}</Typography>
        </Card>
    );
};

export default TaskCard;
