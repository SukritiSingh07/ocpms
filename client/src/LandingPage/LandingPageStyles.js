import styled from "@emotion/styled";
import {  Box, Button, Card, CardContent, Link, Stepper, Toolbar } from "@mui/material";

//Navbar Styling-------------------------------------------------------------------------------------------------------------------->

export const StyledToolbar = styled(Toolbar)(({theme})=>({
 display:"flex",
 justifyContent:"space-between",
 padding: "1rem",
 backgroundImage: "linear-gradient(90deg, #FEF6F4 57%, #5390d9 43%)",
}))

export const LinksArea = styled(Box)(({theme})=>({
 display:"flex",
 justifyContent:"space-between",
 gap: "80px",
 color: "rgb(80, 80, 80)",
 fontFamily: "Inter, sans-serif",
}))

export const Buttonstyle=styled(Button)(({theme})=>({
    background: "#7400b8",
    color: "#ffff",
    backdropFilter: "blur(10px)",
    border: "50% solid rgba(255, 255, 255, 0.125)",
    borderRadius: "30%",
    padding: "15px 30px",
    // alignContent: "center",
    borderRadius: "35px",
    '&:hover': {
        backgroundColor: '#ffff',
        color: "black"
      },
}))

export const StyledLinks=styled(Link)(({theme})=>({
    display: "inline-block",
    color: "black",
    textDecoration: "none",
    transition: "transform 0.2s ease",

    '&:hover':{
    textDecoration: "none",
    transform: "scale(1.1)",
    },
    '&:active':{
    textDecoration: "none",
    transform: "translateY(1px)",
    }

 }))   

//LandingPage styling-------------------------------------------6096ba------------------------------------------------------------------------->

export const StyledMainPage = styled(Box)(({theme})=>({
    height: "90vh",
    backgroundImage: "url('/assets/LandingPage/LandingPageDivider.svg'),linear-gradient(90deg, #FEF6F4 57%, #5390d9 43%)",
    display: "flex",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundSize: "contain"
   }))

   export const LeftBox = styled(Box)(({theme})=>({
    width: "55%",
    padding: "2%",
    justifyContent: "space-between",
    gap: "200px"
    // display: "flex"
   }))

   export const LeftBoxTop = styled(Box)(({theme})=>({
    paddingTop: "17%",
   }))

   export const LeftBoxMid = styled(Box)(({theme})=>({
    padding: "2% 25% 10% 0",
   }))

   export const LeftBoxBot = styled(Box)(({theme})=>({
    paddingBottom: "15%",
   }))

   export const RightBox = styled(Box)(({theme})=>({
    width: "32%",
    height: "100%",
    // paddingLeft: "1%",
    alignContent: "center",
    // backgroundImage: "url('/assets/LandingPage/LandingPage.png')",
   }))

   export const RightImg = styled(Box)(({theme})=>({
    width: "39vw",
    height: "50vh",
    // paddingLeft: "1%",
    position: "absolute",
    alignContent: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    // left: "0",
    right: "30px",
    bottom: "20px",
    backgroundImage: "url('/assets/LandingPage/LandingPage.png')",
    zIndex: "3",
   }))

   export const RightBoxIn = styled(Box)(({theme})=>({
    backgroundColor: "#fff",
    backgroundColor: "rgba(255,255,255,0.5)",
    height: "48vh",
    width: "39vw",
    borderRadius: "20px",
    // zIndex: "-1",
    position: "relative",
   }))

//Features styling---------------------------------------------------------------------------------------------------------------------->

export const FeaturesArea = styled(Box)(({theme})=>({
    padding: "5%",
    // margin: "5% 0",
    backgroundImage: "url('/assets/LandingPage/keyfeaturesbg.webp'),linear-gradient(90deg, #7400b8, #5390d9)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    // marginTop: 0,
   }))

export const FeaturesContent = styled(Box)(({theme})=>({
    padding: "5%",
    // backgroundColor: "#e9c46a",
    borderRadius: "50px",
   }))


export const FeaturesCardArea = styled(Card)(({theme})=>({
    margin: "5% 0",
    // backgroundColor: "#ebd49d",
    backgroundColor: "rgba(255,255,255,0.5)",
    display: "flex",
    padding: "2%",
    // width: "90%"
    boxShadow: "10",
    borderRadius: "50px",
   }))

export const FeaturesCardImg = styled(Box)(({theme})=>({
    // padding: "5% 0",
    // backgroundColor: "#264653",
    width: "8%",
    // padding: "2%"
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
   }))

export const FeaturesCardContent = styled(CardContent)(({theme})=>({
    // padding: "5% 0",
    // backgroundColor: "#264653",
    width: "92%",
    paddingBottom: "4%"
   }))

//Howtouse stylings-------------------------------------------------------------------------------------------------------->

export const HowtouseArea = styled(Box)(({theme})=>({
    padding: "5%",
    // margin: "5% 0",
    // backgroundColor: "linear-gradient(90deg, #e7c6ff, #c8b6ff)",
    backgroundImage: "url('/assets/LandingPage/howtousebg.webp'),linear-gradient(90deg, #dee2ff, #feeafa)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
   }))

export const HowtouseStepper = styled(Stepper)(({theme})=>({
    padding: "5%",
    margin: "5% 0",
    // backgroundColor: "#f4a261"
   }))

   export const HowtouseCard = styled(Box)(({theme})=>({
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
   }))

//Faq Stylings--------------------------------------------------------------------------------------------------------->

export const FaqArea = styled(Box)(({theme})=>({
    padding: "5%",  
   }))

//Footer stylings----------------------------------------------------------------------------------------------------->

export const FooterArea = styled(Box)(({theme})=>({
    backgroundColor: "#264653",
    display: "flex",
    // height: "60vh",
    padding: "40px 20px",
    // textColor: "white"
  }))

   export const FooterBottom = styled(Box)(({theme})=>({
    backgroundColor: "#264653",
    // width: "50vw", 
    marginTop: 0,
    padding: "40px 20px",
    textAlign: "center",
    borderTop: "1px solid #555"
  }))