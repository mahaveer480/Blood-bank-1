import React from 'react';
import { Link } from "react-router-dom";
import Navbar1 from './navbar';
import { motion } from 'framer-motion'; // Import framer-motion for animation
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './styles/setting.css'; // Import custom styles
import { auth } from './firebase';
import Footer from './Footer';
export default function Setting() {



const logout=()=>{

    auth.signOut()
    .then(() => {
        // Redirect to login page or any other page after logout
        window.location.href = "/";  // Or use react-router if set up
    })
    .catch((error) => {
        console.error("Error signing out: ", error);
    });

    localStorage.removeItem("bloodgroup")
    var name =localStorage.removeItem("name")
    var number1 =localStorage.removeItem("number")
    var age =localStorage.removeItem("age")
    var image =localStorage.removeItem("img")
    var city =localStorage.removeItem("city")

}
  return (
    <>
      <Navbar1 />
    <div className="settings-container">
      <motion.div 
        className="settings-link-container"
        whileHover={{ scale: 1.05 }} // Slightly scale up on hover
        transition={{ type: "spring", stiffness: 300 }} // Smooth spring effect
      >
        <Link to={"/delete"} className="settings-link">
          Delete Account
        </Link>
      </motion.div>

      <motion.div 
        className="settings-link-container"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Link to={"/forgot"} className="settings-link">
          Forget Password
        </Link>
      </motion.div>

      <motion.div 
        className="settings-link-container"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={logout}
      >
        <Link  className="settings-link">
          Logout
        </Link>
      </motion.div>
    </div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <Footer/>
    </>
  );
}
