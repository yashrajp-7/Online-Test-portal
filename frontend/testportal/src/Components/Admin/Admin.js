


import React, { useState,useEffect } from "react";
// import basestyle from "../Base.module.css";
import "./Admin.css";
import Navbar from "./Navbar";
import axios from "axios";


const Admin = () => {
  const [questionsFile, setQuestionsFile] = useState(null);
  const [filenamequestion,setfilenamequestion]=useState("");
  const[loading,setloading]=useState("false");

  useEffect(()=>{
    if(localStorage.getItem("loginemail")===null)
    {
      window.location.href="/adminlogin"
    }
  })
  const handleQuestionsUpload = (e) => {
    const file = e.target.files[0];
    setQuestionsFile(file);
    setfilenamequestion(e.target.files[0].name);
  };
  const handleSave = ()=>
  {
    if(questionsFile === null)
    {
      alert("File Compulsory for saving!!!")
    }
    else{
      setloading("true");
      handleSave2();
    }

  };
  const handleSave2 =  () => {
    
      // Send user data and questions files to the backend for processing
      const formData = new FormData();
      formData.append("question", questionsFile,"question.xlsx");
      axios.post("http://127.0.0.1:8000/login/home/", formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        
      }).then(response => {alert(response.data.message);
        setloading("false");})
        .catch (error=>{
          setloading("false")
      console.error("Error uploading files:", error);
      alert("Failed to upload files. Please try again later.");
        }) 
      
  };
  const handleDownload=async()=>{
    axios.get('http://127.0.0.1:8000/submit/result/',{responseType:'blob'})
    .then(response=>
      {
        const url= window.URL.createObjectURL(new Blob([response.data]));
        const link=document.createElement('a');
        link.href=url;
        link.setAttribute('download',"result of student.xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .catch(error=>{
        console.log(error);
        alert("Error in download!!!");
      })
  };



return (
  
  <div style={{width:"100%",height:"100%"}}>
      {loading==="true"?(<div className="loader-container">
        <div className="spinner"></div>
      </div>):(
        <div style={{width:"100%",height:"100%"}}>
    <Navbar /> 
    <div className={"container"}>
    <div className={"admin"}>
  <h2>Admin Options</h2>
  <div className="file-upload">
    <label><b>Upload Questions</b></label>
    <div className="file-input">
      <input type="file" onChange={handleQuestionsUpload} accept=".xlsx, .xls, .csv" />
      <input type="text" disabled placeholder={filenamequestion===""?"Choose File":filenamequestion} />
    </div>
  </div>

  <button className={"button_common"} onClick={handleSave}>Save</button>
</div>

    </div>
    </div>)}
    </div>
  
);

};
export default Admin;