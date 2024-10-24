import { Box, styled } from "@mui/material";

export const KanbanArea = styled(Box)(({ theme }) => ({
    height: "auto",
    width: "80vw",
    maxWidth: "1500px",  
    margin: "0 auto",    
    zIndex: 1,
    padding: 10,
    display: "flex",     
    gap: 20,             
}));

export const TaskListArea = styled(Box)(({ theme }) => ({
    height: "auto",
    flex: "3 2 3px",     
    minWidth: "400px",   
    maxWidth: "50%",   
    padding: 20,
    borderRadius: "10px",
    overflowY: "auto",  
}));

export const TaskCard = styled(Box)(({ theme }) => ({
    width: "100%",
    padding: 20,
    marginBottom: 10,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    transition: "transform 0.2s ease-in-out",
    '&:hover': {
        transform: "scale(1.02)",
        boxShadow: theme.shadows[4],
    }
}));

export const TaskCreateCard = styled(Box)(({ theme }) => ({
    width: "100%",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    transition: "transform 0.2s ease-in-out",
}));
