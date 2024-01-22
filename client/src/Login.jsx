import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
//import{ useNavigate} from "react-router-dom"

function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [userId, setUserId] = useState(''); // Add state for userId
    const navigate =useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

       /* axios.post('http://localhost:3001/login', {
            
            email,
            password
        })
        .then(result => {
            console.log(result);
            if(result.data === "Success"){
                navigate('/home');

            }
        })
        .catch(err => console.log(err));
    };*/
    try {
    const response = await axios.post('http://localhost:3001/login', {
        email,
        password
    });

    console.log(response);

    // Check if response.data is present
    if (response.data) {
        // Assuming response.data is a string
        const responseData = response.data;

        // Check if the response indicates success
        if (responseData === 'Success') {
            console.log('Login successful');

            // You may set any identifier in the state, as the server doesn't seem to provide a user object
            // For example, setUserId(email) or setUserId('some-unique-id')
            setUserId(email); // Assuming email is unique

            // Navigate to the home route
            navigate('/home');
        } else {
            console.log('Login unsuccessful. Server response:', responseData);
        }
    } else {
        console.log('Response data not present');
    }
} catch (error) {
    console.error(error);
}

    };
    return (
        <div>
            <p>User ID: {userId}</p>
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