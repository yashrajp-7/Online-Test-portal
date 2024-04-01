


// import React, { useState,useEffect } from "react";
// // import basestyle from "../Base.module.css";
// import "./Admin.css";
// import Navbar from "./Navbar";
// import axios from "axios";


// const Admin = () => {
//   const [questionsFile, setQuestionsFile] = useState(null);
//   const [filenamequestion,setfilenamequestion]=useState("");
//   const[loading,setloading]=useState("false");

//   useEffect(()=>{
//     if(localStorage.getItem("loginemail")===null)
//     {
//       window.location.href="/adminlogin"
//     }
//   })
//   const handleQuestionsUpload = (e) => {
//     const file = e.target.files[0];
//     setQuestionsFile(file);
//     setfilenamequestion(e.target.files[0].name);
//   };
//   const handleSave = ()=>
//   {
//     if(questionsFile === null)
//     {
//       alert("File Compulsory for saving!!!")
//     }
//     else{
//       setloading("true");
//       handleSave2();
//     }

//   };
//   const handleSave2 =  () => {
    
//       // Send user data and questions files to the backend for processing
//       const formData = new FormData();
//       formData.append("question", questionsFile,"question.xlsx");
//       axios.post("http://127.0.0.1:8000/login/home/", formData,{
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
        
//       }).then(response => {alert(response.data.message);
//         setloading("false");
//         setQuestionsFile(null);
//         setfilenamequestion("");
//       })
//         .catch (error=>{
//           setloading("false")
//       console.error("Error uploading files:", error);
//       alert("Failed to upload files. Please try again later.");
//         }) 
      
//   };



// return (
  
//   <div style={{width:"100%",height:"100%"}}>
//       {loading==="true"?(<div className="loader-container">
//         <div className="spinner"></div>
//       </div>):(
//         <div style={{width:"100%",height:"100%"}}>
//     <Navbar /> 
//     <div className={"container"}>
//     <div className={"admin"}>
//   <h2>Admin Options</h2>
//   <div className="file-upload">
//     <label><b>Upload Questions</b></label>
//     <div className="file-input">
//       <input type="file" onChange={handleQuestionsUpload} accept=".xlsx, .xls, .csv" />
//       <input type="text" disabled placeholder={filenamequestion===""?"Choose File":filenamequestion} />
//     </div>
//   </div>

//   <button className={"button_common"} onClick={handleSave}>Save</button>
// </div>

//     </div>
//     </div>)}
//     </div>
  
// );

// };
// export default Admin;



// import React, { useState,useEffect } from "react";
// // import basestyle from "../Base.module.css";
// import "./Admin.css";
// import Navbar from "./Navbar";
// import axios from "axios";


// const Admin = () => {
//   const [questionsFile, setQuestionsFile] = useState(null);
//   const [filenamequestion,setfilenamequestion]=useState("");
//   const[loading,setloading]=useState("false");

//   useEffect(()=>{
//     if(localStorage.getItem("loginemail")===null)
//     {
//       window.location.href="/adminlogin"
//     }
//   })
//   const handleQuestionsUpload = (e) => {
//     const file = e.target.files[0];
//     setQuestionsFile(file);
//     setfilenamequestion(e.target.files[0].name);
//   };
//   const handleSave = ()=>
//   {
//     if(questionsFile === null)
//     {
//       alert("File Compulsory for saving!!!")
//     }
//     else{
//       setloading("true");
//       handleSave2();
//     }

//   };
//   const handleSave2 =  () => {
    
//       // Send user data and questions files to the backend for processing
//       const formData = new FormData();
//       formData.append("question", questionsFile,"question.xlsx");
//       axios.post("http://127.0.0.1:8000/login/home/", formData,{
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
        
//       }).then(response => {alert(response.data.message);
//         setloading("false");})
//         .catch (error=>{
//           setloading("false")
//       console.error("Error uploading files:", error);
//       alert("Failed to upload files. Please try again later.");
//         }) 
      
//   };
//   const handleDownload=async()=>{
//     axios.get('http://127.0.0.1:8000/submit/result/',{responseType:'blob'})
//     .then(response=>
//       {
//         const url= window.URL.createObjectURL(new Blob([response.data]));
//         const link=document.createElement('a');
//         link.href=url;
//         link.setAttribute('download',"result of student.xlsx");
//         document.body.appendChild(link);
//         link.click();
//       })
//       .catch(error=>{
//         console.log(error);
//         alert("Error in download!!!");
//       })
//   };



// return (
  
//   <div style={{width:"100%",height:"100%"}}>
//       {loading==="true"?(<div className="loader-container">
//         <div className="spinner"></div>
//       </div>):(
//         <div style={{width:"100%",height:"100%"}}>
//     <Navbar /> 
//     <div className={"container"}>
//     <div className={"admin"}>
//   <h2>Admin Options</h2>
//   <div className="file-upload">
//     <label><b>Upload Questions</b></label>
//     <div className="file-input">
//       <input type="file" onChange={handleQuestionsUpload} accept=".xlsx, .xls, .csv" />
//       <input type="text" disabled placeholder={filenamequestion===""?"Choose File":filenamequestion} />
//     </div>
//   </div>

//   <button className={"button_common"} onClick={handleSave}>Save</button>
// </div>

//     </div>
//     </div>)}
//     </div>
  
// );

// };
// export default Admin;



import React, { useState, useEffect } from "react";
import "./Admin.css";
import Navbar from "./Navbar";
import axios from "axios";

const Admin = () => {
  const [questionsFile, setQuestionsFile] = useState(null);
  const [filenamequestion, setFilenamequestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [teststream, setStream] = useState("");
  const [testbranch, setBranch] = useState("");
  const [branchOptions, setBranchOptions] = useState([]);
  var [tableData,settableData]=useState([]);
  const [ischecked,setischecked]=useState(true);
  useEffect(() => {
    if (localStorage.getItem("loginemail") === null) {
      window.location.href = "/adminlogin";
    }
  }, []);
  useEffect(async()=>{
    try {
      const response = await axios.get(`http://127.0.0.1:8000/questions/questionset/`);
      console.log(response.data.message);
      settableData(response.data.message)

      
    } catch (error) {
      console.error('Error::', error);
    }
  },[])
  const handleQuestionsUpload = (e) => {
    const file = e.target.files[0];
    setQuestionsFile(file);
    setFilenamequestion(file.name);
  };

  const handleSave = () => {
    if(teststream==="" || testbranch==="")
    {
      alert("Select Stream and Branch!!!");
    }
    else{
    if (questionsFile === null) {
      alert("File is Compulsory for saving!!!");
    } else {
      setLoading(true);
      handleSave2();
    }
  }
  };

  const handleSave2 = () => {
    const formData = new FormData();
    formData.append("question", questionsFile, "question.xlsx");
    axios
      .post("http://127.0.0.1:8000/login/home/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert(response.data.message);
        setLoading(false);
        setQuestionsFile(null);
        setFilenamequestion("");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error uploading files:", error);
        alert("Failed to upload files. Please try again later.");
      });
  };

 
  const handleStreamChange = (event) => {
    const selectedStream = event.target.value;
    setStream(selectedStream);
    // Update branch options based on the selected stream
    if (selectedStream === "M.Tech") {
      setBranchOptions([
        "Electronics & Telecommunication Engineering", 
        "Mechanical Engineering",
        "Computer Science Engineering",
        "Manufacturing Engineering and Industrial Management",
        "Mechanical and Aerospace Engineering",
        "Computer engineering",
        "Manufacturing Solutions",
        "Design Engineering",
        "Thermal Engineering",
        "Applied Mechanics(Fluid Mechanics)",
        "Artificial Intilligence & Machinie Learning",
        "Mechanis & Design",
        "Power Electronics & Power Systems",
        
      ]);
      
    } 
    else if (selectedStream === "B.Des") {
      setBranchOptions([
        "Product Design", 
        "UI/UX Design"
      ]);
    }else if (selectedStream === "M.Des") {
      setBranchOptions([
        "Product Design", 
        "UI/UX Design"
      ]);
    }else if (selectedStream === "B.Tech") {
      setBranchOptions([
        "Mechanical",
        "Computer Science",
        "Electronics & Telecommunication",
        "Industrial",
        "Information Technology",
        "Instrumentation",
        "Chemical",
        "Production",
      ]);
    }else if (selectedStream === "MS") {
          setBranchOptions([
            "Automobile",
            "Interdisciplinary"
          ]);
    } else {
      // Reset branch options if no stream is selected
      setBranchOptions([]);
    }
    // Reset branch selection when stream changes
    setBranch("");
  };

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };


  const handleSavequestionset=(event)=>{

  };
  const handlechange=(event,ind)=>{
    console.log(ind)
    for (var i in tableData) {
      console.log(i)
      if (i == ind) {
        if(tableData[i].take)
        {
          tableData[i].take=false
        }
        else
        {
          tableData[i].take=true
        }
         break; 
      }
    }
    settableData(tableData)
    console.log(tableData);
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div style={{ width: "100%", height: "100%" }}>
          <Navbar />
          <div className={"main-frame"}>
            <div className="left-table">
              <div className="container">
                <table className="rwd-table">
                  <thead>
                    <tr>
                      <th>SrNo</th>
                      <th>Date</th>
                      <th>File Name</th>
                      <th>Stream</th>
                      <th>Branch</th>
                      <th>Keep Previous Questions or not?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item, index) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.date}</td>
                        <td>{item.filename}</td>
                        <td>{item.stream}</td>
                        <td>{item.branch}</td>
                        <td>
                          <label className="switch">
                          <input type="checkbox"  checked={item.take} onChange={e =>handlechange(e,index)} />
                            <span className="slider round"></span>
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className={"btn1"} onClick={handleSavequestionset}>
                  Save
                </button>
              </div>
            </div>
            <div className={"right-side"}>
              <div className={"container"}>
                <div className={"admin"}>
                  <h2>Admin Options</h2>
                  <div className="dropdowns">
        <div className="dropdown">
          <label>Select your Stream</label>
          <select value={teststream} onChange={handleStreamChange}>
            <option value="">Select Stream</option>
            <option value="B.Des">B.Des</option>
            <option value="M.Des">M.Des</option>
            <option value="B.Tech">B.Tech</option>
            <option value="MS">M.S</option>
            <option value="M.Tech">M.Tech</option>
          </select>
        </div>
        </div>
                 
                  <div className="dropdowns">
              <div className="dropdown">
          <label>Select your Branch</label>
          
          <select value={testbranch} onChange={handleBranchChange}>
          <option value="">Select Branch</option>
            {branchOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
      </div>
                 
                  <div className="file-upload">
                    <label>
                      <b>Upload Question Set</b>
                    </label>
                    <div className="file-input">
                      <input
                        type="file"
                        onChange={handleQuestionsUpload}
                        accept=".xlsx, .xls, .csv"
                      />
                      <input
                        type="text"
                        disabled
                        placeholder={filenamequestion === "" ? "Choose File" : filenamequestion}
                      />
                    </div>
                  </div>
                  <button className={"button_common"} onClick={handleSave}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;