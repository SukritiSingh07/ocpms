import { styled, Toolbar } from "@mui/material";

export const StyledToolbar= styled(Toolbar)(({theme})=>(
    {
        background: "#7400b8",
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center' 
    }
))