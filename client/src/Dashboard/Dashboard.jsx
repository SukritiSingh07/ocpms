// Dashboard.jsx
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import { Box } from "@mui/material";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      {/* <RightSidebar /> */}
      <Box
        sx={{
          marginLeft: 250,  // Space for the left sidebar
          marginRight: 250, // Space for the right sidebar
          marginTop: "64px", // Adjust this to the height of your navbar
          padding: 2,
          flexGrow: 1,
        }}
      >
        <h1>Dashboard Content</h1>
      </Box>
    </Box>
  );
};

export default Dashboard;
