import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import Navbar1 from "./navbar";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";

const FetchUserByEmail = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});




    // localStorage.setItem("role")
    // Fetch user data from Firestore
    const fetchUserFromFirestore = async (userEmail) => {
        const usersCollection = collection(db, "users");
        const q = query(usersCollection, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return querySnapshot.docs[0];
        } else {
            return null;
        }
    };

    // Fetch Firestore user data on AuthStateChange
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDoc = await fetchUserFromFirestore(user.email);
                    if (userDoc) {
                        setUserData({ id: userDoc.id, ...userDoc.data() });
                        setFormData({ ...userDoc.data() });
                    } else {
                        setError("No user found.");
                    }
                } catch (err) {
                    console.error(err);
                    setError("Failed to fetch user data.");
                } finally {
                    setLoading(false);
                }
            } else {
                setUserData(null);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    // Input change handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Save updated data to Firestore
    const handleSave = async () => {
        if (!formData.email.includes("@")) {
            alert("Please enter a valid email.");
            return;
        }

        if (formData.age && (isNaN(formData.age) || formData.age < 0)) {
            alert("Age must be a positive number.");
            return;
        }

        if (formData.number && (!/^\d{11}$/.test(formData.number))) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        if (userData?.id) {
            const userDocRef = doc(db, "users", userData.id);
            try {
                await updateDoc(userDocRef, {
                    username: formData.username,
                    email: formData.email,
                    age: formData.age,
                    city: formData.city,
                    role: formData.role,
                    imageURL: formData.imageURL,
                    number: formData.number, 
                });
                setUserData({ ...formData });
                setEditMode(false);
                setError("");
                alert("Profile updated successfully!");
            } catch (err) {
                console.error("Error updating data:", err);
                setError("Failed to update user data.");
            }
        }
    };

    // Loading state
    if (loading)
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );

    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <>
            <Navbar1 />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    backgroundColor: "#f8f9fa",
                    padding: "20px",
                    boxSizing: "border-box",
                }}
            >
                {userData ? (
                    <div
                        style={{
                            backgroundColor: "#ffffff",
                            padding: "30px",
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            maxWidth: "400px",
                            width: "100%",
                            textAlign: "center",
                        }}
                    >
                        <Image
                            src={userData.imageURL ||userData.Image ||"https://via.placeholder.com/150"}
                            roundedCircle
                            alt="Profile"
                            style={{ width: "100px", height: "100px", marginBottom: "10px" }}
                        />
                        {editMode ? (
                            <>
                                <input
                                    type="text"
                                    name="imageURL"
                                    value={formData.imageURL || ""}
                                    onChange={handleInputChange}
                                    placeholder="Image URL"
                                    style={inputStyle}
                                />
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username || ""}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                    style={inputStyle}
                                />
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age || ""}
                                    onChange={handleInputChange}
                                    placeholder="Age"
                                    style={inputStyle}
                                />
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city || ""}
                                    onChange={handleInputChange}
                                    placeholder="City"
                                    style={inputStyle}
                                />
                                <input
                                    type="text"
                                    name="number"
                                    value={formData.number || ""}
                                    onChange={handleInputChange}
                                    placeholder="Phone Number"
                                    style={inputStyle}
                                />
                                <select
                                    name="role"
                                    value={formData.role || ""}
                                    onChange={handleInputChange}
                                    style={inputStyle}
                                >
                                    <option value="" disabled>
                                        Select Role
                                    </option>
                                    <option value="donor">Donor</option>
                                    <option value="receiver">Receiver</option>
                                </select>

                                <button
                                    onClick={handleSave}
                                    style={{ ...buttonStyle, backgroundColor: "green" }}
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditMode(false)}
                                    style={{ ...buttonStyle, backgroundColor: "#961414" }}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <p>
                                    <b>Name:</b> {userData.username}
                                </p>
                                <p>
                                    <b>Email:</b> {userData.email}
                                    {localStorage.setItem("email",userData.email)}
                                </p>
                                <p>
                                    <b>Age:</b> {userData.age}
                                </p>
                                <p>
                                    <b>City:</b> {userData.city}
                                </p>
                                <p>
                                    <b>Phone Number:</b> {userData.number || "N/A"}
                                </p>
                                <p>
                                    <b>Role:</b> {userData.role}
                                </p>

                                <button
                                    onClick={() => setEditMode(true)}
                                    style={{ ...buttonStyle, backgroundColor: "#007bff" }}
                                >
                                    Edit Profile
                                </button>
                            </>
                        )}
                    </div>
                ) : (
                    <p>No user data available</p>
                )}
            </div>
        </>
    );
};

const inputStyle = {
    padding: "10px",
    margin: "10px 0",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "5px",
};

const buttonStyle = {
    margin: "10px",
    border: "none",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
};

export default FetchUserByEmail;
