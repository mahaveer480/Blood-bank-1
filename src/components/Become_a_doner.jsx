// import React, { useState, useEffect } from "react";
// import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
// import Navbar1 from "./navbar";
// import { auth } from "./firebase";
// import { db } from "./firebase";
// import { useNavigate } from "react-router-dom";
// import "./styles/home.css";
// import Dropdown from "react-bootstrap/Dropdown";
// import SplitButton from "react-bootstrap/SplitButton";
// import bgimage from "./styles/e9738bed-eab3-467f-aaaa-b6772153df37.webp";

// const Upload = () => {
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentUserData, setCurrentUserData] = useState(null);
//   const navigate = useNavigate();

//   const currentUserEmail = auth.currentUser?.email || "mahaveer34@gmail.com";

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!currentUserEmail) {
//         setMessage("No user email found. Please log in again.");
//         return;
//       }

//       try {
//         const q = query(collection(db, "users"), where("email", "==", currentUserEmail));
//         const querySnapshot = await getDocs(q);

//         if (!querySnapshot.empty) {
//           const userData = querySnapshot.docs[0].data();
//           setCurrentUserData(userData);
//         } else {
//           setMessage("User not found. Please register.");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error.message);
//         setMessage("Failed to fetch user data. Please try again later.");
//       }
//     };

//     fetchUserData();
//   }, [currentUserEmail]);

//   const handleAddUser = async () => {
//     if (!bloodGroup) {
//       setMessage("Please select your blood group.");
//       return;
//     }

//     if (!currentUserData) {
//       setMessage("User data is not available. Please log in again.");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await addDoc(collection(db, "Doners"), {
//         bloodGroup,
//         ...currentUserData,
//       });

//       setMessage("Your information has been submitted successfully!");
//       setTimeout(() => navigate("/home"), 2000);
//     } catch (e) {
//       setMessage(`Error adding user: ${e.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar1 />
//       <div style={styles.container}>
//         <h1 style={styles.header}>Welcome to the Blood Bank</h1>
//         <h3 style={styles.subHeader}>Your one decision can save someone's life</h3>
//         <p style={styles.paragraph}>
//           Every donation counts! Your selfless contribution could be the difference
//           between life and death for someone in need. Join us today and help us make
//           a difference in the world.
//         </p>

//         <div style={styles.buttonContainer}>
//           <button
//             style={styles.donorButton}
//             onClick={handleAddUser}
//             disabled={!currentUserData || isLoading}
//           >
//             {isLoading ? "Submitting..." : "Become a Donor"}
//           </button>
//         </div>

//         <div style={{ display: "block" }}>
//           <SplitButton variant="danger" title={bloodGroup || "Select Blood Group"}>
//             {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
//               <Dropdown.Item key={group} onClick={() => setBloodGroup(group)}>
//                 {group}
//               </Dropdown.Item>
//             ))}
//           </SplitButton>
//         </div>

//         {message && <p style={styles.message}>{message}</p>}
//       </div>
//     </>
//   );
// };

// const styles = {
//   container: {
//     margin: "0 0",
//     padding: "20px",
//     maxWidth: "100%",
//     textAlign: "center",
//     fontFamily: "'Roboto', sans-serif",
//     backgroundImage: `url(${bgimage})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     height: "100vh",
//     width: "100%",
//   },
//   header: {
//     fontSize: "36px",
//     color: "#2F4F4F",
//     marginBottom: "10px",
//   },
//   subHeader: {
//     fontSize: "20px",
//     color: "#6A5ACD",
//     marginBottom: "20px",
//   },
//   paragraph: {
//     fontSize: "16px",
//     color: "#555",
//     marginBottom: "40px",
//     lineHeight: "1.6",
//     textAlign: "justify",
//   },
//   buttonContainer: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "20px",
//     marginBottom: "20px",
//   },
//   donorButton: {
//     width: "200px",
//     height: "50px",
//     backgroundColor: "#4CAF50",
//     color: "#fff",
//     fontSize: "18px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     transition: "background-color 0.3s",
//   },
//   message: {
//     marginTop: "20px",
//     color: "#008000",
//     fontSize: "18px",
//     fontWeight: "bold",
//   },
// };

// export default Upload;
