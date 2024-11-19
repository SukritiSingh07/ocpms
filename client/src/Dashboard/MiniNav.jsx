import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Box , IconButton, Toolbar, Typography} from "@mui/material";

function MiniNav(props) {
  const { isRightSidebarOpen, toggleRightSidebar, onTabChange } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onTabChange(newValue);
  };

  return (
    <Box 
      sx={{ 
        backgroundColor: "#ebebeb", 
        borderBottom: "1px solid #ddd",
        position: "fixed",  
        padding: 0,
        top: 64,  
        left: 255, 
        right: isRightSidebarOpen ? 255 : 0, 
        height: "8vh",
        display: "flex",
        justifyContent: "space-between",
        zIndex: 2,
        opacity: 1,
      }}
    >
    <Box sx={{width: '5vw'}}></Box>
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
          <Tab
          icon={<AssignmentIcon />}
          label="Kanban"
          sx={{ flex: 1 }}
        />
          <Tab
          icon={<BarChartIcon />}
          label="Analytics"
          sx={{ flex: 1 }}
        />
          <Tab
          icon={<ChatBubbleOutlineIcon />}
          label="Chat"
          sx={{ flex: 1 }}
        />
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
