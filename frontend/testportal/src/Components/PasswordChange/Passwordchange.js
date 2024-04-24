// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../Admin/Navbar";
// import "./Passwordchange.css";
// const PasswordChangePage = () => {
//   const [currentTempId, setCurrentTempId] = useState("");
//   const [newTempId, setNewTempId] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   useEffect(()=>{
//     if(localStorage.getItem("loginemail")===null)
//     {
//       window.location.href="/adminlogin"
//     }
//   })
//   useEffect(async()=>{
//     try{
//       const response = await axios.get("http://127.0.0.1:8000/login/showpass/");
//       setCurrentTempId(response.data.message.tempID);
//       setCurrentPassword(response.data.message.password);
//     }
//     catch(error)
//     {
//       console.error("Error:", error);
//     }
//   },[]);
//   const handleSave = async () => {
//     try {
//       if(newPassword==="" || newTempId==="")
//       {
//         alert("Both TempID and Password are required!!!");
//       }
//       else{
//         const formData=new FormData();
//         formData.append('tempid',currentTempId)
//         formData.append('newtempid',newTempId)
//         formData.append('newpassword',newPassword)
//       const response = await axios.post("http://127.0.0.1:8000/login/changepass/", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
        
//       });
//       alert(response.data.message);

//       setNewTempId("");
//       setNewPassword("");
//       window.location.reload();
//       }
//     } catch (error) {
//       console.error("Error changing password:", error);
//       alert("Failed to change password. Please try again later.");
//     }
//   };

//   return (
//     <div style={{ width: "100%",height:"100%"}}>
//         <Navbar /> 
//       <div className={"container"}>
//         <div className={"admin"}>
//           <h2> Change Credential</h2>
//           <div className="gridContainer">
//             <div className="leftSide">
          
//           <div className="input-field">
//             <label className={"labelpass"}>Current TempID</label>
//             <br></br>
//             <p>{currentTempId}</p><br>
//             </br>
//             <label className={"labelpass"}>New TempID</label>
//             <br>
//             </br>
//             <input type="text" placeholder="New Temp ID" value={newTempId} onChange={(e) => setNewTempId(e.target.value)} required /><br></br>
//           </div>
//           </div>
//           <div className="leftSide">
//           <div className="input-field">
//           <label  className={"labelpass"}>Current Password</label><br></br>
//             <p>{currentPassword}</p><br></br>
//             <label  className={"labelpass"}>New Password</label><br></br>
//             <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
//           </div>
//           </div>
//           </div>
//           <button className={"button_common"} onClick={handleSave}>Save</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PasswordChangePage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../Admin/Navbar";
// import "./Passwordchange.css";
// const PasswordChangePage = () => {
//   const [currentTempId, setCurrentTempId] = useState("");
//   const [newTempId, setNewTempId] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   useEffect(()=>{
//     if(localStorage.getItem("loginemail")===null)
//     {
//       window.location.href="/adminlogin"
//     }
//   })
//   useEffect(async()=>{
//     try{
//       const response = await axios.get("http://127.0.0.1:8000/login/showpass/");
//       setCurrentTempId(response.data.message.tempID);
//       setCurrentPassword(response.data.message.password);
//     }
//     catch(error)
//     {
//       console.error("Error:", error);
//     }
//   },[]);
//   const handleSave = async () => {
//     try {
//       if(newPassword==="" || newTempId==="")
//       {
//         alert("Both TempID and Password are required!!!");
//       }
//       else{
//         const formData=new FormData();
//         formData.append('tempid',currentTempId)
//         formData.append('newtempid',newTempId)
//         formData.append('newpassword',newPassword)
//       const response = await axios.post("http://127.0.0.1:8000/login/changepass/", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
        
//       });
//       alert(response.data.message);

//       setNewTempId("");
//       setNewPassword("");
//       window.location.reload();
//       }
//     } catch (error) {
//       console.error("Error changing password:", error);
//       alert("Failed to change password. Please try again later.");
//     }
//   };

//   return (
//     <div style={{ width: "100%",height:"100%"}}>
//         <Navbar /> 
//       <div className={"container"}>
//         <div className={"admin"}>
//           <h2> Change Credential</h2>
//           <div className="gridContainer">
//             <div className="leftSide">
          
//           <div className="input-field">
//             <label className={"labelpass"}>Current TempID</label>
//             <br></br>
//             <p>{currentTempId}</p><br>
//             </br>
//             <label className={"labelpass"}>New TempID</label>
//             <br>
//             </br>
//             <input type="text" placeholder="New Temp ID" value={newTempId} onChange={(e) => setNewTempId(e.target.value)} required /><br></br>
//           </div>
//           </div>
//           <div className="leftSide">
//           <div className="input-field">
//           <label  className={"labelpass"}>Current Password</label><br></br>
//             <p>{currentPassword}</p><br></br>
//             <label  className={"labelpass"}>New Password</label><br></br>
//             <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
//           </div>
//           </div>
//           </div>
//           <button className={"button_common"} onClick={handleSave}>Save</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PasswordChangePage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Admin/Navbar";
import "./Passwordchange.css";
import Pmenu from "./Pmenu";
const PasswordChangePage = () => {
  const [currentTempId, setCurrentTempId] = useState("");
  const [newTempId, setNewTempId] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  useEffect(()=>{
    if(localStorage.getItem("loginemail")===null)
    {
      window.location.href="/adminlogin"
    }
  })
  useEffect(async()=>{
    try{
      const response = await axios.get("https://arun2024.pythonanywhere.com/login/showpass/");
      setCurrentTempId(response.data.message.tempID);
      setCurrentPassword(response.data.message.password);
    }
    catch(error)
    {
      console.error("Error:", error);
    }
  },[]);
  const handleSave = async () => {
    try {
      if(newPassword==="" || newTempId==="")
      {
        alert("Both TempID and Password are required!!!");
      }
      else{
        const formData=new FormData();
        formData.append('tempid',currentTempId)
        formData.append('newtempid',newTempId)
        formData.append('newpassword',newPassword)
      const response = await axios.post("https://arun2024.pythonanywhere.com/login/changepass/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        
      });
      alert(response.data.message);

      setNewTempId("");
      setNewPassword("");
      window.location.reload();
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password. Please try again later.");
    }
  };

  return (
    <div style={{ width: "100%",height:"100%",backgroundColor:"#f5f5f5"}}>
        <Navbar /> 
        <Pmenu/>
      <div className={"container"}  >
        <div className={"admin"}>
          <h2> Change Credential</h2>
          <div className="gridContainer">
            <div className="leftSide">
          
          <div className="input-field">
            <label className={"labelpass"}>Current TempID</label>
            <br></br>
            <p>{currentTempId}</p><br>
            </br>
            <label className={"labelpass"}>New TempID</label>
            <br>
            </br>
            <input type="text" placeholder="New Temp ID" value={newTempId} onChange={(e) => setNewTempId(e.target.value)} required /><br></br>
          </div>
          </div>
          <div className="leftSide">
          <div className="input-field">
          <label  className={"labelpass"}>Current Password</label><br></br>
            <p>{currentPassword}</p><br></br>
            <label  className={"labelpass"}>New Password</label><br></br>
            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>
          </div>
          </div>
          <button className={"button_common4"} onClick={handleSave}>Save</button>
        </div>
      </div>
   </div>
  );
};

export default PasswordChangePage;