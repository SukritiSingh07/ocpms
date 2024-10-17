import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Box , IconButton, Toolbar, Typography} from "@mui/material";

function MiniNav(props) {
  const { isRightSidebarOpen, toggleRightSidebar } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box 
      sx={{ 
        backgroundColor: "#F8F9D7", 
        borderBottom: "1px solid #ddd",
        position: "fixed",  
        padding: 0,
        top: 64,  
        left: 255, 
        right: isRightSidebarOpen ? 255 : 0, 
        height: "8vh",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="basic tabs example"
          sx={{ display: "flex", justifyContent: "space-around" }}
          TabListProps={{
            sx: {
              display: "flex",
              width: "100%",
            }
          }}
        >
          <Tab label="To-Do" sx={{ flex: 1 }} />
          <Tab label="Analytics" sx={{ flex: 1 }} />
          <Tab label="Chat" sx={{ flex: 1 }} />
        </Tabs>
      </Box>
      <IconButton
          onClick={toggleRightSidebar}
          sx={{
            color: "black",
            
            
          }}
        >
          <PeopleAltIcon />
        </IconButton>
    </Box>
  );
}

export default MiniNav;
