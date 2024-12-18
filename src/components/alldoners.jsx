import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import deleteDuplicates from "./deleteDuplicates";

  export default function Alldoners() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const deleteduplicate = () => {
    const collectionName = "Doners"; 
    const fieldsToCheck = ["email"];

    deleteDuplicates(collectionName, fieldsToCheck);
  };


  deleteduplicate()


  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Doners"));
        const donorList = [];
        querySnapshot.forEach((doc) => {
          donorList.push({ id: doc.id, ...doc.data() });
        });
        setDonors(donorList);
      } catch (error) {
        console.error("Error fetching donors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  return (
      <div style={styles.container}>
      <h1 style={styles.title}>Avalable Donors</h1>
      {loading ? (
        <p style={styles.loadingText}>Loading donors...</p>
      ) : donors.length > 0 ? (
        <div style={styles.cardsContainer}>
          {donors.map((donor) => (
            <div key={donor.id} style={styles.card}>
              <img
                src={donor.imageURL ||donor.image|| "data:image/jpeg;base64,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"}
                alt={`${donor.name}'s profile`}
                style={styles.profileImage}
              />
              <h3>{donor.name}</h3>
              <h4>Blood Group: {donor.bloodGroup}</h4>
              <h5>City: {donor.city}</h5>
              <p>Age: {donor.age}</p>
              <p>Number: {donor.number}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noDataText}>No donors found.</p>
      )}
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
    transition: "transform 0.3s",
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "10px",
    objectFit: "cover",
  },
};
