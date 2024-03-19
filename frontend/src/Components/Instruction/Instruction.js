import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import './Instruction.css'
import { useRestrictCopyPaste } from "../Copy_Paste.ts"



const Instruction = ({ setUserState }) => {
  const [showResult,setShowResult]=useState(false);
  
  const navigate = useNavigate();
  const navigateTest = () => {
    setShowResult(true)
  };

  useRestrictCopyPaste({window, actions:["copy","cut","paste"]});

  return (
    <div className='instruction'>
      <div className='list'>
        <ul>
        <h3>Instructions to follow: </h3>
        <li>Tab switching is prohibited</li>
        <li>Copy/Paste is prohibited</li>
        <li>No cell phones or other secondary devices in the room or test area</li>
        <li>No one else can be in the room with you</li>
        <li>No dual screens/monitors</li>
        <li>The examination will comprise of Objective type <strong>Multiple Choice Questions (MCQs)</strong></li>
        <li>The time duration of the test is <strong>60 minutes</strong></li>
        <li>All questions are compulsory and each carries 1 mark</li>
        <li><strong>The clock timer will start once you click on "Start test!"</strong></li>
        </ul>
        <div>
        <button className="buttonins" onClick={navigateTest}>Start test!</button>
        </div>
        
      </div>
      {showResult && <div className="result">{
  "Do you want to Submit the Test ?"
  }
  <br/>
  <button onClick={()=>{window.location.href="/quiz"}}>Yes</button>
  <button onClick={()=>{setShowResult(false)}}>No</button>
  </div>}
    </div>
  )
}

// window.onblur = function () { 
//   alert('Tab switching is prohibited!');
// }; 


export default Instruction;