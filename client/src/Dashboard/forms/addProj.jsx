import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";

function Join(props) {
  const {userID, orgID, orgName} = props;
  // Initialize form state with empty values for the fields
  const [form, setForm] = useState({
    projectName: "",
    projectDesc: "",
    userID ,
    orgID,
    orgName
  });

  // Handle change in input fields
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const url = "http://localhost:5000/org/AddProj";

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on submit

    if (!form.projectName) {
      console.log("Enter Project Name");
      return;
    }

    console.log(form);

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include", // Ensure you're using the correct credentials
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form), // Send form data as JSON
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      // Reset form fields after successful submission
      setForm({ projectName: "", projectDesc: "" });
    } catch (error) {
      console.error("Fetch Error: ", error);
    }
  };

  return (
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
        Create Project
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Project Name"
          variant="outlined"
          name="projectName"
          value={form.projectName} // Bind value to the form state
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Project Description"
          variant="outlined"
          name="projectDesc"
          value={form.projectDesc} // Bind value to the form state
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add
        </Button>
      </form>
    </Box>
  );
}

export default Join;
