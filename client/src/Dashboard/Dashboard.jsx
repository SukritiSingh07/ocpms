// Dashboard.jsx
import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import { Box } from "@mui/material";
import MiniNav from "./MiniNav";


const Dashboard = () => {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar toggleRightSidebar={toggleRightSidebar}/>
      <Sidebar />
      {isRightSidebarOpen && <RightSidebar />}
     
      <Box
        sx={{
          marginLeft: 250,  
          marginRight: 250, 
          marginTop: "64px",
          padding: 2,
          flexGrow: 1,
        }}
      >
         <MiniNav  />
        <h1>Dashboard Content</h1>
      </Box>
    </Box>
  );
};

export default Dashboard;
