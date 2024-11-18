import React, { useState } from 'react';
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

import Join from './forms/join';
import Create from './forms/create';

const Switchbar = (props) => {
  const [open, setOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const organisations = props.organisations;
  const setSelectedOrg = props.setSelectedOrg;
  const setProjects = props.setProjects;
  const setIsSidebarOpen = props.setIsSidebarOpen;
  const setProj=props.setProj;

  const user = props.user;
  
  // Handle organization toggle
  const handleToggle = (orgId) => {
    setOpen(open === orgId ? null : orgId);
  };

  // Handle Join modal
  const handleJoinOpen = () => setIsJoinModalOpen(true);
  const handleJoinClose = () => setIsJoinModalOpen(false);

  // Handle Create modal
  const handleCreateOpen = () => setIsCreateModalOpen(true);
  const handleCreateClose = () => setIsCreateModalOpen(false);

  // Handle selecting an organization and its projects
  const handleSelectOrganization = (org) => {
    setSelectedOrg(org);
    setProjects(org.projects);
    setProj([]);
    setIsSidebarOpen(false);
  };

  return (
    <Box sx={{ width: 250, background: '#C6E7FF', height: 'calc(100vh - 64px)', position: 'fixed', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <List>
        {/* Loop through organisations and display them */}
        {organisations.length > 0 ? (
          organisations.map((org) => (
            <div key={org._id}>
              {/* Organization name */}
              <ListItemButton onClick={() => handleSelectOrganization(org)}>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary={org.name} />
                {open === org._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemButton>
            </div>
          ))
        ) : (
          <Typography variant="body2" color="white">No organizations found</Typography>
        )}
      </List>

      <Box style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Button onClick={handleJoinOpen} style={{ color: 'black' }}>Join</Button>
        <Button onClick={handleCreateOpen} style={{ color: 'black' }}>Create</Button>
      </Box>

      {/* Join Modal */}
      <Modal open={isJoinModalOpen} onClose={handleJoinClose}>
        <Join user={props.user} handleCreateClose={handleCreateClose} />
      </Modal>

      {/* Create Modal */}
      <Modal open={isCreateModalOpen} onClose={handleCreateClose}>
        <Create user={props.user} handleCreateClose={handleCreateClose} />
      </Modal>
    </Box>
  );
};

export default Switchbar;
