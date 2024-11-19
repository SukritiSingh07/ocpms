import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  IconButton,
  Modal,
  Collapse,
  Tooltip,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';

import AddProj from './forms/addProj';

function Sidebar(props) {
  const { user, projects, setProj, selectedorg, sProj } = props;
  // console.log(user);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [expandedProjectID, setExpandedProjectID] = useState(null); // Track expanded project

  const handleCopyToClipboard = (projectID) => {
    if (projectID) {
      navigator.clipboard.writeText(projectID)
        .then(() => {
          alert("Project Code copied to clipboard!");
        })
        .catch((error) => {
          console.error("Failed to copy: ", error);
        });
    }
  };

  const handleAddOpen = () => setIsAddModalOpen(true);
  const handleAddClose = () => setIsAddModalOpen(false);

  const toggleProject = (projectID) => {
    setExpandedProjectID((prev) => (prev === projectID ? null : projectID)); // Toggle project expansion
  };

  return (
    <Box
      sx={{
        width: 250,
        background: "#3a6ea5",
        height: "calc(100vh - 64px)",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowY: "auto",
      }}
    >
          <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1,mt:1 }}>
        Projects
      </Typography>
      <List>
        {projects && projects.length > 0 ? (
          projects.map((proj) => (
            <div key={proj._id}>
              <ListItemButton
                 sx={{
                  backgroundColor: '#EAF4FF',
                  borderRadius: 2,
                  '&:hover': { backgroundColor: '#D5E9FF' },
                  margin: 1,
                  display: 'grid',
                }}
                onClick={() => {
                  toggleProject(proj._id); // Toggle project visibility
                  setProj(proj); // Pass the selected project
                }}
              >
              <Box sx={{display: 'flex', alignItems:'center'}}>
                <ListItemIcon>
                  <FolderIcon sx={{ color: '#3a6ea5' }} />
                </ListItemIcon>
                <ListItemText primary={proj.projectName} />
              </Box>
                {/* <ListItemIcon>
                  <ArrowForwardIosIcon />
                </ListItemIcon> */}
                 {/* Conditionally show projID */}
              <Collapse in={expandedProjectID === proj._id}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.775rem',
                    color: '#B7B7B7',
                    marginLeft: '4vh', 
                    cursor: 'pointer',
                  }}
                  onClick={() => handleCopyToClipboard(proj.projectID)}
                >
                  
                  <Tooltip title="click to copy">
                  <Typography variant="h8" sx={{ margin: '1rem', textAlign: 'center' }}>
                    {proj.projectID}
                  </Typography>
                </Tooltip>
                </Typography>
              </Collapse>
              </ListItemButton>

             
            </div>
          ))
        ) : (
          <>
          <Tooltip title="You can manage your projects here.">
  <Typography variant="h6" sx={{ margin: '1rem', textAlign: 'center' }}>
    Looking for your project? Start by joining or creating an organization.
  </Typography>
</Tooltip>
    <Box sx={{height:'100%'}}>
    </Box></>
        )}
      </List>

      {/* Add Project Button at the bottom corner of the sidebar */}
      {selectedorg && user._id === selectedorg.orgAdmin ? (
        <Box sx={{ marginTop: 'auto', padding: '16px', display: 'flex', justifyContent: 'center' }}>
          <IconButton
            sx={{
              backgroundColor: "#024CAA",
              color: "white",
              borderRadius: "50%",
              padding: "8px",
              '&:hover': {
                backgroundColor: "#7AB2D3",
              }
            }}
            onClick={handleAddOpen}
          >
            <AddIcon />
          </IconButton>
          <Modal open={isAddModalOpen} onClose={handleAddClose}>
            <AddProj
              userID={user._id}
              handleAddClose={handleAddClose}
              orgID={selectedorg._id}
              orgName={selectedorg.name}
            />
          </Modal>
        </Box>
      ):(
        <Box sx={{height: '100%'}}></Box>
      )}
    </Box>
  );
}

export default Sidebar;
