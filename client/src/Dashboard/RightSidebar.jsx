import React from "react";
import { Box, List, ListItem, ListItemText, Avatar, Typography } from "@mui/material";

const RightSidebar = ({ projects }) => {
  const members = projects?.member_id || []; 
  
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
        display: "flex",
        flexDirection: "column",
        overflowY: "auto", // Allow scrolling for long member lists
        padding: "8px",
      }}
    >
        <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "8px",
          mt: 1
        }}
      >
        Project Members
      </Typography>
      <Box>
        <List>
          {members.length > 0 ? (
            members.map((memberObj, index) => (
              <ListItem key={index}
               sx={{
                  borderBottom: "1px solid #ddd",
                  paddingY: "8px",
                  display: "flex",
                  alignItems: "center",
                }}>
                <Avatar {...stringAvatar(memberObj.member.username)} />
                <ListItemText
                  primary={memberObj.member.username} // Member name
                  secondary={memberObj.role}        // Member role
                  primaryTypographyProps={{ fontWeight: "bold", color: "#333" }}
                  secondaryTypographyProps={{ color: "#777" }}
                  sx={{ml:2}}
                />
              </ListItem>
            ))
          ) : (
            <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 150px)',
        textAlign: 'center',
        padding: '1rem',
      }}
    >
      <Typography variant="h6" gutterBottom>
        No members in this project!
      </Typography>
      <Typography variant="body2" gutterBottom>
        Invite your team members to collaborate.
      </Typography>
    </Box>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default RightSidebar;
