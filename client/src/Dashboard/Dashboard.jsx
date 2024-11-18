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
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const user = location.state?.user.user;
  const [organisations, setOrganisations] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  // Set the first organization and its first project by default if available
  const [selectedorg, setSelectedOrg] = useState(() => {
    return organisations.length > 0 ? organisations[0] : null;
  });
  // console.log(selectedorg);

  const [projects, setProjects] = useState(() => {
    return selectedorg ? selectedorg.projects : [];
  });

  // console.log(projects);
  const [proj, setProj] = useState(() => {
    return projects.length > 0 ? projects[0] : null;
  });

  // Toggle right sidebar visibility
  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  // Handle tab changes
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  // Fetch organizations when user changes or initially
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
        // console.log(data);
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
    if (selectedorg) {
      setProjects(selectedorg.projects);
      // Set the first project if available
      if (selectedorg.projects.length > 0) {
        setProj(selectedorg.projects[0]);
      }
    } else {
      setProjects([]);
      setProj(null);
    }
  }, [selectedorg]);

  // Handle valid project in the updated projects
  useEffect(() => {
    if (proj && projects.length > 0) {
      const validProj = projects.find((p) => p._id === proj._id);
      if (!validProj) {
        setProj(null); // Reset proj if no longer valid
      }
    }
  }, [projects, proj]);

  // Toggle sidebar
  const onToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // console.log(selectedorg);
  // console.log(projects);
  console.log(proj);


  {proj && console.log(proj.projectName);}
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", position: "relative", overflowY: "auto", '&::-webkit-scrollbar': { display: 'none', }, '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }}>
      <Navbar onToggle={onToggle} selectedorg={selectedorg} user={user}/>
      <Box sx={{ display: 'flex', flexGrow: 1, marginTop: '64px', position: 'relative' }}>
        <motion.div
          initial={{ x: isSidebarOpen ? 0 : -250 }}
          animate={{ x: isSidebarOpen ? 0 : -250 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ position: 'absolute', zIndex: 10 }}
        >
          {isSidebarOpen && (
            <Switchbar
              user={user}
              organisations={organisations}
              setSelectedOrg={setSelectedOrg}
              setProjects={setProjects}
              setIsSidebarOpen={setIsSidebarOpen}
              setProj={setProj}
            />
          )}
        </motion.div>

        <Sidebar user={user} projects={projects} setProj={setProj} selectedorg={selectedorg} sProj={proj?proj:null} />

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
              {proj &&<MainKanban organisations={organisations} projectId={proj._id} selectedproj={proj} userId={user._id}/> }
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
              <Analytics />
            </TabPanel>
            <TabPanel value={selectedTab} index={2}>
              {proj && <MainChat projectId={proj._id} userId={user._id} userName={user.username} />}
            </TabPanel>
          </Box>
        </Box>

        {isRightSidebarOpen && <RightSidebar projects={proj} />}
      </Box>
    </Box>
  );
};

export default Dashboard;
  