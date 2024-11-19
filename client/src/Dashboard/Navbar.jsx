import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography, Box, Menu, MenuItem, Card, CardContent, Button, Tooltip, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Import a menu icon
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center', // Align items vertically in the center
});

const Navbar = (props) => {
  const { onToggle, selectedorg, user } = props;  // Destructure selectedOrg and user from props
  const [anchorEl, setAnchorEl] = useState(null);  // State to manage the menu anchor element

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
    
  const handleSignOut = async () => {
    
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include',  
      });
  
      if (!response.ok) {
        const errorData = await response.json();  
        throw new Error(errorData.message || `Logout failed with status: ${response.status}`);
      }
  
      const data = await response.json();  
      if (data.success) {
        navigate('/', { state: { message: "Successfully logged out" } });
      } else {
        alert(data.message || "Logout failed.");
      }
  
    } catch (error) {
      console.error('Logout error:', error);
      alert('An error occurred while logging out. Please try again later.');
    }
  };

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

  const handleCopyToClipboard = () => {
    if (selectedorg?.orgID) {
      navigator.clipboard.writeText(selectedorg.orgID)
        .then(() => {
          alert("Organization Code copied to clipboard!");
        })
        .catch((error) => {
          console.error("Failed to copy: ", error);
        });
    }
  };
  // console.log(user);
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
  {/* <img
    src="/assets/dashboardPics/8f1QUYU.png"
    alt="Logo"
    style={{
      width: '5vh',
      height: 'auto',
      borderRadius: '50%',
    }}
  /> */}
  {selectedorg && (
  <Avatar {...stringAvatar(selectedorg.name)} />
)}
  {selectedorg && (
    <Box>
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

      <Typography
        variant="body2"
        sx={{
          color: 'white',
          fontSize: '0.875rem',  
          marginLeft: '10px',  
          opacity: 0.8, 
          cursor: 'pointer'
        }}
        onClick={handleCopyToClipboard}
      >
        
        <Tooltip title="click to copy">
            <Typography variant="h8" sx={{ margin: '1rem', textAlign: 'center' }}>
              {selectedorg.orgID} 
            </Typography>
        </Tooltip>
      </Typography>
    </Box>
  )}
</Box>


        {/* Right Side: Profile Image */}
        <Box>
          {user && (
              <Avatar onClick={handleMenuClick} {...stringAvatar(user.username)} style={{
              cursor: 'pointer', 
            }}/>
          )}
          
          {/* Menu for Sign Out */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Card sx={{ minWidth: 200 }}>
              <CardContent>
                {/* Display Username */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  {user.username}
                </Typography>

                {/* Sign Out Button */}
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </Menu>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
