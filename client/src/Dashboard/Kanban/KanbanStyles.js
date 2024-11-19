import { Box, styled } from "@mui/material";

export const KanbanArea = styled(Box)(({ theme }) => ({
    width: "90vw",
    maxWidth: "1200px",
    // height: "80vh",
    // margin: "0 auto",
    padding: "20px",
    // paddingBottom: 0,
    // marginBottom: 0,
    display: "flex",
    justifyContent: "space-between",
    // gap: "20px",s
    background: "linear-gradient(135deg, #f0f4f8, #d9e8ff)",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
}));

export const TaskListArea = styled(Box)(({ theme }) => ({
    flex: "1 1 0",
    minWidth: "300px",
    padding: "20px",
    borderRadius: "12px",
    background: theme.palette.background.paper,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    overflowY: "auto",
    maxHeight: "73vh", // Limit height for a clean design
    "&::-webkit-scrollbar": {
        width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "10px",
    },
}));

export const TaskCard = styled(Box)(({ theme }) => ({
    width: "100%",
    padding: "15px",
    marginBottom: "15px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    },
}));

export const TaskCreateCard = styled(Box)(({ theme }) => ({
    width: "100%",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: "#eaf3ff",
    borderRadius: "12px",
    boxShadow: theme.shadows[3],
    border: `1px dashed ${theme.palette.primary.main}`,
    textAlign: "center",
    transition: "all 0.3s ease",
    "&:hover": {
        // backgroundColor: theme.palette.primary.light,
        // color: theme.palette.primary.contrastText,
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    },
}));
