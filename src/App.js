
import React, { Profiler, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Signup from './components/signup';
import Login from './components/login';
import Navbar1 from './components/navbar';
import Forgot from './components/forgotpassword';
import Delete from './components/styles/delete';
import Upload from './components/upload';
import { motion } from 'framer-motion';
import Profile from './components/profile';
import Doners from './components/doners';
import Alldoners from './components/alldoners';
import Become_a_doner from './components/Become_a_doner';
import Setting from './components/setting';
function App() {


  return (
    <>






      <Router>
    
      <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/home" element={<Home />} />
    <Route path="/delete" element={<Delete />} />
    <Route path="/forgot" element={<Forgot />} />
    <Route path="/upload" element={<Upload />} />
    <Route path="/profile" element={<Profile/>} />
    <Route path="/doners" element={<Doners/>} />
    <Route path="/Become_a_doner" element={<Become_a_doner/>} />
    <Route path="/Setting" element={<Setting/>} />


  </Routes>
</Router>

    

      
      {/* <Upload /> */}
    </>
  );
}

export default App;
