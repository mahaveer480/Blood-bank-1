import React, { useState, useEffect } from "react";
import { getAuth, deleteUser, onAuthStateChanged, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar1 from "../navbar";
const Delete = () => {
  const navigate=useNavigate()
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(""); 
  const auth = getAuth();

  useEffect(() => {
    const deleteee = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);  
      } else {
        setUser(null);  
      }
    });
    
    return deleteee; 
  }, [auth]);
  
  const delete1 = () => {
    if (user) {
      if (password === "") {
        alert("Please enter your password to proceed.");
        return;
      }
      const credential = EmailAuthProvider.credential(user.email, password);
      reauthenticateWithCredential(user, credential)
      .then(() => {
        deleteUser(user)
        .then(() => {
          alert("User successfully deleted!");
          navigate("/")
        })
        .catch((error) => {
          alert("Error deleting user: " + error.message);
        });
      })
      .catch((error) => {
        alert("Re-authentication failed: " + error.message);
      });
    } else {
      alert("No user is signed in.");
    }
  };
  
  if (user !== null && user !== undefined) {
    (localStorage.setItem('user',user.email))
}
if(user){

}else{
localStorage.removeItem("user")


}


const accountDeleted=()=>{
  <Link to={"/"} />
}

    return (
      <>
      {/*  */}
  <Navbar1/>
      {user ? (
        <div style={{width:"60%",margin:"2% 22%",padding:"50px",border:"1px solid red",borderRadius:"5px"}}>
          <h1 style={{display:"flex"}}>Welcome, {user.email}</h1>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
      <Link to={"/home"}><button style={{border:"none",background:"gray", borderRadius:"5px", margin:"5px"}}>cancel</button></Link>
          <button onClick={delete1} style={{border:"none",background:"gray", borderRadius:"5px"}}>Delete Account</button>
        </div>
      ) : (
        <div>
          <h1>Please sign in to delete your account.</h1>
          <Link to="/signup"><button style={{border:"none",background:"gray", borderRadius:"5px"}}>login</button></Link>
          {accountDeleted()}

        </div>
      )}
    </>
  );
};

export default Delete;
