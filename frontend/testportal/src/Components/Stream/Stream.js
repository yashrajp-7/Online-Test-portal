import React, { useState,useEffect } from "react";
import './Stream.css';
import axios from "axios";

const Stream = () => {
  const [teststream, setStream] = useState("");
  const [testbranch, setBranch] = useState("");
  const [resume, setResume] = useState(null);
  const handleStreamChange = (event) => {
    setStream(event.target.value);
  };
  useEffect(()=>{
    if(localStorage.getItem("signup")==="done")
    {
      window.location.href="/instruction"
    }
  })
  useEffect(()=>{
    if(localStorage.getItem("loginemail")===null || localStorage.getItem("test_taken")==="true")
    {
      window.location.href="/"
    }
  })
  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };

  const handleBack = () => {
    window.location.href="/signup"
  };
  const changeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
    
    console.log('Uploading resume...', file);
  };
  const handleSubmit = () => {
    if(teststream==="")
    {
      alert("Select Your Stream")
    }else if(testbranch==="")
    {
      alert("Select Your Branch")
    }else if(resume.cv===null)
    {
      alert("Enter Your Resume")
    }
    else{
      localStorage.setItem('testbranch',testbranch);
      localStorage.setItem('teststream',teststream);
      const formData = new FormData();
    
    
    formData.append('resume', resume);
    formData.append('name',localStorage.getItem("name"));
    formData.append('college_name',localStorage.getItem("college") );
    formData.append('branch', localStorage.getItem("branch"));
    formData.append('email', localStorage.getItem("email"));
    formData.append('gender', localStorage.getItem("gender"));
    formData.append('gender', localStorage.getItem("gender"));
    formData.append('highestdegree', localStorage.getItem("degree"));
    formData.append('phone_no', localStorage.getItem("phone"));
    formData.append('SFID', localStorage.getItem("sfid"));
    formData.append('degree', testbranch);
    formData.append('stream', teststream);
    
    
    axios.post('http://127.0.0.1:8000/signup/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      
    })
      .then(response => {
        console.log(response.data.message);
        localStorage.setItem("signup","done");
        window.location.href="/instruction";
        })
        .catch(error => {console.error( error)
        alert("Email ID already registered!!!")});
    }
    
  };

  return (
    <div className="outer">
    <div className="component">
      <h3>Before starting your test:</h3>
      <div className="dropdowns">
        <div className="dropdown">
          <label>Select your Stream</label>
          <select value={teststream} onChange={handleStreamChange}>
            <option value="">Select Stream</option>
            <option value="M.Tech">M.Tech</option>
            <option value="B.Tech">B.Tech</option>
          </select>
        </div>
        <div className="dropdown">
          <label>Select your Branch</label>
          <select value={testbranch} onChange={handleBranchChange}>
            <option value="">Select Branch</option>
            <option value="Computer Science/Information Technology">CS/IT</option>
            <option value="Electrical and Communication">ECE</option>
            <option value="Electrical and Electronics">EEE</option>
            <option value="Mechanical">Mechanical</option>
          </select>
        </div>
        <div className="fileuppload">
        <label>CV/Resume:</label>
              <input
                type="file"
                name="cv"
                id="cv"
                onChange={changeHandler}
                accept=".pdf,.doc,.docx"
              />
        </div>
      </div>
      <div className="buttons">
        <button className="back-button" onClick={handleBack}>
        <span>&larr;</span> Personal Details
        </button>
        <button className="submit-button" onClick={handleSubmit}>
          Confirm   <span>&rarr;</span>
        </button>
      </div>
    </div>
    </div>
  );
};

export default Stream;