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
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';

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
      <List>
        {projects && projects.length > 0 ? (
          projects.map((proj) => (
            <div key={proj._id}>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => {
                  toggleProject(proj._id); // Toggle project visibility
                  setProj(proj); // Pass the selected project
                }}
              >
                <ListItemText primary={proj.projectName} />
                <ListItemIcon>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
              </ListItemButton>

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
                  {proj.projectID}
                </Typography>
              </Collapse>
            </div>
          ))
        ) : (
          <Typography sx={{ color: "white", padding: "16px", textAlign: "center" }}>
            No projects found
          </Typography>
        )}
      </List>

      {/* Add Project Button at the bottom corner of the sidebar */}
      {selectedorg && user._id === selectedorg.orgAdmin && (
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
      )}
    </Box>
  );
}

export default Sidebar;
