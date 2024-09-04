import { Diversity1Outlined, Padding } from "@mui/icons-material";
import { Box, TextField, Typography, Button, Link } from "@mui/material";
import React, { useState, useEffect } from "react"
import { Buttonstyle, LoginBox, LoginButton } from "./LandingPageStyles";



const divstyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid black',
    width: "50%"
}
function Login() {
    const [password, setPassword] = useState("");
    const [confpass, setconfPass] = useState("");
    const [hasError, setHasError] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleconfPassChange = (event) => {
        setconfPass(event.target.value);
    }
    const [login, setlogin] = useState(false);
    const [signup, setsignup] = useState(true);

    const handlePage = () => {
        if (login === true) {
            setlogin(false);
            setsignup(true);
        } else {
            setlogin(true);
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
                <h2>{signup ? "Sign Up to" : "Sign In as"}</h2>
                <img src="" alt="logo" />
                <form style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "1vh" }}>
                    <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        size="small"
                        margin="normal"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#7400b8',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                '&.Mui-focused': {
                                    color: 'Black',
                                },
                            },
                            }
                        }
                            />
                            { signup && (
                                <TextField
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    size="small"
                                    margin="normal"
                                    sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#7400b8',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                '&.Mui-focused': {
                                    color: 'Black',
                                },
                            },
                            }
                        }
                                />
                            )}
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        size="small"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        margin="normal"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#7400b8',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                '&.Mui-focused': {
                                    color: 'Black',
                                },
                            },
                            }
                        }
                    />
                    {signup && (
                        <TextField
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
                            sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#7400b8',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                '&.Mui-focused': {
                                    color: 'Black',
                                },
                            },
                            
                            }
                        }
                        />
                    )}
                    <LoginButton
                        variant="contained"
                        fullWidth
                        margin="normal"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '13px',
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#7400b8',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                '&.Mui-focused': {
                                    color: 'Black',
                                },
                            },
                            marginTop:3,
                            borderRadius:'20px'
                            }
                            
                        }
                    >
                        {signup ? "Sign Up" : "Sign In"}
                    </LoginButton>
                </form>
                <Link sx={{ padding: 3, cursor: "pointer", color: "#7400b8", textDecoration:"none" }} onClick={handlePage}>
                    {signup ? "Login Instead" : "Register Now"}
                </Link>
            </div>
        </LoginBox>

    )
}

export default Login;