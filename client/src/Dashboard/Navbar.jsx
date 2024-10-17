import React, { useState } from "react";
import { AppBar } from "@mui/material";
import { StyledToolbar } from "./DashboardStyle";


const Navbar = () => {
  

  return (
    <AppBar position="fixed" >
      <StyledToolbar style={{display: 'flex', justifyContent: 'space-between'}}>
        <img src="/assets/dashboardPics/8f1QUYU.png" alt="Logo" style={{ width: "5vh", height: "auto", borderRadius: "50%" }} />
        
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
