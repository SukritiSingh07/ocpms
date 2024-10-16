// Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import logo from "./pics/8f1QUYU.png";

const Navbar = () => {
  return (
    <AppBar position="fixed"> 
      <Toolbar>
        <img src={logo} alt="Logo" style={{ width: "5vh", height: "auto", borderRadius: "50%" }} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
