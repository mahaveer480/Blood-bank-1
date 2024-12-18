import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Firebase config

const Numberofbloodgroups = () => {
  const [bloodGroupCounts, setBloodGroupCounts] = useState({});

  // Fetch blood group counts from Firestore
  const fetchBloodGroupCounts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Doners"));  // "black" collection stores donor data
      const counts = {
        "A+": 0,
        "A-": 0,
        "B+": 0,
        "B-": 0,
        "O+": 0,
        "O-": 0,
        "AB+": 0,
        "AB-": 0
      };

      querySnapshot.forEach((doc) => {
        const donorData = doc.data();
        if (donorData.bloodGroup) {
          counts[donorData.bloodGroup]++;
        }
      });

      setBloodGroupCounts(counts);
    } catch (error) {
      console.error("Error fetching blood group counts: ", error);
    }
  };

  // Fetch blood group counts when the component mounts
  useEffect(() => {
    fetchBloodGroupCounts();
  }, []);

  // React Spring Animation for smooth transitions
  

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: '20px',
  };

  const listStyle = {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  };

  const listItemStyle = {
    fontSize: '1.2rem',
    color: '#333',
    margin: '10px 0',
    padding: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
  };

  return (
     
        <div style={containerStyle}>
          <h3 style={titleStyle}>Available Blood Groups</h3>
          <ul style={listStyle}>
            {Object.entries(bloodGroupCounts).map(([group, count]) => (
              <li key={group} style={listItemStyle}>
                <strong>{group}:</strong> {count} donor{count !== 1 ? "s" : ""}
              </li>
            ))}
          </ul>
        </div>
      
      
  );
};

export default Numberofbloodgroups;
