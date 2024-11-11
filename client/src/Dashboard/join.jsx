import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";

function Join(props) {
  // State to store the input value
  const user = props.user;
  const [form, setForm] = useState({ user: user });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const url = 'http://localhost:5000/org/joinorg';
  // Handle form submission
  const handleSubmit = async (e) => { // Add async here
    e.preventDefault(); // Prevent page reload on submit
  
    if (!form.orgCode || !form.projCode) {
      console.log("Enter both organisation and project codes");
      return;
    }
  
    console.log(form);
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
  
      setForm({ orgName: "", projectName: "", projDesc: "" });
    } catch (error) { // Corrected typo from 'cathc' to 'catch'
      console.error('Fetch Error: ', error);
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
              name="orgCode"
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Project Code"
              variant="outlined"
              name="projCode"
              onChange={handleChange}
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
