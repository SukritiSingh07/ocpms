import React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  IconButton,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';  // Import Add Icon

function Sidebar(props) {
  const { projects, setProj, onAddProject, selectedorg } = props;  // Destructure props, including onAddProject callback

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
                <ListItemText primary={proj.projectName} />
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
          onClick={onAddProject}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Sidebar;
