import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Signup.css';  // Import the CSS file
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from './redux/userSlice';
import { clearUserData, loginSuccess } from './redux/userSlice';

function SignUp() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(clearUserData());

        if (password !== confirmPassword) {
            setPasswordMatchError(true);
            return;
        }

        axios.post('https://quizzie12343.onrender.com/register', {
            fullName,
            email,
            password
        })
        .then(result => {
            console.log("API call successfull",result);
            dispatch(setUserId(email));
            navigate('/home');
            handleLogin(e);
        })
        .catch(err =>
            console.log("API call error", err));
        
    };
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            dispatch(clearUserData());

            const response = await axios.post('https://quizzie12343.onrender.com/login', {
            email,
            password,
            });

            if (response.data.message === 'Success') {
                console.log('Login successful. Server response:', response.data);
                dispatch(setUserId(email));
                //dispatch(setDashboardData(response.data.dashboardData));
                // Store the token in a secure way (you can use localStorage or sessionStorage)
                localStorage.setItem('token', response.data.token);
                const token =  response.data.token; // Replace with the actual token
                dispatch(loginSuccess(token));
                navigate('/home');
            } else {
            console.log('Login unsuccessful. Server response:', response.data);
            }
        } catch (error) {
            console.error(error);
        }
        };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2 className="title">Quizzie</h2>
                <div className="button-container">
                    <Link to="/signup" className="button">Signup</Link>
                    <Link to="/login" className="button">Login</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="fullName">Name:</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            autoComplete="off"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setPasswordMatchError(false); // Reset error when typing in the confirm password field
                            }}
                        />
                    </div>
                    {passwordMatchError && <div className="error-message">Passwords do not match</div>}
                    <button type="submit" className="signup-button">Sign-up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
