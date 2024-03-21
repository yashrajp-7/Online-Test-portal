// import React, { useState } from "react";
// import basestyle from "../Base.module.css";
// import registerstyle from "./Register.module.css";
// import axios from "axios";
// import { useNavigate, NavLink } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();

//   const [formErrors, setFormErrors] = useState({});
//   const [user, setUserDetails] = useState({
//     name: "",
//     branch: "",
//     gender: "",
//     phone: "",
//     college: "",
//     email: "",
//     degree: "",
//     specialization: "",
//     sfid: "",
//     cv: null
//   });

//   const changeHandler = (e) => {
//     const { name, value } = e.target;
//     setUserDetails({
//       ...user,
//       [name]: value,
//     });
//   };

//   const validateForm = () => {
//     let errors = {};

//     if (!user.name) {
//       errors.name = "Name is required";
//     }

//     if (!user.branch) {
//       errors.branch = "Branch is required";
//     }

//     if (!user.gender) {
//       errors.gender = "Gender is required";
//     }

//     if (!user.phone) {
//       errors.phone = "Phone Number is required";
//     }

//     if (!user.college) {
//       errors.college = "College Name is required";
//     }

//     if (!user.email) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(user.email)) {
//       errors.email = "Invalid email address";
//     }

//     if (!user.degree) {
//       errors.degree = "Highest Degree is required";
//     }

//     if (!user.specialization) {
//       errors.specialization = "Specialization is required";
//     }

//     if (!user.sfid) {
//       errors.sfid = "SF ID is required";
//     }

//     setFormErrors(errors);

//     return Object.keys(errors).length === 0;
//   };

//   const signupHandler = async (e) => {
//     e.preventDefault();
//     if(!validateForm())
//     {
//       if(user.email===localStorage.getItem('loginemail'))
//       {
//         localStorage.setItem("name",user.name)
//         localStorage.setItem("sfid",user.sfid)
//         localStorage.setItem("specialization",user.specialization)
//         localStorage.setItem("degree",user.degree)
//         localStorage.setItem("college",user.college)
//         localStorage.setItem("phone",user.phone)
//         localStorage.setItem("gender",user.gender)
//         localStorage.setItem("branch",user.branch)
//         localStorage.setItem("email",user.email)
//         window.location.href="/stream"
//       }
//       else{
//         console.log(user.email)
//         console.log(localStorage.getItem("loginemail"))
//         console.log(localStorage.getItem("email"))
//         alert("Enter Same Email of Login Email!!")
//       }
//     }
//      //ARUN USE IT
//     // if (validateForm()) {
//     //   try {
//     //     const response = await axios.post("http://localhost:9002/signup", user);
//     //     alert(response.data.message);
//     //     navigate("/login");
//     //   } catch (error) {
//     //     console.error("Registration failed:", error);
//     //     alert("Registration failed. Please try again later.");
//     //   }
//     // }
    
//   };

//   return (
//     <>
    
//       <div className={registerstyle.register}>
//         <form>
//           <h1>Create your account</h1>
//           <div className={registerstyle.gridContainer}>
//             <div className={registerstyle.leftSide}>
//               <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 placeholder="Name"
//                 onChange={changeHandler}
//                 value={localStorage.getItem("name")}
//               />
//               <p className={basestyle.error}>{formErrors.name}</p>
//               <input
//                 type="text"
//                 name="branch"
//                 id="branch"
//                 placeholder="Branch"
//                 onChange={changeHandler}
//                 value={localStorage.getItem("branch")}
//               />
//               <p className={basestyle.error}>{formErrors.branch}</p>
//               <input
//                 type="text"
//                 name="gender"
//                 id="gender"
//                 placeholder="Gender"
//                 onChange={changeHandler}
//                 value={localStorage.getItem("gender")}
//               />
//               <p className={basestyle.error}>{formErrors.gender}</p>
//               <input
//                 type="text"
//                 name="phone"
//                 id="phone"
//                 placeholder="Phone Number"
//                 onChange={changeHandler}
//                 value={localStorage.getItem("phone")}
//               />
//               <p className={basestyle.error}>{formErrors.phone}</p>
//               <input
//                 type="file"
//                 name="cv"
//                 id="cv"
//                 onChange={changeHandler}
//                 accept=".pdf,.doc,.docx"
//               />
//             </div>
//             <div className={registerstyle.rightSide}>
//               <input
//                 type="text"
//                 name="college"
//                 id="college"
//                 placeholder="College Name"
//                 onChange={changeHandler}
//                 value={localStorage.getItem("college")}
//               />
//               <p className={basestyle.error}>{formErrors.college}</p>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 placeholder="Email"
//                 onChange={changeHandler}
//                 value={localStorage.getItem("email")}
//               />
//               <p className={basestyle.error}>{formErrors.email}</p>
//               <input
//                 type="text"
//                 name="degree"
//                 id="degree"
//                 placeholder="Highest Degree"
//                 onChange={changeHandler}
//                 value={localStorage.getItem("degree")}
//               />
//               <p className={basestyle.error}>{formErrors.degree}</p>
//               <input
//                 type="text"
//                 name="specialization"
//                 id="specialization"
//                 placeholder="Specialization"
//                 onChange={changeHandler}
//                 value={localStorage.getItem("specialization")}
//               />
//               <p className={basestyle.error}>{formErrors.specialization}</p>
//               <input
//                 type="text"
//                 name="sfid"
//                 id="sfid"
//                 placeholder="SF ID"
//                 onChange={changeHandler}
//                 value={localStorage.getItem("sfid")}
//               />
//               <p className={basestyle.error}>{formErrors.sfid}</p>
//             </div>
//           </div>
          
//         <button className="button1" onClick={signupHandler}>
//           Save & Next   <span>&rarr;</span>
//         </button>
     
//         </form>
//       </div>
//     </>
//   );
// };

// export default Register;
import React, { useState,useEffect } from "react";

import "./Register.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({
    name: localStorage.getItem("name"),
    branch: localStorage.getItem("branch"),
    gender: localStorage.getItem("gender"),
    phone: localStorage.getItem("phone"),
    college: localStorage.getItem("college"),
    email: localStorage.getItem("email"),
    degree: localStorage.getItem("degree"),
    sfid: localStorage.getItem("sfid"),
   
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };



  const validateForm = () => {
    let errors = {};

    if (!user.name) {
      errors.name = "Name is required";
    }

    if (!user.branch) {
      errors.branch = "Branch is required";
    }

    if (!user.gender) {
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

    if (!user.sfid) {
      errors.sfid = "SF ID is required";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    if(validateForm())
    {
      if(user.email===localStorage.getItem('loginemail'))
      {
        localStorage.setItem("name",user.name)
        localStorage.setItem("sfid",user.sfid)
        localStorage.setItem("degree",user.degree)
        localStorage.setItem("college",user.college)
        localStorage.setItem("phone",user.phone)
        localStorage.setItem("gender",user.gender)
        localStorage.setItem("branch",user.branch)
        localStorage.setItem("email",user.email)
        window.location.href="/stream"
      }
      else{
        console.log(user.email)
        console.log(localStorage.getItem("loginemail"))
        console.log(localStorage.getItem("email"))
        alert("Enter Same Email of Login Email!!")
      }
    }
  };
  return (
    <>
    <div className={"outer"}>
      <div className={"register"}>
        <form>
          {/* <h1>Create your account</h1> */}
          <div className={"gridContainer"}>
            <div className={"leftSide"}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={changeHandler}
                value={user.name==="null"? "":user.name}
              />
              <p className={"error"}>{formErrors.name}</p>
              <label>Branch:</label>
              <input
                type="text"
                name="branch"
                id="branch"
                placeholder="Branch"
                onChange={changeHandler}
                value={user.branch==="null"? "":user.branch}
              />
              <p className={"error"}>{formErrors.branch}</p>
              <label>Gender:</label>
              <input
                type="text"
                name="gender"
                id="gender"
                placeholder="Gender"
                onChange={changeHandler}
                value={user.gender==="null"? "":user.gender}
              />
              <p className={"error"}>{formErrors.gender}</p>
              <label>Phone No:</label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                onChange={changeHandler}
                value={user.phone==="null"? "":user.phone}
              />
              <p className={"error"}>{formErrors.phone}</p>
            </div>
            <div className={"rightSide"}>
            <label>College Name:</label>
              <input
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
                type="text"
                name="sfid"
                id="sfid"
                placeholder="SFID"
                onChange={changeHandler}
                value={user.sfid==="null"? "":user.sfid}
              />
              <p className={"error"}>{formErrors.sfid}</p>
            </div>
          </div>
          <button className={"button1"} onClick={signupHandler}>
            Save & Next
          </button>
        </form>
      </div>
      </div>
    </>
  );
};

export default Register;