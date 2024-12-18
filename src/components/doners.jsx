import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import Navbar1 from "./navbar";
// import Footer from "./footer";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");

  // Fetch the blood group from localStorage
  const bloodgrp = localStorage.getItem("bloodgroup") || "";

  // Blood compatibility map
  const bloodCompatibility = {
    "A+": ["A+", "AB+"],
    "A-": ["A+", "A-", "AB+", "AB-"],
    "B+": ["B+", "AB+"],
    "B-": ["B+", "B-", "AB+", "AB-"],
    "AB+": ["AB+"], // Universal receiver
    "AB-": ["AB+", "AB-"],
    "O+": ["O+", "A+", "B+", "AB+"],
    "O-": ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"], // Universal donor
  };

  const fetchUsers = async () => {
    if (city === "") {
      alert("Please fill something in city.");
      return;
    }

    if (bloodgrp === "") {
      alert("Blood group is not set. Please try again.");
      return;
    }

    // Get compatible blood groups
    const compatibleGroups = bloodCompatibility[bloodgrp] || [];

    if (compatibleGroups.length === 0) {
      alert("No compatible blood groups found.");
      return;
    }

    setLoading(true);

    try {
      // Firestore query to get users based on city and blood group compatibility
      const q = query(
        collection(db, "Doners"),
        where("city", "==", city),
        where("bloodGroup", "in", compatibleGroups)
      );

      const querySnapshot = await getDocs(q);
      const usersList = [];

      querySnapshot.forEach((doc) => {
        const newUser = { id: doc.id, ...doc.data() };
        // Check if user already exists by their ID
        if (!usersList.some((user) => user.id === newUser.id)) {
          usersList.push(newUser);
        }
      });

      setUsers(usersList); // Set the users state to the filtered list
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("An error occurred while fetching users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar1 />
      <h1 style={styles.title}>Available Donors</h1>
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={styles.input}
      />
      <button onClick={fetchUsers} style={styles.button}>
        Submit
      </button>

      {loading ? (
        <p style={styles.loadingText}>Loading users...</p>
      ) : users.length > 0 ? (
        <div style={styles.cardsContainer}>
          {users.map((user) => (
            <div key={user.id} style={styles.card}>
              <img
                src={
                 user.imageURL|| user.image ||
                  "data:image/jpeg;base64,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"
                }
                alt={`${user.name}'s profile`}
                style={styles.profileImage}
              />
              <h3>{user.name}</h3>
              <h4>Blood Group: {user.bloodGroup}</h4>
              <h5>City: {user.city}</h5>
              <p>Age: {user.age}</p>
              <p>Number: {user.number}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noDataText}>No users found.</p>
      )}


<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />


    {/* <Footer/> */}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Roboto', sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  input: {
    display: "block",
    width: "300px",
    padding: "10px",
    margin: "10px auto",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    display: "block",
    width: "100px",
    padding: "10px",
    margin: "10px auto",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  loadingText: {
    textAlign: "center",
    color: "#555",
  },
  noDataText: {
    textAlign: "center",
    color: "#999",
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    width: "300px",
    padding: "20px",
    background: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    textAlign: "center",
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "10px",
    objectFit: "cover",
  },
};
