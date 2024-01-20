// SignUp.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './signup.css';  // Import the CSS file
import QaQuestionsEntry from "./QaQuestionsEntry.jsx";


function SignUp() {
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    // State for quiz type
  const [quizType, setQuizType] = useState("");
  // State for Q&A questions
  const [qaQuestions, setQaQuestions] = useState([]);

  // Function to handle Q&A questions submission
  const handleQaQuestionsSubmit = (newQaQuestions) => {
    // Add the new Q&A questions to the state
    setQaQuestions(newQaQuestions);
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit function called");


        axios.post('http://localhost:3001/register', {
            fullName,
            email,
            password
        })
        .then(result => {
            console.log("API call successful", result);
            navigate('/login');
        })
        .catch(err => 
            console.log("API call error", err));
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2 className="signup-title">QUIZZIE</h2>
                <form onSubmit={handleSubmit}>
                
                    <Link to="/signup" className="btn btn-primary me-2">Sign Up</Link>
                    <Link to="/login" className="login button">
                    Login
                </Link>
                    <div className="form-group">
                        <label htmlFor="fullName" className="form-label">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="fullName"
                            className="form-input"
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-input"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-input"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="signup button">
                        Sign Up
                    </button>
                    
                </form>
                <div className="form-group">
          <label htmlFor="quizType" className="form-label">
            <strong>Quiz Type</strong>
          </label>
          <select
            name="quizType"
            className="form-input"
            value={quizType}
            onChange={(e) => setQuizType(e.target.value)}
          >
            <option value="">Select Quiz Type</option>
            <option value="Q&A">Q&A</option>
            {/* Add other quiz types as needed */}
          </select>
        </div>

        {/* Conditionally render QaQuestionsEntry component */}
        {quizType === "Q&A" && (
          <QaQuestionsEntry onQaQuestionsSubmit={handleQaQuestionsSubmit} />
        )}

            </div>
            
        </div>
    );
}

export default SignUp;