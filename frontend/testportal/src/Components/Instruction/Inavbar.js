import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo2 from '../../Assets/whirpool7915.jpg';
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import "./Inavbar.css"; // Import the CSS file for styling


const Inavbar = ({ onLogout }) => {
 
const navigate = useNavigate();


  return (
    <nav className="navbar2">
      <div className="navbar-left4">
      <img  style={{height:"20%",width:"20%",padding:"5px"}} src={logo2} />
      </div>
      <div className="navbar-left4"style={{marginLeft:"-90%"}}>
      <span><b>e<span className="letterY">S</span>pace- Intern</b></span>
      </div>
      <div className="navbar-right4">
      
      <span className="profile-pic4">&#128100;</span>
      <b>{localStorage.getItem('name')}</b>
    
      </div>
    </nav>
  );
};


export default Inavbar;