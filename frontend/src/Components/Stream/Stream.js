import React, { useState } from "react";
import './Stream.css';
import axios from "axios";

const Stream = () => {
  const [stream, setStream] = useState("");
  const [branch, setBranch] = useState("");

  const handleStreamChange = (event) => {
    setStream(event.target.value);
  };

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };

  const handleBack = () => {
    window.location.href="/signup"
  };

  const handleSubmit = async () => {
    // ARUN USE IT
    // try {
    //   const response = await axios.post("http://localhost:9002/stream", {
    //     stream: stream,
    //     branch: branch,
    //   });
    //   console.log(response.data.message);
    // } catch (error) {
    //   console.error("Submission failed:", error);
    //   alert("Submission failed. Please try again later.");
    // }
    window.location.href="/instruction";
  };

  return (
    <div className="component">
      <h3>Before starting your test:</h3>
      <div className="dropdowns">
        <div className="dropdown">
          <label>Select your Stream</label>
          <select value={stream} onChange={handleStreamChange}>
            <option value="">Select Stream</option>
            <option value="m.tech">M.Tech</option>
            <option value="b.tech">B.Tech</option>
          </select>
        </div>
        <div className="dropdown">
          <label>Select your Branch</label>
          <select value={branch} onChange={handleBranchChange}>
            <option value="">Select Branch</option>
            <option value="CS">CS/IT</option>
            <option value="ECE">ECE</option>
            <option value="Civil">EEE</option>
            <option value="Mechanical">Mechanical</option>
          </select>
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
  );
};

export default Stream;