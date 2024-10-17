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
          }}
        >
          <MiniNav toggleRightSidebar={toggleRightSidebar} isRightSidebarOpen={isRightSidebarOpen} />
          <MainKanban />
        </Box>
        {isRightSidebarOpen && <RightSidebar />}
      </Box>
    </Box>
  );
};

export default Dashboard;
