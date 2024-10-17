import { styled, Toolbar } from "@mui/material";

export const StyledToolbar= styled(Toolbar)(({theme})=>(
    {
        background: "#004e98",
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center' 
    }
))