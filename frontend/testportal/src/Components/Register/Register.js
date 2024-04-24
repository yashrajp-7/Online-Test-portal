import React, { useState,useEffect } from "react";
import logo from '../../Assets/whirpool7915.jpg';
import "./Register.css";
import Rnavbar from "./Rnavbar";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [flag,setFlag]=useState(false);
  const [user, setUserDetails] = useState({
    name: "",
    rollno: "",
    gender: "",
    phone: "",
    college: "",
    email:"",
    degree: "",
    sfid:"",
   
  });
  const [teststream, setStream] = useState("");
  const [testgender, setGender] = useState("");
  const [testbranch, setBranch] = useState("");
  const [branchOptions, setBranchOptions] = useState([]);
  const [resume, setResume] = useState(null);

  
  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);


  const handleGender = (event) => {
    const selectedGender = event.target.value;
    setGender(selectedGender);
  }

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
        "Computer Engineering",
        "Manufacturing Solutions",
        "Design Engineering",
        "Thermal Engineering",
        "Applied Mechanics(Fluid Mechanics)",

        "Artificial Intelligence & Machine Learning",
        "Mechanics & Design",
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
  useEffect(()=>{
    if(localStorage.getItem("signup")==="done")
    {
      window.location.href="/instruction"
    }
  })
  const changeHandler = (e) => {
    const { name, value } = e.target;
    
    setUserDetails({
      ...user,
      [name]: value,
    });
  };
  
  
  useEffect(()=>{
    if(localStorage.getItem("tempid")===null || localStorage.getItem("test_taken")==="true")
    {
      window.location.href="/"
    }
  })
  useEffect(()=>
  {
    const handleBack=()=>
    {
      window.history.replaceState(null,null,window.location.pathname);
    };
    handleBack();
    return ()=>{window.history.pushState({},'',window.location.pathname)};
  },[]);


  const validateForm = () => {
    let errors = {};
    let sfid=user.sfid
   
    if (!user.name) {
      errors.name = "Name is required";
    }

    if (!user.rollno) {
      errors.rollno = "Rollno is required";
    }

    if (!testgender) {
      errors.gender = "Gender is required";
    }

    if (!user.phone) {
      errors.phone = "Phone Number is required";
    }

    if (!user.college) {
      errors.college = "College Name is required";
    }

    if (!user.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "Invalid email address";
    }

    if (!user.degree) {
      errors.degree = "Highest Degree is required";
    }

    if ((!user.sfid) || (sfid.length!==5)||(!(/^\d+$/.test(sfid)))) {
      errors.sfid = "SF ID is required & it should numeric with length 5";
      
    }
    if (!teststream) {
      errors.stream = "Stream is required";
    }
    if (!testbranch) {
      errors.branch = "Branch is required";
    }
    if(resume===null)
    {
      errors.resume = "Resume is required";
    }
    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // const validateForm = () => {
  //   let isError = false;
  
  //   // Check if any field is empty
  //   if (!user.name || !user.rollno || !testgender || !user.phone || !user.college || !user.email || !user.degree || !user.sfid || !teststream || !testbranch || !resume) {
  //     isError = true;
  //   }
  
  //   if (isError) {
  //     // Display popup for mandatory fields
  //     alert("All fields are mandatory");
  //   }
  
  //   return !isError;
  // };
  
  const changeHandler2 = (e) => {
    const file = e.target.files[0];
    setResume(file);
    
    console.log('Uploading resume...', file);
  };
  const signupHandler = async (e) => {
    e.preventDefault();
    if(validateForm())
    {
      localStorage.setItem('testbranch',testbranch);
      localStorage.setItem('teststream',teststream);
      const formData = new FormData();
    
    
    formData.append('resume', resume);
    formData.append('name',user.name);
    formData.append('college_name',user.college );
    formData.append('rollno', user.rollno);
    formData.append('email', user.email);
    formData.append('gender', testgender);
    formData.append('highestdegree', user.degree);
    formData.append('phone_no',user.phone);
    formData.append('SFID', user.sfid);
    formData.append('branch', testbranch);
    formData.append('stream', teststream);
    

    
    axios.post('https://arun2024.pythonanywhere.com/signup/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      
    })
      .then(response => {
        console.log(response.data.message);
        if(response.data.message==="Your Test is done!!!")
        {
          alert("Your Test is Done");
        }
        else{
        localStorage.setItem("email",user.email);
        localStorage.setItem("name",user.name);
        localStorage.getItem('teststream',teststream);
        localStorage.getItem('testbranch',testbranch);
        window.location.href="/instruction";
        }
        })
        .catch(error => {console.error( error)
          alert(error);
        alert("Email ID or Rollno already registered!!!")});
    }
  };
  return (
    <>
    <div className={"outer"}>
      <Rnavbar />
    {/* <img  style={{height:"150px",width:"280px"}} src={logo} /> */}
      <div className={"register"}>
        <form>
          <h1>Personal Details</h1>
          <div className={"gridContainer"}>
            <div className={"leftSide"}>
              <label htmlFor="name">Name:</label>
              <input
                className="input-place"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={changeHandler}
                value={user.name==="null"? "":user.name}
              />
              <p className={"error"}>{formErrors.name}</p>
          
              
              <label>Rollno:</label>
              <input
                className="input-place"
                type="text"
                name="rollno"
                id="rollno"
                placeholder="Rollno"
                onChange={changeHandler}
                value={user.rollno==="null"? "":user.rollno}
              />
              <p className={"error"}>{formErrors.rollno}</p>
              <label>Phone No:</label>
              <input
                className="input-place"
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                onChange={changeHandler}
                value={user.phone==="null"? "":user.phone}
              />
              <p className={"error"}>{formErrors.phone}</p>
              <div className="dropdowns">
                <div className="dropdown">
                  <label>Gender:</label>
                    <select value={testgender} onChange={handleGender}>
                      <option value="">Select Gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      
                    </select>
                </div>
              </div>
              <p className={"error"}>{formErrors.gender}</p>
              
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
        <p className={"error"}>{formErrors.stream}</p>
        
            </div>
            <div className={"rightSide"}>
            <label>College Name:</label>
              <input
                className="input-place"
                type="text"
                name="college"
                id="college"
                placeholder="College Name"
                onChange={changeHandler}
                value={user.college==="null"? "":user.college}
              />
              <p className={"error"}>{formErrors.college}</p>
              <label>Email ID:</label>
              <input
                className="input-place"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={changeHandler}
                value={user.email==="null"? "":user.email}
              />
              <p className={"error"}>{formErrors.email}</p>
              <label>Degree:</label>
              <input
                className="input-place"
                type="text"
                name="degree"
                id="degree"
                placeholder="Highest Degree"
                onChange={changeHandler}
                value={user.degree==="null"? "":user.degree}
              />
              <p className={"error"}>{formErrors.degree}</p>
            
              <label>SFID:</label>
              <input
                className="input-place"
                type="text"
                name="sfid"
                id="sfid"
                placeholder="SFID"
                onChange={changeHandler}
                value={user.sfid==="null"? "":user.sfid}
              />
              <p className={"error"}>{formErrors.sfid}</p>
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
      <p className={"error"}>{formErrors.branch}</p>
            </div>
          </div>
          <div className="fileuppload">
        <label>CV/Resume:</label>
        <input
                className="fileup"
                type="file"
                name="cv"
                id="cv"
                onChange={changeHandler2}
                accept=".pdf,.doc,.docx"
              />
            
        </div>
        <p className={"error"}>{formErrors.resume}</p>
          <button className={"button1"} onClick={signupHandler}>
            Save & Next <span>&rarr;</span>
          </button>
        </form>
      </div>
      </div>
    </>
  );
};

export default Register;