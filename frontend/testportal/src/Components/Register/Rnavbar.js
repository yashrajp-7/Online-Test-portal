import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo2 from '../../Assets/whirpool7915.jpg';
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import "./Rnavbar.css"; // Import the CSS file for styling


const Rnavbar = ({ onLogout }) => {
 
const navigate = useNavigate();


  return (
    <nav className="navbar1">
      <div className="navbar-left1">
      <img  style={{height:"20%",width:"20%",padding:"5px",}} src={logo2} />
      </div>
      <div className="navbar-left1"style={{marginLeft:"-90%"}}>
       
        <span><b>e<span className="letterY">S</span>pace- Intern</b></span>
      </div>
      <div className="navbar-right1">
      {/* <img src={profilePic} alt="Profile" className="profile-pic" /> */}
      {/* <button className="icon-button" aria-label="Home" onClick={toHome}>
            <img src={home} />
          </button> */}
      </div>
    </nav>
  );
};


export default Rnavbar;
