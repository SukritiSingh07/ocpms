import { Link } from "@mui/material";
import React, { useState, useEffect } from "react";
import { formstyle, LoginBox, LoginButton, TextPlace } from "./LandingPageStyles";
import { useNavigate } from "react-router-dom";

const divstyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid black',
    width: "50%"
};

function Login() {
    const navigate = useNavigate();
    const [signup, setSignup] = useState(true);
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [isError, setIsError] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [form, setForm] = useState({});

    const handleForm = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
        if (name === 'password') setPassword(value);
    };

    const checkValidation = (e) => {
        const confirmPassword = e.target.value;
        setConfirmPass(confirmPassword);
        if (password === confirmPassword) {
            setIsError("");
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
            setIsError("Passwords do not match");
        }
    };

    useEffect(() => {
        if (confirmPass && password !== confirmPass) {
            setIsError("Passwords do not match.");
        } else {
            setIsError("");
        }
    }, [password, confirmPass]);

    const handlePage = () => {
        setSignup((prev) => !prev);
        setPassword(""); 
        setConfirmPass(""); 
        setPasswordMatch(false); 
    };

    const url = signup ? 'http://localhost:5000/signup' : 'http://localhost:5000/login';

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
    
            if (!response.ok) { 
                throw new Error(`HTTP error! Status: ${response.status}`); 
            }
    
            const data = await response.json();
            // console.log(data);
            if (data.success) {
                navigate('/dashboard', { state: { user: data} });
            }
    
        } catch (error) {
            console.error("Fetch error:", error.message);
        }
    };

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
                <form style={formstyle} onSubmit={handleSubmit}>
                    <TextPlace
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        size="small"
                        margin="normal"
                        name="username"
                        onChange={handleForm}
                    />
                    {signup && (
                        <TextPlace
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            size="small"
                            margin="normal"
                            name="Email"
                            onChange={handleForm}

                        />
                    )}
                    <TextPlace
                        id="password"
                        label="Password"
                        variant="outlined"
                        size="small"
                        type="password"
                        margin="normal"
                        name="password"
                        onChange={handleForm}
                        
                    />
                    {signup && (
                        <TextPlace
                            id="confirm-password"
                            label="Confirm Password"
                            variant="outlined"
                            size="small"
                            type="password"
                            margin="normal"
                            name="confirmPass"
                            onChange={checkValidation}
                            error={Boolean(isError)}
                            helperText={isError}
                            
                        />
                    )}
                    <LoginButton
                        type="submit"
                        variant="contained"
                        fullWidth
                        margin="normal"
                        disabled={signup && !passwordMatch}
                    >
                        {signup ? "Sign Up" : "Sign In"}
                    </LoginButton>
                </form>
                <Link
                    sx={{
                        padding: 3,
                        cursor: "pointer",
                        color: '#7400b8',
                        textDecoration: "none",
                        fontStyle: "italic",
                        '&:hover': { textDecoration: 'underline' }
                    }}
                    onClick={handlePage}
                >
                    {signup ? "Login Instead" : "Register Now"}
                </Link>
            </div>
        </LoginBox>
    );
}

export default Login;
