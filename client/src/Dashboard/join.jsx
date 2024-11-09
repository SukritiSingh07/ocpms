import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";

function Join() {
  // State to store the input value
  const [orgCode, setOrgCode] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on submit
    if (orgCode) {
      console.log("Organization Code Submitted: ", orgCode);
      // You can handle the actual submission logic here
      // For example, make an API call to join the organization
    } else {
      console.log("Please enter an organization code");
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
          Join Organization
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Organization Code"
            variant="outlined"
            value={orgCode}
            onChange={(e) => setOrgCode(e.target.value)} 
          />
          <TextField
            fullWidth
            margin="normal"
            label="Project Code"
            variant="outlined"
            value={orgCode}
            onChange={(e) => setOrgCode(e.target.value)} 
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Join
          </Button>
        </form>
      </Box>
    </>
  );
}

export default Join;
