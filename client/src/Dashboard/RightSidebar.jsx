import React from "react";
import { Box, List, ListItem, ListItemText, Avatar } from "@mui/material";

const RightSidebar = ({ project }) => {
  const members = project?.member_id || []; // Get members from the selected project

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name) {
    const nameParts = name ? name.split(" ") : [];
    const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";  
    const lastNameInitial = nameParts[1] ? nameParts[1][0] : "";   

    return {
      sx: {
        bgcolor: stringToColor(name),
        marginRight: "4px",
      },
      children: `${firstNameInitial}${lastNameInitial}`, 
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
          {members.length > 0 ? (
            members.map((memberObj, index) => (
              <ListItem key={index}>
                <Avatar {...stringAvatar(memberObj.member.username)} />
                <ListItemText
                  primary={memberObj.member.username} // Member name
                  secondary={memberObj.role}        // Member role
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No members in this project" />
            </ListItem>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default RightSidebar;
