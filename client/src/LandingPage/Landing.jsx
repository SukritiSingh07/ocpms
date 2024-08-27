import { Typography } from "@mui/material";
import { Buttonstyle, LeftBox, LeftBoxBot, LeftBoxMid, LeftBoxTop, RightBox, RightBoxIn, RightImg, StyledMainPage } from "./LandingPageStyles";
import {motion} from 'framer-motion';

function LandingPage(){

    const MotionRightImg = motion(RightImg);

    return(
        <StyledMainPage>
            <LeftBox>
            <LeftBoxTop>
                <Typography variant="h2" fontWeight="bold">Empower Your Team with Seamless Collaboration</Typography>
            </LeftBoxTop>
            <LeftBoxMid>
                <Typography variant="h6">Experience unparalleled productivity and seamless teamwork with CollabFlow TNC - the all-in-one collaboration platform designed to simplify the way your team works and communicates.</Typography>
            </LeftBoxMid>
            <LeftBoxBot>
                <Buttonstyle>Create Workspace</Buttonstyle>
            </LeftBoxBot>
            </LeftBox>
            <RightBox>
                
                <RightBoxIn><MotionRightImg
                    animate={{ x: [0, -50, 0], y:[0,-50,0] }} 
                    transition={{
                        duration: 4,      
                        repeat: Infinity, 
                        // repeatDelay: 1,    
                        ease: "easeInOut", 
                    }}
                ></MotionRightImg></RightBoxIn>
            </RightBox>
        </StyledMainPage>
    )
}

export default LandingPage;