// Dashboard.jsx
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import { Box } from "@mui/material";
import MainKanban from "./Kanban/MainKanban";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <Box
        sx={{
          marginLeft: 250,  
          marginRight: 250, 
          marginTop: "64px",
          padding: 2,
          flexGrow: 1,
        }}
      >
      <MainKanban />
        <h1>Dashboard Content</h1>
      </Box>
      <RightSidebar />
      
    </Box>
  );
};

export default Dashboard;
