import React, { useState } from 'react';
import { KanbanArea } from './KanbanStyles';
import { Grid } from '@mui/material';
import Todo from './Todo';
import Doing from './Doing';
import Done from './Done';

const MainKanban = () => {

    const initialTasks = [
        { id: 1, title: 'Task 1', description: 'Description for Task 1', assignedTo: 'Alice', timer: 120, list: 'todo' },
        { id: 2, title: 'Task 2', description: 'Description for Task 2', assignedTo: 'Bob', timer: 90, list: 'todo' },
        { id: 3, title: 'Task 3', description: 'Description for Task 3', assignedTo: 'Charlie', timer: 60, list: 'doing' },
        { id: 4, title: 'Task 4', description: 'Description for Task 4', assignedTo: 'Dave', timer: 0, list: 'done' }
    ];

    const [tasks, setTasks] = useState(initialTasks);

    const addTask = (newTask) => {
        setTasks(prevTasks => [...prevTasks, { ...newTask, id: prevTasks.length + 1, list: 'todo' }]);
    };

    const moveTaskToNextList = (taskId) => {
        setTasks(prevTasks => 
            prevTasks.map(task => 
                task.id === taskId
                    ? { ...task, list: task.list === 'todo' ? 'doing' : 'done' }
                    : task
            )
        );
    };

    const delTask = (taskId) => {
        setTasks(prevTasks => 
            prevTasks.filter(task => {
                return !(task.id === taskId && task.list === 'done');
            })
        );
    };
    

    const startTimer = (taskId) => {
        setTasks(prevTasks => 
            prevTasks.map(task => 
                task.id === taskId && task.list === 'doing' && task.timer > 0
                    ? { ...task, timer: task.timer - 1 }
                    : task
            )
        );
    };

    return (
        <KanbanArea>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                <Todo tasks={tasks.filter(task => task.list === 'todo')} moveTaskToNextList={moveTaskToNextList} addTask={addTask}/>
                </Grid>
                <Grid item xs={4}>
                <Doing tasks={tasks.filter(task => task.list === 'doing')} moveTaskToNextList={moveTaskToNextList} startTimer={startTimer} />
                </Grid>
                <Grid item xs={4}>
                <Done tasks={tasks.filter(task => task.list === 'done')} delTask={delTask} />
                </Grid>
            </Grid>
        </KanbanArea>
    );
};

export default MainKanban;
