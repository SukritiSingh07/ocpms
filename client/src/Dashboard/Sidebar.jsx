import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  IconButton,
  Modal
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';  // Import Add Icon

import AddProj from './forms/addProj';

function Sidebar(props) {
  const { user, projects, setProj, selectedorg, sProj } = props;
  // console.log(user);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
  { selectedorg && console.log(selectedorg.name); }
  const handleAddOpen = () => setIsAddModalOpen(true);
  const handleAddClose = () => setIsAddModalOpen(false);
  return (
    <Box
      sx={{
        width: 250,
        background: "#3a6ea5",
        height: "calc(100vh - 64px)",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",  // This ensures content is spaced properly
        overflowY: "auto", // Add scrolling for long content
      }}
    >
      <List>
        {projects && projects.length > 0 ? (
          projects.map((proj) => (
            <div key={proj._id}>
              <ListItemButton sx={{ pl: 4 }} onClick={() => setProj(proj)}>
                <ListItemText
                  primary={proj.projectName} // Project Name
                  secondary={(
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '0.775rem',  // Smaller font size for the project code
                        color: '#B7B7B7',  // Use gray color for secondary text
                        marginTop: 1,  // Add space between the project name and the project code
                      }}
                      onClick={() => handleCopyToClipboard(proj.projectID)}

                    >
                      {proj.projectID}  {/* Assuming project code is stored in proj.projectCode */}
                    </Typography>
                  )}
                />
                <ListItemIcon>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
              </ListItemButton>
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
