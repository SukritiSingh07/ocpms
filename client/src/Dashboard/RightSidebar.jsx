import React from "react";
import { Box, List, ListItem, ListItemText, Avatar } from "@mui/material";

const RightSidebar = () => {
  const members = ["Adarsh Verma", "Shantnu Biswas", "Harsh Khulwe", "Sukriti Singh"];
  
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <Box
      sx={{
        width: 250,
        height: "calc(100vh - 64px)",
        backgroundColor: "#c0c0c0",
        position: "fixed",
        right: 0,
      }}
    >
      <Box>
        <List>
          {members.map((member, index) => (
            <ListItem key={index}>
              <Avatar {...stringAvatar(member)} />
              <ListItemText primary={member} secondary="Admin" />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default RightSidebar;
