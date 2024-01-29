    import React, { useState } from 'react';
    //import { useState } from "react";
    import { Link, useNavigate } from "react-router-dom";
    import { useDispatch, useSelector } from 'react-redux';
    import axios from 'axios'
    //import{ useNavigate} from "react-router-dom"
    import { setUserId } from './redux/userSlice';
    import { setDashboardData } from './redux/userSlice';

    function Login() {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const userId = useSelector((state) => state.user.userId);

        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                const response = await axios.post('http://localhost:3001/login', {
                email,
                password,
                });
        
                if (response.data.message === 'Success') {
                    console.log('Login successful. Server response:', response.data);
                    dispatch(setUserId(email));
                    dispatch(setDashboardData(response.data.dashboardData));

                    navigate('/home');
                } else {
                console.log('Login unsuccessful. Server response:', response.data);
                }
            } catch (error) {
                console.error(error);
            }
            };
        return (
            <div>
            <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>QUIZZIE</h2>
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
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                    Login
                    </button>
                    </form>
                    <Link to="/login" className=" btn btn-default border w-100 bg-light rounded-0 text-decoration none">
                        Signup
                    </Link>
                    
                </div>

                </div>  
            </div>
        );
    }

    export default Login;