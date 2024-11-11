import React, { useState, useEffect } from 'react';
import { KanbanArea } from './KanbanStyles';
import { Grid } from '@mui/material';
import Todo from './Todo';
import Doing from './Doing';
import Done from './Done';

const MainKanban = () => {
    const [tasks, setTasks] = useState({ todos: [], doings: [], dones: [] });

    // Fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/dashboard/kanban');
            const data = await response.json();
            // console.log(data);
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTask = async (newTask) => {
        try {
            const taskWithStatus = {
                ...newTask,
                status: "todo", // Explicitly set status for new tasks
            };
            const response = await fetch('http://localhost:5000/dashboard/kanban/todo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskWithStatus),
            });
            const createdTask = await response.json();
            setTasks((prevTasks) => ({
                ...prevTasks,
                todos: [...prevTasks.todos, createdTask],
            }));
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };
    

    const moveTaskToNextList = async (taskId) => {
        try {
            let task, currentList;
            
            for (let listName of ['todos', 'doings', 'dones']) {
                task = tasks[listName].find((t) => t._id === taskId);
                if (task) {
                    currentList = listName;
                    break;
                }
            }
    
            if (!task) {
                console.error("Task not found");
                return;
            }
    
            const nextList = currentList === 'todos' ? 'doings' : currentList === 'doings' ? 'dones' : null;
            if (!nextList) {
                console.error("Task is already in the final list");
                return;
            }
    
            const updatedTask = {
                ...task,
                status: nextList,
                timerEnd: task.timerEnd,  // Make sure this field is preserved
            };
    
            const endpoint = nextList === 'doings'
                ? `http://localhost:5000/dashboard/kanban/move-to-doing/${taskId}`
                : `http://localhost:5000/dashboard/kanban/move-to-done/${taskId}`;
    
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask),
            });
    
            if (response.ok) {
                const updatedTaskData = await response.json();
                // Update the frontend state with the latest task data
                setTasks((prevTasks) => {
                    const updatedCurrentList = prevTasks[currentList].filter((t) => t._id !== taskId);
                    const updatedNextList = [...prevTasks[nextList], updatedTaskData];
                    
                    return {
                        todos: [...prevTasks.todos],
                        doings: [...prevTasks.doings],
                        dones: [...prevTasks.dones],
                        [currentList]: updatedCurrentList,
                        [nextList]: updatedNextList,
                    };
                });
                await fetchTasks();
            } else {
                console.error("Failed to update task on server");
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };
    
    
    
    
    
    const delTask = async (taskId) => {
        try {
            await fetch(`http://localhost:5000/dashboard/kanban/done/${taskId}`, { method: 'DELETE' });
    
            setTasks(prevTasks => ({
                ...prevTasks,
                todos: prevTasks.todos.filter(task => task._id !== taskId),
                doings: prevTasks.doings.filter(task => task._id !== taskId),
                dones: prevTasks.dones.filter(task => task._id !== taskId)
            }));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };
    
    
    return (
        <KanbanArea>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Todo tasks={tasks.todos}  moveTaskToNextList={moveTaskToNextList} addTask={addTask} />
                </Grid>
                <Grid item xs={4}>
                    <Doing tasks={tasks.doings} moveTaskToNextList={moveTaskToNextList} />
                </Grid>
                <Grid item xs={4}>
                    <Done tasks={tasks.dones} delTask={delTask} />
                </Grid>
            </Grid>
        </KanbanArea>
    );
};

export default MainKanban;
