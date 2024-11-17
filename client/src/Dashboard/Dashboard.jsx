import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Switchbar from "./Switchbar";
import RightSidebar from "./RightSidebar";
import { Box } from "@mui/material";
import MiniNav from "./MiniNav";
import MainKanban from "./Kanban/MainKanban";
import MainChat from "./Chat/MainChat";
import TabPanel from "./Tabpanel";
import { useLocation } from 'react-router-dom';
import Analytics from "./Analytics/Analytics";
import Sidebar from "./Sidebar";
import { motion } from 'framer-motion';

const Dashboard = () => {
  const location = useLocation();
  const user = location.state?.user.user;
  const [organisations, setOrganisations] = useState([]);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Retrieve selected organization from localStorage
  const [selectedorg, setSelectedOrg] = useState(() => {
    const savedOrg = localStorage.getItem("selectedOrg");
    return savedOrg ? JSON.parse(savedOrg) : null;
  });

  // Retrieve projects based on the selected organization
  const [projects, setProjects] = useState(() => {
    if (selectedorg && selectedorg.projects) {
      return selectedorg.projects; // Set projects if selectedorg is valid
    }
    return []; // Return empty array if no organization is selected
  });

  // Retrieve selected project from localStorage
  const [proj, setProj] = useState(() => {
    const savedProj = localStorage.getItem("selectedProj");
    return savedProj ? JSON.parse(savedProj) : null;
  });

  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  // Fetch organisations when user changes or initially
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
        setOrganisations(data.organisations);
      } catch (error) {
        console.error("Error fetching user organizations:", error);
      }
    };

    if (user._id) {
      fetchOrganisations();
    }
  }, [user._id]);

  // Update projects whenever selectedorg changes
  useEffect(() => {
    if (selectedorg && selectedorg.projects) {
      setProjects(selectedorg.projects); // Update projects when selectedorg changes
    } else {
      setProjects([]); // Reset projects if no organisation is selected
    }
  }, [selectedorg]);

  // When projects are updated, check if proj is valid
  useEffect(() => {
    if (proj && projects.length > 0) {
      const validProj = projects.find((p) => p._id === proj._id);
      if (!validProj) {
        setProj(null); // Reset proj if no longer valid in the current projects
      }
    }
  }, [projects, proj]);

  // Save selectedorg and proj to localStorage whenever they change
  useEffect(() => {
    if (selectedorg) {
      localStorage.setItem("selectedOrg", JSON.stringify(selectedorg));
    }
  }, [selectedorg]);

  useEffect(() => {
    if (proj) {
      localStorage.setItem("selectedProj", JSON.stringify(proj));
    }
  }, [proj]);

  const onToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", position: "relative", overflowY: "auto", '&::-webkit-scrollbar': { display: 'none', }, '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }} >
      <Navbar onToggle={onToggle} selectedorg={selectedorg} />
      <Box sx={{ display: 'flex', flexGrow: 1, marginTop: '64px', position: 'relative' }}>
        <motion.div
          initial={{ x: isSidebarOpen ? 0 : -250 }}
          animate={{ x: isSidebarOpen ? 0 : -250 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ position: 'absolute', zIndex: 10 }}
        >
          {isSidebarOpen && (
            <Switchbar user={user} organisations={organisations} setSelectedOrg={setSelectedOrg} setProjects={setProjects} setIsSidebarOpen={setIsSidebarOpen} />
          )}
        </motion.div>
        <Sidebar user={user} projects={projects} setProj={setProj} selectedorg={selectedorg} />
        
        <Box sx={{
          padding: 2,
          position: "relative",
          right: isRightSidebarOpen ? 255 : 0,
          left: 250,
        }}>
          <MiniNav toggleRightSidebar={toggleRightSidebar} isRightSidebarOpen={isRightSidebarOpen} onTabChange={handleTabChange} />
          <Box sx={{
            flexGrow: 1,
            padding: 2,
            marginRight: isRightSidebarOpen ? 63 : 30,
            marginTop: 3,
            transition: "margin-right 0.3s ease",
          }}>
            <TabPanel value={selectedTab} index={0}>
              <MainKanban organisations={organisations} kanbanId={proj.kanban_id}/>
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
              <Analytics />
            </TabPanel>
            <TabPanel value={selectedTab} index={2}>
              <MainChat projectId={proj._id} userId={user._id} userName={user.username} />
            </TabPanel>
          </Box>
        </Box>
        {isRightSidebarOpen && <RightSidebar projects={proj} />}
      </Box>
    </Box>
  );
};

export default Dashboard;
