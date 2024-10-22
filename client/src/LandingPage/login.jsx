import {Link } from "@mui/material";
import React, { useState, useEffect } from "react"
import { LoginBox, LoginButton, TextPlace } from "./LandingPageStyles";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const divstyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid black',
    width: "50%"
}
function Login() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confpass, setconfPass] = useState("");
    const [hasError, setHasError] = useState(false);

    const handleLogin=()=>{
        navigate('/dashboard');
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleconfPassChange = (event) => {
        setconfPass(event.target.value);
    }
    const [signup, setsignup] = useState(true);

    const handlePage = () => {
        if (signup === false) {
            setsignup(true);
        } else {
            setsignup(false);
        }
    }
    useEffect(() => {
        if (confpass !== "") {
            if (password !== confpass) {
                setHasError(true);
            } else {
                setHasError(false);
            }
        }
    }, [password, confpass]);
    return (
        <LoginBox>
            <img
                src="https://img.freepik.com/free-vector/charts-set-blue-dashboard-user-panel_23-2148381984.jpg"
                alt="Dashboard"
                style={{ width: "50%" }}
            />
            <div style={divstyle}>
                <h2 style={{ fontFamily: "Open Sans" }}>{signup ? "Sign Up to" : "Sign In as"}</h2>
                <img src="" alt="logo" />
                <form style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "1vh" }}>
                    <TextPlace
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        size="small"
                        margin="normal"

                    />
                    {signup && (
                        <TextPlace
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            size="small"
                            margin="normal"


                        />
                    )}
                    <TextPlace
                        id="password"
                        label="Password"
                        variant="outlined"
                        size="small"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        margin="normal"

                    />
                    {signup && (
                        <TextPlace
                            id="password"
                            label="Confirm Password"
                            variant="outlined"
                            size="small"
                            type="password"
                            value={confpass}
                            onChange={handleconfPassChange}
                            error={hasError}
                            helperText={hasError ? "Passwords do not match." : ""}
                            margin="normal"

                        />
                    )}
                    <LoginButton
                        onClick={handleLogin}
                        variant="contained"
                        fullWidth
                        margin="normal"                      
                    >
                        {signup ? "Sign Up" : "Sign In"}
                    </LoginButton>
                </form>
                <Link sx={{ padding: 3, cursor: "pointer", color: '#7400b8', textDecoration: "none", fontStyle: "italic",
                        '&:hover':{
                            textDecoration:'underline'
                        }
                     }} onClick={handlePage}>
                    {signup ? "Login Instead" : "Register Now"}
                </Link>
            </div>
        </LoginBox>

    )
}

export default Login;