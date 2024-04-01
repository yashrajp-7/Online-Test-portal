// import React, { useState, useEffect } from "react";
// import { useNavigate, NavLink } from "react-router-dom";
// import './Instruction.css'
// import { useRestrictCopyPaste } from "../Copy_Paste.ts"
// import logo from '../../Assets/whirpool7915.jpg';


// const Instruction = ({ setUserState }) => {
//   const [showResult,setShowResult]=useState(false);
  
//   const navigate = useNavigate();
//   const navigateTest = () => {
//     setShowResult(true)
//   };
//   useEffect(()=>{
//     if(localStorage.getItem("tempid")===null || localStorage.getItem("test_taken")==="true")
//     {
//       window.location.href="/"
//     }
//   })
//   useRestrictCopyPaste({window, actions:["copy","cut","paste"]});

//   return (
//     <div className='instruction' style={{width:"100%"}}>
//       <img  style={{height:"150px",width:"280px"}} src={logo} />
//       <div className='list'>
//         <ul>
//         <h3>Instructions to follow: </h3>
//         <li>Read the questions carefully and answer from the multiple choice given</li>
//         <li>Tab switching is prohibited</li>
//         <li>Copy/Paste is prohibited</li>
//         <li>No cell phones or other secondary devices in the room or test area</li>
//         <li>Answering every question is mandatory</li>
//         <li>Kindly ensure you submit the test once completed.</li>
//         <li>The examination will comprise of Objective type <strong>Multiple Choice Questions (MCQs)</strong></li>
//         <li>Test time /Duration is <strong>30mins</strong> - post 30mins the link will expire</li>
//         <li>No Negative marking</li>
//         <li><strong>The clock timer will start once you click on "Start test!"</strong></li>
//         <li>All the best </li>
//         </ul>
//         <div>
//         <button className="buttonins" onClick={navigateTest}>Start test!</button>
//         </div>
        
//       </div>
//       {showResult && <div className="result">{
//   "Do you want to start the test ?"
//   }
//   <br/>
//   <button onClick={()=>{window.location.href="/quiz"}}>Yes</button>
//   <button onClick={()=>{setShowResult(false)}}>No</button>
//   </div>}
//     </div>
//   )
// }

// // window.onblur = function () { 
// //   alert('Tab switching is prohibited!');
// // }; 


// export default Instruction;

import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import './Instruction.css'
import { useRestrictCopyPaste } from "../Copy_Paste.ts"
import logo from '../../Assets/whirpool7915.jpg';
import Inavbar from "./Inavbar";


const Instruction = ({ setUserState }) => {
  const [showResult,setShowResult]=useState(false);
  
  const navigate = useNavigate();
  const navigateTest = () => {
    setShowResult(true)
  };
  useEffect(()=>{
    if(localStorage.getItem("tempid")===null || localStorage.getItem("test_taken")==="true")
    {
      window.location.href="/"
    }
  })
  useRestrictCopyPaste({window, actions:["copy","cut","paste"]});

  return (
    <div className='instruction' style={{width:"100%"}}>
      <Inavbar/>
      <div className='list'>
        <ul>
        <h3>Instructions to follow: </h3>
        <li>Read the questions carefully and answer from the multiple choice given</li>
        <li>Tab switching is prohibited</li>
        <li>Copy/Paste is prohibited</li>
        <li>No cell phones or other secondary devices in the room or test area</li>
        <li>Answering every question is mandatory</li>
        <li>Kindly ensure you submit the test once completed.</li>
        <li>The examination will comprise of Objective type <strong>Multiple Choice Questions (MCQs)</strong></li>
        <li>Test time /Duration is <strong>30mins</strong> - post 30mins the link will expire</li>
        <li>No Negative marking</li>
        <li><strong>The clock timer will start once you click on "Start test!"</strong></li>
        <li>All the best </li>
        </ul>
        <div>
        <button className="buttonins" onClick={navigateTest}>Start test!</button>
        </div>
        
      </div>
      {showResult && <div className="result">{
  "Do you want to start the test ?"
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