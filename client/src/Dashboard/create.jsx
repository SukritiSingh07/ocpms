import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";

function Create() {
  // State to store the organization name
  const [orgName, setOrgName] = useState("");
  const [projectName, setProjectName] = useState(""); // State for project name
  const [isOrgCreated, setIsOrgCreated] = useState(false); // Flag to track if the org is created

  // Handle organization creation form submission
  const handleOrgSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on submit
    if (orgName) {
      console.log("Organization Created: ", orgName);
      setIsOrgCreated(true); // Set the flag to true once organization is created
    } else {
      console.log("Please enter an organization name");
    }
  };

  // Handle project creation form submission
  const handleProjectSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on submit
    if (projectName) {
      console.log("Project Created: ", projectName);
      // You can handle the actual project creation logic here
      // For example, make an API call to create the project
    } else {
      console.log("Please enter a project name");
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          {isOrgCreated ? "Create Project" : "Create Organization"}
        </Typography>

        {/* Organization Form */}
        {!isOrgCreated ? (
          <form onSubmit={handleOrgSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Organization Name"
              variant="outlined"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)} // Update state on input change
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Organization
            </Button>
          </form>
        ) : (
          // Project Form
          <form onSubmit={handleProjectSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Project Name"
              variant="outlined"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)} 
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Project
            </Button>
          </form>
        )}
      </Box>
    </>
  );
}

export default Create;
