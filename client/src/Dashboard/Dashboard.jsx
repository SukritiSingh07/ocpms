// Dashboard.jsx
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import { Box } from "@mui/material";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <RightSidebar />
      <Box
        sx={{
          marginLeft: 250,  
          marginRight: 250, 
          marginTop: "64px",
          padding: 2,
          flexGrow: 1,
        }}
      >
        <h1>Dashboard Content</h1>
      </Box>
    </Box>
  );
};

export default Dashboard;
