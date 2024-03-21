// Navbar.js

import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import "./Navbar.css"; // Import the CSS file for styling
// import profilePic from "./profile-pic.png"; 
import logo from '../../Assets/logout.png';

const Navbar = ({ onLogout }) => {
  
const navigate = useNavigate();

const handleLogout = () => {
  navigate('/');
}
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span><b>Welcome, Admin!</b></span>
      </div>
      <div className="navbar-right">
      {/* <img src={profilePic} alt="Profile" className="profile-pic" /> */}
      <span className="profile-pic">&#128100;</span>
      <button className="icon-button" aria-label="Logout" onClick={handleLogout}>
            <img src={logo} />
          </button>
      </div>
    </nav>
  );
};

export default Navbar;