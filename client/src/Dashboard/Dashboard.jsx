import React, { useEffect, useState } from "react";
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
  const [organisations, setOrganisations] = useState([]); 
  console.log(user);


  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

    useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        const response = await fetch(`http://localhost:5000/dashboard/${user._id}`, {
          method: 'GET', 
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Fetched data:", data); 
        setOrganisations(data.organisations); 
      } catch (error) {
        console.error("Error fetching user organizations:", error);
      }
    };
  
    if (user._id) {
      fetchOrganisations();
    }
  }, [user._id]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", position: "relative", overflowY: "auto", '&::-webkit-scrollbar': { display: 'none', }, '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }} >
      <Navbar />
      <Box sx={{ display: "flex", flexGrow: 1, marginTop: "64px", position: "relative" }}>
        <Sidebar user={user} organisations={organisations}/>

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
        {isRightSidebarOpen && <RightSidebar organisations={organisations}/>}
      </Box>
    </Box>
  );
};

export default Dashboard;
