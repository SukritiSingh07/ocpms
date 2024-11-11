import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import { Box } from "@mui/material";
import MiniNav from "./MiniNav";
import MainKanban from "./Kanban/MainKanban";
import MainChat from "./Chat/MainChat";
import TabPanel from "./Tabpanel";
import { useLocation } from 'react-router-dom';
import Analytics from "./Analytics/Analytics";

const Dashboard = () => {
  const location = useLocation();
  const user = location.state?.user.user;
  console.log(user);

  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", position: "relative", overflowY: "auto", '&::-webkit-scrollbar': { display: 'none', }, '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }} >
      <Navbar />
      <Box sx={{ display: "flex", flexGrow: 1, marginTop: "64px", position: "relative" }}>
        <Sidebar user={user}/>

        <Box
          sx={{
            padding: 2,
            position: "relative",
            right: isRightSidebarOpen ? 255 : 0,
            left: 250,
          }}
        >
          <MiniNav
            toggleRightSidebar={toggleRightSidebar}
            isRightSidebarOpen={isRightSidebarOpen}
            onTabChange={handleTabChange}
          />
          <Box sx={{ 
          flexGrow: 1, 
          padding: 2, 
          marginRight: isRightSidebarOpen ? 63 : 30, 
          marginTop: 3,
          transition: "margin-right 0.3s ease",
        }}>
        <TabPanel value={selectedTab} index={0}>
              <MainKanban /> 
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
              <Analytics />
            </TabPanel>
            <TabPanel value={selectedTab} index={2}>
              <MainChat projectId={user._id} userId={user._id} userName={user.username}/>
            </TabPanel>
      </Box>
        </Box>
        {isRightSidebarOpen && <RightSidebar />}
      </Box>
    </Box>
  );
};

export default Dashboard;
