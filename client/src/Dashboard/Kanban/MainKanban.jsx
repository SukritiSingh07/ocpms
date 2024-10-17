import React from 'react';
import { Grid } from '@mui/material';
import Todo from './Todo';
import Doing from './Doing';
import Done from './Done';
import CreateTask from './CreateTask';

const MainKanban = () => {
    return (
        <div>
            <CreateTask />
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Todo />
                </Grid>
                <Grid item xs={4}>
                    <Doing />
                </Grid>
                <Grid item xs={4}>
                    <Done />
                </Grid>
            </Grid>
        </div>
    );
};

export default MainKanban;
