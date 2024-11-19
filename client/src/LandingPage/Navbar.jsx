import { Box, IconButton, Modal, Typography } from "@mui/material";
import { Buttonstyle, IconBut, LinksArea, LogBox, StyledLinks, StyledToolbar, style } from "./LandingPageStyles";
import { useState } from "react";
import Login from "./login";
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';

function Navbar() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const LogBoxMotion = motion(LogBox);
    return (
        <StyledToolbar >
            <Typography variant='h5' fontWeight="bolder" color="#264653">OCPMS</Typography>
            <LinksArea>
                <StyledLinks href="#landing" color="black" underline="hover" variant="body1" display="block" >Home</StyledLinks>
                <StyledLinks href="#features" color="black" underline="hover" variant="body1" display="block" >Features</StyledLinks>
                <StyledLinks href="#how-it-works" color="black" underline="hover" variant="body1" display="block" >How it works</StyledLinks>
                <StyledLinks href="#faq" color="white" underline="hover" variant="body1" display="block" >FAQ</StyledLinks>
            </LinksArea>
            <Buttonstyle onClick={handleOpen}>Get started</Buttonstyle>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropProps={{
                    style: {
                        backdropFilter: 'blur(5px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}
            >

                <LogBoxMotion
                    initial={{ opacity: 0 ,top:'60%'}}
                    animate={{ opacity: 1 ,top:'50%'}}

                    // sx={{border: "500px"}}
                >
                    <Login />
                    <IconBut
                        onClick={handleClose}                    
                    >
                        <CloseIcon />
                    </IconBut>
                </LogBoxMotion>

            </Modal>
        </StyledToolbar>
    );
}

export default Navbar;
