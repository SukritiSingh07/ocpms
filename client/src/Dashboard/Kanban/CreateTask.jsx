import React, { useState } from 'react';
import { TaskCreateCard } from './KanbanStyles';
import { Typography, TextField, Button, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const CreateTask = ({ addTask, organisations, selectedproj }) => {
    const [taskDetails, setTaskDetails] = useState({
        title: '',
        description: '',
        assignedTo: '',
        assignedId: '',
        timer: ''
    });
    const members = selectedproj?.member_id || [];  
    console.log(members);

    // Extract members from organisations
    // if (organisations && organisations.length > 0) {
    //     organisations.forEach((organisation) => {
    //         if (organisation.projects && organisation.projects.length > 0) {
    //             organisation.projects.forEach((project) => {
    //                 if (project.member_id && && project.member_id.length > 0) {
    //                     project.member_id.forEach((memberObj) => {
    //                         members.push({
    //                             username: memberObj.member.username, 
    //                             role: memberObj.role,    
    //                             memberId:  memberObj.member._id,             
    //                         });
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails({ ...taskDetails, [name]: value });
    };

    const handleSelectChange = (event) => {
        const selectedMember = members.find(member => member.member._id === event.target.value);
        setTaskDetails({ 
            ...taskDetails, 
            assignedTo: selectedMember.member.username,
            assignedId: selectedMember.member._id 
        });
    };

    const handleAddTask = () => {
        if (taskDetails.title && taskDetails.description && taskDetails.assignedTo && taskDetails.timer) {
            addTask(taskDetails); 
            setTaskDetails({ title: '', description: '', assignedTo: '', assignedId: '', timer: '' }); 
        } else {
            console.log("Please fill all fields!");
        }
    };

    return (
        <TaskCreateCard>
            <Typography variant="h6" gutterBottom>
                Create New Task
            </Typography>
            <TextField
                label="Task Title"
                variant="outlined"
                name="title"
                value={taskDetails.title}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                variant="outlined"
                name="description"
                value={taskDetails.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={3}
                margin="normal"
            />
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="member-select-label">Assign To</InputLabel>
                    <Select
                        labelId="member-select-label"
                        id="member-select"
                        value={taskDetails.assignedId}
                        label="Assign To"
                        onChange={handleSelectChange}
                        name="assignedTo"
                    >
                        {members.map((member) => (
                            <MenuItem key={member.member._id} value={member.member._id}>
                                {member.member.username}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <TextField
                label="Timer (minutes)"
                variant="outlined"
                name="timer"
                type="number"
                value={taskDetails.timer}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <Box mt={3}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddTask}
                    fullWidth
                >
                    Add Task
                </Button>
            </Box>
        </TaskCreateCard>
    );
};

export default CreateTask;
