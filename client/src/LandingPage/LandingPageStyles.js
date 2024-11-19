import styled from "@emotion/styled";
import { Box, Button, Card, CardContent, IconButton, Link, Stepper, TextField, Toolbar } from "@mui/material";
import { cyan } from "@mui/material/colors";

//Navbar Styling-------------------------------------------------------------------------------------------------------------------->

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    backgroundImage: "linear-gradient(90deg, #FEF6F4 57%, #5390d9 43%)",
}))

export const LinksArea = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    gap: "80px",
    color: "rgb(80, 80, 80)",
    fontFamily: "Inter, sans-serif",
}))

export const Buttonstyle = styled(Button)(({ theme }) => ({
    background: "#7400b8",
    color: "#ffff",
    backdropFilter: "blur(10px)",
    border: "50% solid rgba(255, 255, 255, 0.125)",
    padding: "15px 30px",
    borderRadius: "35px",
    '&:hover': {
        backgroundColor: '#ffff',
        color: "black"
    },
}))

export const StyledLinks = styled(Link)(({ theme }) => ({
    display: "inline-block",
    color: "black",
    textDecoration: "none",
    transition: "transform 0.2s ease",

    '&:hover': {
        textDecoration: "none",
        transform: "scale(1.1)",
    },
    '&:active': {
        textDecoration: "none",
        transform: "translateY(1px)",
    }

}))

//LandingPage styling-------------------------------------------6096ba------------------------------------------------------------------------->

export const StyledMainPage = styled(Box)(({ theme }) => ({
    height: "90vh",
    backgroundImage: "url('/assets/LandingPage/LandingPageDivider.svg'),linear-gradient(90deg, #FEF6F4 57%, #5390d9 43%)",
    display: "flex",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundSize: "contain"
}))

export const LeftBox = styled(Box)(({ theme }) => ({
    width: "55%",
    padding: "2%",
    justifyContent: "space-between",
    gap: "200px"
}))

export const LeftBoxTop = styled(Box)(({ theme }) => ({
    paddingTop: "17%",
}))

export const LeftBoxMid = styled(Box)(({ theme }) => ({
    padding: "2% 25% 10% 0",
}))

export const LeftBoxBot = styled(Box)(({ theme }) => ({
    paddingBottom: "15%",
}))

export const RightBox = styled(Box)(({ theme }) => ({
    width: "32%",
    height: "100%",
    alignContent: "center",
}))

export const RightImg = styled(Box)(({ theme }) => ({
    width: "39vw",
    height: "50vh",
    position: "absolute",
    alignContent: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    right: "30px",
    bottom: "20px",
    backgroundImage: "url('/assets/LandingPage/LandingPage.png')",
    zIndex: "3",
}))

export const RightBoxIn = styled(Box)(({ theme }) => ({
    backgroundColor: "rgba(255,255,255,0.5)",
    height: "48vh",
    width: "39vw",
    borderRadius: "20px",
    position: "relative",
}))

//Features styling---------------------------------------------------------------------------------------------------------------------->

export const FeaturesArea = styled(Box)(({ theme }) => ({
    padding: "5%",
    backgroundImage: "url('/assets/LandingPage/keyfeaturesbg.webp'),linear-gradient(90deg, #7400b8, #5390d9)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
}))

export const FeaturesContent = styled(Box)(({ theme }) => ({
    padding: "5%",
    borderRadius: "50px",
}))


export const FeaturesCardArea = styled(Card)(({ theme }) => ({
    margin: "5% 0",
    backgroundColor: "rgba(255,255,255,0.5)",
    display: "flex",
    padding: "2%",
    boxShadow: "10",
    borderRadius: "50px",
}))

export const FeaturesCardImg = styled(Box)(({ theme }) => ({
    width: "8%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
}))

export const FeaturesCardContent = styled(CardContent)(({ theme }) => ({
    width: "92%",
    paddingBottom: "4%"
}))


//Howtouse stylings-------------------------------------------------------------------------------------------------------->

export const HowtouseArea = styled(Box)(({ theme }) => ({
    padding: "5%",
    backgroundImage: "url('/assets/LandingPage/howtousebg.webp'),linear-gradient(90deg, #dee2ff, #feeafa)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
}))

export const HowtouseStepper = styled(Stepper)(({ theme }) => ({
    padding: "5%",
    margin: "5% 0",
}))

export const HowtouseCard = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}))

//Faq Stylings--------------------------------------------------------------------------------------------------------->

export const FaqArea = styled(Box)(({ theme }) => ({
    padding: "5%",
}))

//Footer stylings----------------------------------------------------------------------------------------------------->

export const FooterArea = styled(Box)(({ theme }) => ({
    backgroundColor: "#264653",
    display: "flex",
    padding: "40px 20px",
}))

export const FooterBottom = styled(Box)(({ theme }) => ({
    backgroundColor: "#264653",
    marginTop: 0,
    padding: "40px 20px",
    textAlign: "center",
    borderTop: "1px solid #555"
}))
//Login Box---------------------------------------------------------------------------------------------------------------------->
export const LoginBox = styled(Box)(({ theme }) => (
    {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        padding: 1,
        margin: 0,
        bgcolor: 'white',
        boxShadow: 3,
        width: '120vh',
        height: '80vh'
    }
))
export const TextPlace= styled(TextField)(({ theme })=>(
    {
        '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#D8B4FE',
            },
        },
        '& .MuiInputLabel-root': {
            '&.Mui-focused': {
                color: 'Black',
            },
        },
        }
))
export const LogBox = styled(Box)(({ theme }) =>({
    // position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative', width: '120vh',
    backgroundColor: 'white' ,
    height: '80vh', 
    boxShadow: 24,
    // padding: '3mm',
    // border: '10px solid grey',
    borderRadius: "10px",
    // padding: "10px",s
    // paddingTop: "10px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}
))
export const IconBut=styled(IconButton)(({theme})=>(
    {
        position: 'absolute',
        top: -20,
        right: -20,
        color: 'black',
        backgroundColor: 'white',
        borderRadius: '50%',
        padding: '4px',
        '&:hover': {
            backgroundColor: '#FEA1A1',
            color: "black"
        },
    }
))
export const LoginButton = styled(Button)(({ theme }) => (
    {
        background: "#7400b8",
        color: "#ffff",
        '&:hover': {
            backgroundColor: '#ffff',
            color: "black"
        },
        
            '& .MuiOutlinedInput-root': {
                borderRadius: '13px',
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#b3a2bd',
                },
            },
            '& .MuiInputLabel-root': {
                '&.Mui-focused': {
                    color: 'Black',
                },
            },
            marginTop: '3mm',
            borderRadius: '20px',
        }
))

export const formstyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "1vh"
  };
  