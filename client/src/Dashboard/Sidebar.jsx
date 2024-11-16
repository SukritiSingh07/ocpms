import React, { useEffect, useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  Button,
  Modal,
  Typography,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Join from './join';
import Create from './create';

const Sidebar = (props) => {
  const [open, setOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const user = props.user;
  
  const handleToggle = (orgId) => {
    setOpen(open === orgId ? null : orgId); // Toggle the organization view
  };

  const handleJoinOpen = () => setIsJoinModalOpen(true);
  const handleJoinClose = () => setIsJoinModalOpen(false);

  const handleCreateOpen = () => setIsCreateModalOpen(true);
  const handleCreateClose = () => setIsCreateModalOpen(false);

  return (
    <Box sx={{ width: 250, background: '#3a6ea5', height: "calc(100vh - 64px)", position: 'fixed', display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <List>
        {/* Loop through organisations and display them */}
        {organisations.length > 0 ? (
          organisations.map((org) => (
            <div key={org._id}>
              {/* Organization name */}
              <ListItemButton onClick={() => handleToggle(org._id)}>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary={org.name} />
                {open === org._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemButton>

              {/* Collapse to show projects for each organization */}
              <Collapse in={open === org._id} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {org.projects && org.projects.length > 0 ? (
                    org.projects.map((project) => (
                      <ListItemButton key={project._id} sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <ArrowForwardIosIcon />
                        </ListItemIcon>
                        <ListItemText primary={project.projectName} />
                      </ListItemButton>
                    ))
                  ) : (
                    <ListItemText sx={{ pl: 4 }} primary="No projects available" />
                  )}
                </List>
              </Collapse>
            </div>
          ))
        ) : (
          <Typography variant="body2" color="white">No organizations found</Typography>
        )}
      </List>

      <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button onClick={handleJoinOpen} style={{ color: "black" }}>Join</Button>
        <Button onClick={handleCreateOpen} style={{ color: "black" }}>Create</Button>
      </Box>

      {/* Join Modal */}
      <Modal open={isJoinModalOpen} onClose={handleJoinClose}>
        <Join user={props.user} />
      </Modal>

      {/* Create Modal */}
      <Modal open={isCreateModalOpen} onClose={handleCreateClose}>
        <Create user={props.user} />
      </Modal>
    </Box>
  );
};

export default Sidebar;
