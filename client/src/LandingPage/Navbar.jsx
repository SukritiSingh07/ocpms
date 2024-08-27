import { ButtonGroup, Divider, Typography, Link } from "@mui/material";
import { Buttonstyle, LinksArea, StyledLinks, StyledToolbar } from "./LandingPageStyles";

function Navbar() {
    return (
        <StyledToolbar >
            <Typography variant='h5' fontWeight="bolder" color="#264653">OCPMS</Typography>
            <LinksArea>
                <StyledLinks href="#landing" color="black" underline="hover" variant="body1" display="block" >Home</StyledLinks>
                <StyledLinks href="#features" color="black" underline="hover" variant="body1" display="block" >Features</StyledLinks>
                <StyledLinks href="#how-it-works" color="black" underline="hover" variant="body1" display="block" >How it works</StyledLinks>
                <StyledLinks href="#faq" color="white" underline="hover" variant="body1" display="block" >FAQ</StyledLinks>
            </LinksArea>
            <Buttonstyle>Get started</Buttonstyle>
        </StyledToolbar>
    );
}

export default Navbar;
