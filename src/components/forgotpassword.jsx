

import React from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Navbar1 from "./navbar";


const forgot=()=>{
var email="ramanimahaveer4@gmail.com"



const  send=()=>{
   const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
alert("fucked")
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
console.log(errorMessage)
    });

    }


return(
<>
<Navbar1/>
<h1>forgotpassword</h1>
<button className="forget" onClick={send}>sendemail</button>


</>

)



}

export default forgot
