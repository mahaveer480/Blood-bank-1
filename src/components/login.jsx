import React, { useState } from "react";
import './styles/login-signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import { Helmet } from "react-helmet";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); 
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Logged in user:", user); 
      navigate("/Home"); 
    } catch (error) {
      setError("Login failed. Please check your credentials."); 
      console.error(error.message); 
    }
  };

  return (
      <div id="mainofmain">
    <div id="mainDiv">
      <Helmet>
<title>Login</title>

</Helmet>
      <h1>Login Page</h1>
      <div id="buttonDiv">
        <Link to="/signup">
          <button style={{ borderBottom: "4px solid  #a30000 " }} id="c2">Sign Up</button>
        </Link>
        <button id="login2"style={{ borderBottom: "4px solid  gray " }} >
          Login
        </button>
      </div>

      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            id="emailInput"
            placeholder="Username or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            id="passwordInput"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

        <br />
        <button id="loginSubmitButton" type="submit">
          Login
        </button>
      </form>
    </div></div>
  );
};

export default Login;
