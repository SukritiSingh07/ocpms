// RightSidebar.jsx
import React from "react";
import { Drawer, Box, List, ListItem, ListItemText } from "@mui/material";

const RightSidebar = () => {
  const menuItems = ["Settings", "Profile", "Help", "Logout"];

  return (
    <Drawer
      anchor="right"
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          height: "100vh",
          backgroundColor: "rgb(83, 144, 217)",
          borderLeft: "1px solid rgba(0,0,0,0.12)", // Optional: add a border for visual separation
        },
      }}
    >
      <Box role="presentation">
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default RightSidebar;
