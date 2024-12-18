import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import logo from "./styles/blood logo.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Ensure firebase is correctly imported

const Navbar1 = () => {
    const [imageURL, setImageURL] = useState(""); // State for user image
    const [username, setUsername] = useState(""); // State for user name
    const [loading, setLoading] = useState(true); // Loading state

    const auth = getAuth();

    // Fetch user data from Firestore
    useEffect(() => {
        const fetchUserData = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    try {
                        const qry = query(collection(db, "users"), where("email", "==", user.email));
                        const querySnapshot = await getDocs(qry);

                        if (!querySnapshot.empty) {
                            querySnapshot.forEach((doc) => {
                                const userData = doc.data();
                                setImageURL(userData.imageURL || "https://via.placeholder.com/30");
                                setUsername(userData.username || "User");
                            });
                        } else {
                            console.log("User not found in Firestore.");
                        }
                    } catch (err) {
                        console.error("Error fetching user data:", err);
                    } finally {
                        setLoading(false);
                    }
                }
            });
        };

        fetchUserData();
    }, [auth]);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <Navbar style={{ backgroundColor: "#961414" }} variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center">
                        <img src={logo} alt="Logo" style={{ width: "30px", marginRight: "10px" }} />
                        <span>Blood Bank</span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbar-nav" />

                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/home" className="text-white">Home</Nav.Link>
                        </Nav>

                        <Nav>
                                    <span style={{ marginRight: "15px", color: "#fff",marginTop:"6px" }}>{username}</span>
                            <Dropdown align="end">
                                <Dropdown.Toggle variant="outline-light" className="d-flex align-items-center">
                                    <Image
                                        src={imageURL}
                                        roundedCircle
                                        style={{ width: "30px", height: "30px", marginRight: "10px" }}
                                    />
                                    Profile
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark">
                                    <Dropdown.Item as={Link} to="/profile">View Profile</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/setting">Settings</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <style type="text/css">
                {`
                @media (max-width: 768px) {
                    .navbar-nav {
                        text-align: center;
                    }
                    .navbar-collapse {
                        text-align: center;
                    }
                }
                `}
            </style>
        </>
    );
};

export default Navbar1;
