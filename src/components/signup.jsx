import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./styles/login-signup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [username, setUsername] = useState("");

  // Save to Local Storage
  localStorage.setItem("number", number);
  localStorage.setItem("age", age);
  localStorage.setItem("img", imageURL);
  localStorage.setItem("name", username);
  localStorage.setItem("city", city);
  localStorage.setItem("role", role);

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

  

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Number Validation
    if (!number || !/^\d{11}$/.test(number)) {
      setError("Number must be exactly 11 digits.");
      return;
    }

    // Age Validation
    const parsedAge = parseInt(age);
    if (!age || isNaN(parsedAge) || parsedAge < 22 || parsedAge > 35) {
      setError("Age must be between 22 and 35.");
      return;
    }

    // Required Fields
    if (!username) {
      setError("Username is required.");
      return;
    }
    if (!city) {
      setError("City is required.");
      return;
    }
    if (!role) {
      setError("Role selection is required.");
      return;
    }
    if (!imageURL) {
      setError("Image URL is required.");
      return;
    }

    try {
      // Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data to Firestore
      await addDoc(collection(db, "users"), {
        email,
        number,
        city,
        role,
        age,
        imageURL,
        uid: user.uid,
        username,
      });

      setSuccess("Account created successfully!");
      setError("");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(`Error: ${err.message}`);
      setSuccess("");
    }
  };

  return (
    <>
      <Helmet>
        <title>Signup</title>
      </Helmet>
      <div id="mainofmain">
      <div id="mainDiv">
        <h1>Sign Up Page</h1>
        <div id="buttonDiv">
          <button style={{ borderBottom: "4px solid gray" }} id="c2">
            Sign Up
          </button>
          <Link to={"/"}>
            <button
              style={{ borderBottom: "4px solid #a30000" }}
              id="login2"
            >
              Login
            </button>
          </Link>
        </div>

        <input
          type="text"
          placeholder="Email"
          id="input1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          id="input2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          id="input2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          id="input2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <input
            type="text"
            placeholder="Number"
            style={{ width: "70%" }}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            style={{ width: "27%" }}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", width: "100%", margin: "20px 0px", height: "30px" }}>
          <select
            style={{ width: "100%", borderRadius: "5px" }}
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="donor">Donor</option>
            <option value="receiver">Receiver</option>
          </select>
          {role && <p style={{ marginLeft: "10px" }}>Selected Role: {role}</p>}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <input
            type="url"
            placeholder="Image URL"
            style={{ width: "70%" }}
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
          <input
            type="text"
            placeholder="Age"
            style={{ width: "27%" }}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button
          style={{ marginTop: "20px" }}
          id="loginButton"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div></div>
    </>
  );
};

export default Signup;
