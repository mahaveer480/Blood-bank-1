import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import Navbar1 from "./navbar";
import { db, auth } from "./firebase"; // Ensure auth is imported
import { useNavigate } from "react-router-dom";
import { query, where, getDocs } from "firebase/firestore";
import "./styles/home.css";
import Dropdown from "react-bootstrap/Dropdown";
import SplitButton from "react-bootstrap/SplitButton";
import bgimage from "./styles/e9738bed-eab3-467f-aaaa-b6772153df37.webp";
import Footer from "./Footer";
import Alldoners from "./alldoners";
import Numberofbloodgroups from "./numberofbloodgroups";
import { getAuth } from "firebase/auth";

const Upload = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setUserData] = useState(null); // For storing user's email
  const navigate = useNavigate();

  // Retrieve data from localStorage
  const name = localStorage.getItem("name");
  const number = localStorage.getItem("number");
  const age = localStorage.getItem("age");
  const image = localStorage.getItem("img");
  const city = localStorage.getItem("city");
  // const role = localStorage.getItem("role");
  localStorage.setItem("bloodgroup",bloodGroup)

  // Fetch current user's email when the component mounts
  useEffect(() => {
    const user = auth.currentUser; // Firebase Auth current user
    if (user) {
      setUserData(user.email); // Safely set email if user is logged in
    }
  }, []);

const addnewusertobecomedoners = async () => {
  if (!bloodGroup) {
    setMessage("Please select your blood group.");
    return;
  }

  setIsLoading(true); // Start loading

  try {
    // Get role from localStorage
    const userRole = JSON.parse(localStorage.getItem("userData"))||"visiter";

    if (!userRole) {
      setMessage("User role not found. Please log in.");
      setIsLoading(false);
      return;
    }

    // Check if user's role is not allowed
    if (userRole === "visitor" || userRole === "receiver") {
      setMessage("You are not allowed to register as a donor.");
      setIsLoading(false);
      return;
    }

    // Get current user's email from Firebase Authentication
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser || !currentUser.email) {
      setMessage("No authenticated user found. Please log in.");
      setIsLoading(false);
      return;
    }

    const email = currentUser.email;

    // Check if email already exists in the "Doners" collection
    const donorCheckQuery = query(collection(db, "Doners"), where("email", "==", email));
    const donorCheckSnapshot = await getDocs(donorCheckQuery);

    if (!donorCheckSnapshot.empty) {
      setMessage("You have already donated blood.");
      setIsLoading(false);
      return;
    }

    // Add new donor if email does not exist
    await addDoc(collection(db, "Doners"), {
      bloodGroup,
      name,
      number,
      age,
      image: image || "", // Optional field
      city,
      email,
    });

    // Success message and navigate to home page
    setMessage("Your information has been submitted successfully!");
    setTimeout(() => navigate("/home"), 2000); // Delay for message display
  } catch (e) {
    setMessage(`Error adding user: ${e.message}`);
  } finally {
    setIsLoading(false); // Stop loading
  }
};
  
  

  return (
    <>
      <Navbar1 />
      <div style={styles.container}>
        <h1 style={styles.header}>Welcome to the Blood Bank</h1>
        <h3 style={styles.subHeader}>Your one decision can save someone's life</h3>
        <p style={styles.paragraph}>
          Every donation counts! Your selfless contribution could be the difference
          between life and death for someone in need. Join us today and help us make
          a difference in the world.
        </p>

        <div style={styles.buttonContainer}>
          <button style={styles.donorButton} onClick={addnewusertobecomedoners}>
            Become a Donor
          </button>
<button style={styles.donorButton} onClick={()=>{
   if (bloodGroup !== "") {
    navigate("/doners")
   }
    else if(bloodGroup===""){

setMessage("please select blood group")

    }
}}>
find doners
</button>

        </div>

        <div style={{ display: "block" }}>
          <SplitButton variant="danger" title={bloodGroup || "Blood"}>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
              <Dropdown.Item key={group} onClick={() => {setBloodGroup(group)} }>
                {group}
              </Dropdown.Item>
            ))}
          </SplitButton>
        </div>

        {isLoading ? (
          <p style={styles.message}>Please wait, submitting...</p>
        ) : (
          message && <p style={styles.message}>{message}</p>
        )}
      </div>

<Numberofbloodgroups/>
<Alldoners/>

<Footer/>

    </>
  );
};
const styles = {
  container: {
    margin: "0 0",
    padding: "20px",
    maxWidth: "100%",
    textAlign: "center",
    fontFamily: "'Roboto', sans-serif",
    backgroundImage: `url(${bgimage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100%",
  },
  header: {
    fontSize: "36px",
    color: "#2F4F4F",
    marginBottom: "10px",
  },
  subHeader: {
    fontSize: "20px",
    color: "#6A5ACD",
    marginBottom: "20px",
  },
  paragraph: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "40px",
    lineHeight: "1.6",
    textAlign: "justify",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  donorButton: {
    width: "200px",
    height: "50px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontSize: "18px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  message: {
    marginTop: "20px",
    color: "#961414",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default Upload;