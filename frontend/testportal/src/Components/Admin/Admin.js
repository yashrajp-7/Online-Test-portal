
// import React, { useState, useEffect } from "react";
// import "./Admin.css";
// import Navbar from "./Navbar";
// import axios from "axios";
// import Amenu from "./Amenu";

// const Admin = () => {
//   const [questionsFile, setQuestionsFile] = useState(null);
//   const [filenamequestion, setFilenamequestion] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [teststream, setStream] = useState("");
//   const [testbranch, setBranch] = useState("");
//   const [branchOptions, setBranchOptions] = useState([]);
//   const [tableData, settableData] = useState([]);
//   const [final,setfinal]=useState([]);
//   const [ischecked, setischecked] = useState(true);
//   var [newArray,setnewArray]=useState([]);
//   useEffect(() => {
//     if (localStorage.getItem("loginemail") === null) {
//       window.location.href = "/adminlogin";
//     }
//   }, []);

//   useEffect(() => {
//     if (localStorage.getItem("loginemail") === null) {
//       window.location.href = "/adminlogin";
//     } else {
//       // Disable body scroll
//       document.body.style.overflow = 'hidden';
//     }

//     // Cleanup function to re-enable scrolling
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, []);

//   useEffect(async () => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/questions/questionset/`);
//       console.log(response.data.message);
//       settableData(response.data.message);
//       setfinal(response.data.message);
//     } catch (error) {
//       console.error('Error::', error);
//     }
//   }, []);

//   const handleQuestionsUpload = (e) => {
//     const file = e.target.files[0];
//     setQuestionsFile(file);
//     setFilenamequestion(file.name);
//   };

//   const handleSave = () => {
//     if (teststream === "" || testbranch === "") {
//       alert("Select Stream and Branch!!!");
//     } else {
//       if (questionsFile === null) {
//         alert("File is Compulsory for saving!!!");
//       } else {
//         setLoading(true);
//         handleSave2();
//       }
//     }
//   };

//   const handleSave2 = () => {
//     const formData = new FormData();
//     formData.append("question", questionsFile);
//     formData.append("stream",teststream);
//     formData.append("branch",testbranch)
//     axios
//       .post("http://127.0.0.1:8000/questions/home/", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((response) => {
//         alert(response.data.message);
//         setLoading(false);
//         setQuestionsFile(null);
//         setFilenamequestion("");
//         window.location.reload();
//       })
//       .catch((error) => {
//         setLoading(false);
//         console.error("Error uploading files:", error);
//         alert("Failed to upload files. Please try again later.");
//       });
//   };

//   const handleStreamChange = (event) => {
//     const selectedStream = event.target.value;
//     setStream(selectedStream);
//     if (selectedStream === "M.Tech") {
//       setBranchOptions([
//         "Electronics & Telecommunication Engineering",
//         "Mechanical Engineering",
//         "Computer Science Engineering",
//         "Manufacturing Engineering and Industrial Management",
//         "Mechanical and Aerospace Engineering",
//         "Computer engineering",
//         "Manufacturing Solutions",
//         "Design Engineering",
//         "Thermal Engineering",
//         "Applied Mechanics(Fluid Mechanics)",
//         "Artificial Intilligence & Machinie Learning",
//         "Mechanis & Design",
//         "Power Electronics & Power Systems",
//       ]);
//     } else if (selectedStream === "B.Des" || selectedStream === "M.Des") {
//       setBranchOptions(["Product Design", "UI/UX Design"]);
//     } else if (selectedStream === "B.Tech") {
//       setBranchOptions([
//         "Mechanical",
//         "Computer Science",
//         "Electronics & Telecommunication",
//         "Industrial",
//         "Information Technology",
//         "Instrumentation",
//         "Chemical",
//         "Production",
//       ]);
//     } else if (selectedStream === "MS") {
//       setBranchOptions(["Automobile", "Interdisciplinary"]);
//     } else {
//       setBranchOptions([]);
//     }
//     setBranch("");
//   };

//   const handleBranchChange = (event) => {
//     setBranch(event.target.value);
//   };

//   const handlechange = (event, index) => {
//     settableData(prevTableData => {
//       return prevTableData.map((item, i) => {
//         if (i === index) {
//           console.log(event.target.checked);
//           console.log(item.take);
//           if(item.take){
//           return {
//             ...item,
//             take: false
//           };
//         }
//         else{
//           return {
//             ...item,
//             take: true
//           };
//         }
//         }
//         return item;
//       });
//     });
//   };

//   const handleSavequestionset = (event) => {
    
//       setLoading(true);
//       axios
//       .post("http://127.0.0.1:8000/questions/questionset/", tableData, {
//         headers: {
//           "Content-Type": "text/plain",
//         },
//       })
//       .then((response) => {
//         alert(response.data.message);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setLoading(false);
//         console.error("Error uploading files:", error);
//         alert("Server is Busy!!!");
//       });
//   };

//   return (
//     <div style={{ width: "100%", height: "100%" }}>
//       {loading ? (
//         <div className="loader-container">
//           <div className="spinner"></div>
//         </div>
//       ) : (
//         <div style={{ width: "100%", height: "100%" }}>
//           <Navbar />
//           <Amenu />
//           <div className={"main-frame"}>
//             <div className="left-table">
//               <div className="container">
//                 <table className="rwd-table">
//                   <thead>
//                     <tr>
//                       <th>SrNo</th>
//                       <th>Date</th>
//                       <th>File Name</th>
//                       <th>Stream</th>
//                       <th>Branch</th>
//                       <th>Keep Previous Questions or not?</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {tableData.map((item, index) => (
//                       <tr key={index}>
//                         <td>{index + 1}</td>
//                         <td>{item.date}</td>
//                         <td>{item.filename}</td>
//                         <td>{item.stream}</td>
//                         <td>{item.branch}</td>
//                         <td>
//                           <label className="switch">
//                             <input
//                               type="checkbox"
//                               checked={item.take}
//                               onChange={(e) => handlechange(e, index)}
//                             />
//                             <span className="slider round"></span>
//                           </label>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 {/* <button className={"btn1"} onClick={handleSavequestionset}>
//                   Save
//                 </button> */}
//               </div>
//             </div>
//             <div className={"right-side"}>
//               <div className={"container"}>
//                 <div className={"admin"}>
//                   <h2>Admin Options</h2>
//                   <div className="dropdowns6">
//                     <div className="dropdown6">
//                       <label>Select your Stream</label>
//                       <select value={teststream} onChange={handleStreamChange}>
//                         <option value="">Select Stream</option>
//                         <option value="B.Des">B.Des</option>
//                         <option value="M.Des">M.Des</option>
//                         <option value="B.Tech">B.Tech</option>
//                         <option value="MS">M.S</option>
//                         <option value="M.Tech">M.Tech</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="dropdowns6">
//                     <div className="dropdown6">
//                       <label>Select your Branch</label>

//                       <select value={testbranch} onChange={handleBranchChange}>
//                         <option value="">Select Branch</option>
//                         {branchOptions.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="file-upload">
//                     <label>
//                       <b>Upload Question Set</b>
//                     </label>
//                     <div className="file-input">
//                       <input
//                         type="file"
//                         onChange={handleQuestionsUpload}
//                         accept=".xlsx, .xls, .csv"
//                       />
//                       <input
//                         type="text"
//                         disabled
//                         placeholder={
//                           filenamequestion === "" ? "Choose File" : filenamequestion
//                         }
//                       />
//                     </div>
//                   </div>
//                   <button className={"button_common18"} onClick={handleSave}>
//                     Save
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Admin;



import React, { useState, useEffect } from "react";
import "./Admin.css";
import Navbar from "./Navbar";
import axios from "axios";
import Menu from "./Amenu";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const Admin = () => {
  const [questionsFile, setQuestionsFile] = useState(null);
  const [filenamequestion, setFilenamequestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [teststream, setStream] = useState("");
  const [testbranch, setBranch] = useState("");
  const [branchOptions, setBranchOptions] = useState([]);
  const [tableData, settableData] = useState([]);
  const [final,setfinal]=useState([]);
  const [ischecked, setischecked] = useState(true);
  var [newArray,setnewArray]=useState([]);
  useEffect(() => {
    if (localStorage.getItem("loginemail") === null) {
      window.location.href = "/adminlogin";
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("loginemail") === null) {
      window.location.href = "/adminlogin";
    } else {
      // Disable body scroll
      document.body.style.overflow = 'hidden';
    }

    // Cleanup function to re-enable scrolling
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(async () => {
    try {
      const response = await axios.get(`https://arun2024.pythonanywhere.com/questions/questionset/`);
      console.log(response.data.message);
      settableData(response.data.message);
      setfinal(response.data.message);
    } catch (error) {
      console.error('Error::', error);
    }
  }, []);

  const handleQuestionsUpload = (e) => {
    const file = e.target.files[0];
    setQuestionsFile(file);
    setFilenamequestion(file.name);
  };

  const handleSave = () => {
    if (teststream === "" || testbranch === "") {
      alert("Select Stream and Branch!!!");
    } else {
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
    formData.append("question", questionsFile);
    formData.append("stream",teststream);
    formData.append("branch",testbranch)
    axios
      .post("https://arun2024.pythonanywhere.com/questions/home/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert(response.data.message);
        setLoading(false);
        setQuestionsFile(null);
        setFilenamequestion("");
        window.location.reload();
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
    } else if (selectedStream === "B.Des" || selectedStream === "M.Des") {
      setBranchOptions(["Product Design", "UI/UX Design"]);
    } else if (selectedStream === "B.Tech") {
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
    } else if (selectedStream === "MS") {
      setBranchOptions(["Automobile", "Interdisciplinary"]);
    } else {
      setBranchOptions([]);
    }
    setBranch("");
  };

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };

  const handlechange = (event, index) => {
    settableData(prevTableData => {
      return prevTableData.map((item, i) => {
        if (i === index) {
          console.log(event.target.checked);
          console.log(item.take);
          if(item.take){
          return {
            ...item,
            take: false
          };
        }
        else{
          return {
            ...item,
            take: true
          };
        }
        }
        return item;
      });
    });
  };

  const handleSavequestionset = (event) => {
    
      setLoading(true);
      axios
      .post("https://arun2024.pythonanywhere.com/questions/questionset/", tableData, {
        headers: {
          "Content-Type": "text/plain",
        },
      })
      .then((response) => {
        alert(response.data.message);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error uploading files:", error);
        alert("Server is Busy!!!");
      });
  };

  const handleurl = (url) => {
  
    window.open(url,'_blank');
    
  };
  const renderButton = (item) => {
    return (
      <Button onClick={() => handleurl(item.Ques_Link)}>View Question Set</Button>
    );
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
          <Menu />
          <div className={"main-frame"}>
            <div className="left-table">
              <div className="container">
                <table className="rwd-table">
                  <thead>
                    <tr>
                      <th>SrNo</th>
                      <th>Date</th>
                      {/* <th>File Name</th> */}
                      <th>Stream</th>
                      <th>Branch</th>
                      <th>Question Set</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.Date}</td>
                        {/* <td>{item.Filename}</td> */}
                        <td>{item.Stream}</td>
                        <td>{item.Branch}</td>
                        <td >
                          <a href={item.Ques_Link}>
                            <button className="button_common19">Question Set</button>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* <button className={"btn1"} onClick={handleSavequestionset}>
                  Save
                </button> */}
              </div>
            </div>
            <div className={"right-side"}>
              <div className={"container"}>
                <div className={"admin"}>
                  <h2>Admin Options</h2>

                    <div className="cont1">

                      <div className="left-cont1">
                        <div className="dropdowns6">
                          <div className="dropdown6">
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
                      </div>  

                      <div className="right-cont1">
                        <div className="dropdowns7">
                          <div className="dropdown7">
                            <label>Select your Branch</label>

                            <select value={testbranch} onChange={handleBranchChange}>
                              <option value="">Select Branch</option>
                              {branchOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
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
                        placeholder={
                          filenamequestion === "" ? "Choose File" : filenamequestion
                        }
                      />
                    </div>
                  </div>
                  {/* <button className={"button_common18"} onClick={handleSave}>
                    Save
                  </button> */}
                </div>
                <button className={"button_common18"} onClick={handleSave}>
                    Save
                  </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;