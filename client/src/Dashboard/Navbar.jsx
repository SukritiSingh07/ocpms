import React from 'react';
import { AppBar, IconButton, Toolbar, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Import a menu icon
import { styled } from '@mui/material/styles';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center', // Align items vertically in the center
});

const Navbar = (props) => {
  const { onToggle, selectedorg } = props;  // Destructure selectedOrg from props

  return (
    <AppBar position="fixed">
      <StyledToolbar>
        {/* Toggle Button */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onToggle}
        >
          <MenuIcon />
        </IconButton>

        {/* Left Side: Logo and Organization Name */}
        
          <img
            src="/assets/dashboardPics/8f1QUYU.png"
            alt="Logo"
            style={{
              width: '5vh',
              height: 'auto',
              borderRadius: '50%',
            }}
          />
          {selectedorg && (
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                marginLeft: '10px',  // Add space between the logo and the org name
              }}
            >
              {selectedorg.name}
            </Typography>
          )}
        </Box>

        {/* Right Side: You can add more elements here if needed */}
        <img
          src="/assets/dashboardPics/8f1QUYU.png"
          alt="Logo"
          style={{
            width: '5vh',
            height: 'auto',
            borderRadius: '50%',
          }}
        />
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
