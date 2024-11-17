import React, { useEffect, useState } from 'react';
import { TaskCard } from './KanbanStyles';
import { Typography, Box, Stack,Chip  } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import DoneIcon from '@mui/icons-material/Done';
import DelIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const formatTime = (date) => {
    const time = new Date(date);
    const day = time.getDate().toString().padStart(2, '0');
    const month = (time.getMonth() + 1).toString().padStart(2, '0');
    const year = time.getFullYear();
    const hours = time.getHours() % 12 || 12;
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
};


const TaskCardComponent = ({ task, moveTaskToNextList, delTask, hasAdminRole }) => {
    const formattedDeadline = formatTime(task.deadline);
    const formattedCompletedTime = task.completed_at ? formatTime(task.completed_at) : null;
    const wasCompletedOnTime = new Date(task.completed_at) <= new Date(task.deadline);
    const completionStatus = wasCompletedOnTime ? "On Time" : "Late";
    const completionColor = wasCompletedOnTime ? "success" : "error";


    return (
        <TaskCard>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {task.title}
                </Typography>
                {/* Visual Status Indicator */}
                {task.status === "done"?
                <Chip
                    label="Completed"
                    color="primary"
                    icon={<DoneAllIcon />}
                    variant="outlined"
                    style={{ fontWeight: 'bold' }}
                />:null}
            </Stack>

            <Typography variant="body2" mb={2} color="textSecondary">
                {task.description}
            </Typography>

            <Box mt={3} display="flex" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Tooltip title={task.assignedToName || "Unassigned"} arrow>
                        <PersonIcon color="action" style={{ cursor: 'pointer' }} />
                    </Tooltip>
                    <Typography variant="body2">
                        {task.assignedTo}
                    </Typography>
                </Stack>
                <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <AccessTimeIcon color="action" />
                        <Typography variant="body2">
                            <strong>Deadline:</strong> {formattedDeadline}
                        </Typography>
                    </Stack>

                    {formattedCompletedTime && (
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <AccessTimeIcon color="action" />
                            <Typography variant="body2">
                                <strong>Completed At:</strong> {formattedCompletedTime}
                            </Typography>
                        </Stack>
                    )}
                </Stack>
            </Box>
            {formattedCompletedTime && (
                <Typography
                    variant="body2"
                    mt={2}
                    color={completionColor}
                    textAlign="center"
                    fontWeight="bold"
                >
                    {completionStatus}
                </Typography>
            )}
            <Box>
                { task.status==="done" && hasAdminRole==="Admin"? <DelIcon onClick={() => delTask(task._id)} style={{ cursor: 'pointer' }} />:null}
                  {task.status!== "done" && hasAdminRole===undefined?  <DoneIcon onClick={() => moveTaskToNextList(task._id)} style={{ cursor: 'pointer' }} />:null}
            </Box>
        </TaskCard>
    );
};

export default TaskCardComponent;
