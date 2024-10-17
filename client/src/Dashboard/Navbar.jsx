// Navbar.jsx
import React, { useState } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { StyledToolbar } from "./DashboardStyle";
import { ToggleButton } from "react-bootstrap";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const Navbar = (props) => {
  const { isRightSidebarOpen, toggleRightSidebar } = props;
  return (
    <AppBar position="fixed" >
      <StyledToolbar style={{display: 'flex', justifyContent: 'space-between'}}>
        <img src="/assets/dashboardPics/8f1QUYU.png" alt="Logo" style={{ width: "5vh", height: "auto", borderRadius: "50%" }} />
        <IconButton
          onClick={toggleRightSidebar}
          sx={{
            color: "white",
            backgroundColor: isRightSidebarOpen ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)", 
            borderRadius: "50%", 
            "&:hover": {
              backgroundColor: isRightSidebarOpen ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)", 
            }
          }}
        >
          <PeopleAltIcon />
        </IconButton>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
