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
  TextField
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Join from './join';
import Create from './create';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleJoinOpen = () => setIsJoinModalOpen(true);
  const handleJoinClose = () => setIsJoinModalOpen(false);

  const handleCreateOpen = () => setIsCreateModalOpen(true);
  const handleCreateClose = () => setIsCreateModalOpen(false);

  return (
    <Box sx={{ width: 250, background: '#3a6ea5', height: "calc(100vh - 64px)", position: 'fixed', display:"flex", flexDirection: "column", justifyContent: "space-between" }}>
      <List>
        <ListItemButton onClick={handleToggle}>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Organization" />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ArrowForwardIosIcon />
              </ListItemIcon>
              <ListItemText primary="Project 1" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ArrowForwardIosIcon />
              </ListItemIcon>
              <ListItemText primary="Project 2" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ArrowForwardIosIcon />
              </ListItemIcon>
              <ListItemText primary="Project 3" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button onClick={handleJoinOpen} style={{ color: "black" }}>Join</Button>
        <Button onClick={handleCreateOpen} style={{ color: "black" }}>Create</Button>
      </Box>

      {/* Join Modal */}
      <Modal open={isJoinModalOpen} onClose={handleJoinClose}>
        <Join />
      </Modal>

      {/* Create Modal */}
      <Modal open={isCreateModalOpen} onClose={handleCreateClose}>
        <Create />
      </Modal>
    </Box>
  );
};

export default Sidebar;
