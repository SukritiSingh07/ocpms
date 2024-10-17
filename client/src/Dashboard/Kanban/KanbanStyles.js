import { Box, styled } from "@mui/material";

export const KanbanArea = styled(Box)(({ theme }) => ({
    height: "auto",
    width: "100%",
    zIndex: 1,
    padding: 10,
}));

export const TaskListArea = styled(Box)(({ theme }) => ({
    height: "auto",
    width: "100%",
    zIndex: 1,
    padding: 10,
    borderRadius: "10px",
}));

export const TaskCard = styled(Box)(({ theme }) => ({
    height: "auto",
    width: "100%",
    padding: 30,
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
    height: "auto",
    width: "100%",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: "10px",
    boxShadow: theme.shadows[2],
    transition: "transform 0.2s ease-in-out",
}));
