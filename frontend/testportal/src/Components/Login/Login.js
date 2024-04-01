// import React, { useState, useEffect } from "react";
// import logo from '../../Assets/whirpool7915.jpg';
// import "./Login.css";
// import axios from "axios";
// import { useNavigate, NavLink } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);
//   const [user, setUserDetails] = useState({
//     tempid: "",
//     password: "",
//   });

//   const changeHandler = (e) => {
//     const { name, value } = e.target;
//     setUserDetails({
//       ...user,
//       [name]: value,
//     });
//   };
//   useEffect(()=>{
    
//     console.log(localStorage.clear());
//     console.log(console.clear());
//   },[]);
//   const validateForm = (values) => {
//     const error = {};
//     if (!values.tempid) {
//       error.tempid = "TempID is required";
//     } 
//     if (!values.password) {
//       error.password = "Password is required";
//     }
//     return error;
//   };
//   const [agreedToTerms, setAgreedToTerms] = useState(false);
//   const loginHandler = async(e) => {
//     e.preventDefault();
//     setFormErrors(validateForm(user));
    
//     if(!agreedToTerms)
//     {
//       alert("Accept Terms and Conditions to login!!!");
//     }
//     if(agreedToTerms && user.tempid!=="" && user.password!=="")
//     {
//       const p=new URLSearchParams({tempid:user.tempid,password:user.password});
//       try {
//         const response = await axios.get(`http://localhost:8000/login/?${p}`);
//         if(response.data.message==="valid student!")
//         {
//           localStorage.setItem("tempid",user.tempid)
//           window.location.href="/signup"
          
//         }
        
//       } catch (error) {
//         console.error('Error uploading::', error);
//         alert("Incorrect password or TempID!!!");
//       }
//     }
    
//   };

//   const toggleCheckbox = () => {
//     setAgreedToTerms(!agreedToTerms);
//   };
//   return (
//     <div className={"big"} > 
//     <img style={{height:"150px",width:"280px",float:"right",marginTop:"160px",marginRight: "140px"}} src={logo} />
//       <div className={"login"} >
        
//         <form>
//           <h1>Login</h1>
//           <input
//             type="text"
//             name="tempid"
//             id="tempid"
//             placeholder="TempID"
//             onChange={changeHandler}
//             value={user.tempid}
//           />
//           <p className={"error"}>{formErrors.tempid}</p>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             placeholder="Password"
//             onChange={changeHandler}
//             value={user.password}
//           />
//           {/* <p className={basestyle.error}>{formErrors.password}</p> */}
//           {formErrors.password && <p className={"error"}>{formErrors.password}</p>}
//         <label className={"checkboxContainer"}>
//           <input
//             type="checkbox"
//             checked={agreedToTerms}
//             onChange={toggleCheckbox}
//           />
//           <span className={"checkmark"}></span>
//           <span className={"clickableText"}>I agree to the <NavLink to="#">Terms of Service</NavLink> and <NavLink to="#">Privacy Notice</NavLink></span>
//         </label>
//           <button className={"button_common"} onClick={loginHandler}>
//             Login
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// };
// export default Login;

import React, { useState, useEffect } from "react";
import logo from '../../Assets/whirpool7915.jpg';
import "./Login.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    tempid: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };
  useEffect(()=>{
    
    console.log(localStorage.clear());
    console.log(console.clear());
  },[]);
  const validateForm = (values) => {
    const error = {};
    if (!values.tempid) {
      error.tempid = "TempID is required";
    } 
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const loginHandler = async(e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    
    if(!agreedToTerms)
    {
      alert("Accept Terms and Conditions to login!!!");
    }
    if(agreedToTerms && user.tempid!=="" && user.password!=="")
    {
      const p=new URLSearchParams({tempid:user.tempid,password:user.password});
      try {
        const response = await axios.get(`http://localhost:8000/login/?${p}`);
        if(response.data.message==="valid student!")
        {
          localStorage.setItem("tempid",user.tempid)
          window.location.href="/signup"
          
        }
        
      } catch (error) {
        console.error('Error uploading::', error);
        alert("Incorrect password or TempID!!!");
      }
    }
    
  };

  const toggleCheckbox = () => {
    setAgreedToTerms(!agreedToTerms);
  };
  return (
    <div className={"big"} > 
    
      <div className={"login"} >
        
        <form>
        <img style={{height:"150px",width:"280px",float:"right",marginTop:"5px",marginRight: "245px"}} src={logo} />
          <input
            type="text"
            name="tempid"
            id="tempid"
            placeholder="TempID"
            onChange={changeHandler}
            value={user.tempid}
          />
          <p className={"error"}>{formErrors.tempid}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={user.password}
          />
          {/* <p className={basestyle.error}>{formErrors.password}</p> */}
          {formErrors.password && <p className={"error"}>{formErrors.password}</p>}
          <br></br>
        <label className={"checkboxContainer"}>
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={toggleCheckbox}
          />
          <span className={"checkmark"}></span>
          <span className={"clickableText"}>I agree to the <NavLink to="#">Terms of Service</NavLink> and <NavLink to="#">Privacy Notice</NavLink></span>
        </label>
          <button className={"button_common1"} onClick={loginHandler}>
            Login
          </button>

        </form>
      </div>
    </div>
  );
};
export default Login;