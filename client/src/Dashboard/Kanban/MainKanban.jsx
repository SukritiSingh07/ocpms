import React from 'react';
import { KanbanArea } from './KanbanStyles';
import { Grid } from '@mui/material';
import Todo from './Todo';
import Doing from './Doing';
import Done from './Done';

const MainKanban = () => {
    return (
        <KanbanArea>
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
        </KanbanArea>
    );
};

export default MainKanban;
