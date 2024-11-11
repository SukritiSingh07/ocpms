  import React, { useEffect, useState } from "react";
  import { Box, TextField, Typography, Button } from "@mui/material";

  function Create(props) {
    const [isOrgCreated, setIsOrgCreated] = useState(false);
    const user=props.user;
    const [form, setForm] = useState({user: user});
    // console.log(user);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setForm({
        ...form,
        [name]: value,
      });
    };
    
    const url = 'http://localhost:5000/org/createorg';

    // Handle form submission for both organization and project together
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!form.orgName || !form.projectName) {
        console.log("Please enter both organization and project names.");
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
          body: JSON.stringify(form), // Submit both orgName and projectName together
        });

        if (!response.ok) { 
          throw new Error(`HTTP error! Status: ${response.status}`); 
        }

        const data = await response.json();
        console.log("Organization and project created:", data);

        // Reset form after successful submission
        setForm({ orgName: "", projectName: "" , projDesc:""});
        setIsOrgCreated(false);

      } catch (error) {
        console.error("Fetch error:", error.message);
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
            <form onSubmit={(e) => { e.preventDefault(); setIsOrgCreated(true); }}>
              <TextField
                fullWidth
                margin="normal"
                label="Organization Name"
                variant="outlined"
                name="orgName"
                value={form.orgName}
                onChange={handleInputChange}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Next
              </Button>
            </form>
          ) : (
            // Project Form
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Project Name"
                variant="outlined"
                name="projectName"
                value={form.projectName}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Description"
                variant="outlined"
                name="ProjDesc"
                value={form.projDesc}
                onChange={handleInputChange}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </form>
          )}
        </Box>
      </>
    );
  }

  export default Create;
