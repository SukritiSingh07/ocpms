import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Switchbar from "./Switchbar";
import RightSidebar from "./RightSidebar";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import MiniNav from "./MiniNav";
import MainKanban from "./Kanban/MainKanban";
import MainChat from "./Chat/MainChat";
import TabPanel from "./Tabpanel";
import { useLocation } from 'react-router-dom';
import Analytics from "./Analytics/Analytics";
import Sidebar from "./Sidebar";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// import { Button } from "react-bootstrap/lib/InputGroup";

const Dashboard = () => {
  const navigate = useNavigate();
  const [Tasks, setTasks]=useState({ todos: [], doings: [], dones: [] });
  const handleTask=(tasks)=>{
    setTasks(tasks);
  }
  
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
          navigate('/',{}); 
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
  // console.log(proj);


  const renderTabPanelContent = (tabIndex) => {
    if (!proj) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '81vh',
            width: '78vw',
            textAlign: 'center',
            padding: '2rem',
            position: 'absolute',
          }}
        >
          <Typography variant="h6" gutterBottom>
            No projects available!
          </Typography>
          <Typography variant="body2" gutterBottom>
            Start by creating or selecting a project from the sidebar.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsSidebarOpen(true)} // Encourage opening the sidebar
            sx={{ marginTop: '1rem' }}
          >
            Create a Project
          </Button>
        </Box>
      );
    }

    switch (tabIndex) {
      case 0:
        return <MainKanban organisations={organisations} projectId={proj._id} selectedproj={proj} userId={user._id} />;
      case 1:
        return <Analytics />;
      case 2:
        return <MainChat projectId={proj._id} userId={user._id} userName={user.username} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", position: "relative", overflowY: "auto", '&::-webkit-scrollbar': { display: 'none', }, '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }}>
      <Navbar onToggle={onToggle} selectedorg={selectedorg} user={user} />
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
              setSelectedOrg={(org) => {
                setSelectedOrg(org);
                setIsSidebarOpen(false); // Close the sidebar after selection
              }}
              setProjects={setProjects}
              setProj={setProj}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          )}
        </motion.div>

        <Sidebar user={user} projects={projects} setProj={setProj} selectedorg={selectedorg} sProj={proj ? proj : null} />

        <Box sx={{
          padding: 2,
          pb: 0,
          pt: 0,
          // top: "20px",
          position: "relative",
          right: isRightSidebarOpen ? 255 : 0,
          left: 250,
          // overflowY: "hidden",
        }}>
          <MiniNav toggleRightSidebar={toggleRightSidebar} isRightSidebarOpen={isRightSidebarOpen} onTabChange={handleTabChange} />
          <Box sx={{
            flexGrow: 1,
            padding: 2,
            marginRight: isRightSidebarOpen ? 63 : 30,
            marginTop: 5,
            transition: "margin-right 0.3s ease",
          }}>
            {[0, 1, 2].map((index) => (
              <TabPanel key={index} value={selectedTab} index={index}>
                {renderTabPanelContent(index)}
              </TabPanel>
            ))}
          </Box>
        </Box>

        {isRightSidebarOpen && <RightSidebar projects={proj} />}
      </Box>
    </Box>
  );
};

export default Dashboard;