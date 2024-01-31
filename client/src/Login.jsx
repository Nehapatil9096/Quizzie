import React, { useState } from 'react';
//import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
//import{ useNavigate} from "react-router-dom"
import { setUserId } from './redux/userSlice';
import { setDashboardData } from './redux/userSlice';
import { clearUserData, loginSuccess } from './redux/userSlice';
import AuthPage from './AuthPage';
import './Login.css';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user.userId);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(clearUserData());

            const response = await axios.post('http://localhost:3001/login', {
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
            <AuthPage title="Quizzie" buttonText="Signup" buttonLink="/signup">

            <div>
            <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
            <div className="button-container">
                    <Link to="/register" className="button">Signup</Link>
                    <Link to="/login" className="button">Login</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                        type="Email"
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="email"
                        className="form-control rounded-0"
                        onChange={(e) => setEmail(e.target.value)}

                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input
                        type="Password"
                        placeholder="Enter Password"
                        autoComplete="off"
                        name="Password"
                        className="form-control rounded-0"
                        onChange={(e) => setPassword(e.target.value)}

                        />
                    </div>
                    <button type="submit" className="login-button">
                    Login
                    </button>
                    </form>
                        
                    
                    
                </div>

                </div>  
            </div>
            </AuthPage>

        );
    }

    export default Login;