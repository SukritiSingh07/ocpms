import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import { Box } from "@mui/material";
import MiniNav from "./MiniNav";
import MainKanban from "./Kanban/MainKanban";

const Dashboard = () => {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", position: "relative" }}>
      <Navbar />
      <Box sx={{ display: "flex", flexGrow: 1, marginTop: "64px", position:"relative" }}> 
        <Sidebar />
        
        <Box
          sx={{
            padding: 2,
            position: "relative",
            right: isRightSidebarOpen?255:0,
            left: 250,
          }}
        >
          <MiniNav toggleRightSidebar={toggleRightSidebar} isRightSidebarOpen={isRightSidebarOpen} />
          <Box sx={{ 
          flexGrow: 1, 
          padding: 2, 
          marginRight: isRightSidebarOpen ? 63 : 30, 
          marginTop: 3,
          transition: "margin-right 0.3s ease",
        }}>
        <MainKanban />
      </Box>
        </Box>
        {isRightSidebarOpen && <RightSidebar />}
      </Box>
    </Box>
  );
};

export default Dashboard;
