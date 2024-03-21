import React, { useState, useEffect } from "react";

import "./Login.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };
  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
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
    console.log(user.email)
    console.log(agreedToTerms)
    if(!agreedToTerms)
    {
      alert("Accept Terms and Conditions to login!!!");
    }
    if(agreedToTerms && user.email!=="" && user.password!=="")
    {
      const p=new URLSearchParams({email:user.email,password:user.password});
      try {
        const response = await axios.get(`http://localhost:8000/login/?${p}`);
        console.log(response.data.message);
        if(response.data.message==="valid admin!!!")
        {
          localStorage.setItem("loginemail",user.email)
          window.location.href="/admin"
          
        }
        else{
          localStorage.setItem("loginemail",user.email)
          window.location.href="/signup"
          
        }
        
      } catch (error) {
        console.error('Error uploading::', error);
        alert("Incorrect password or username!!!");
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
          <h1>Login</h1>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={changeHandler}
            value={user.email}
          />
          <p className={"error"}>{formErrors.email}</p>
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
        <label className={"checkboxContainer"}>
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={toggleCheckbox}
          />
          <span className={"checkmark"}></span>
          <span className={"clickableText"}>I agree to the <NavLink to="#">Terms of Service</NavLink> and <NavLink to="#">Privacy Notice</NavLink></span>
        </label>
          <button className={"button_common"} onClick={loginHandler}>
            Login
          </button>

        </form>
      </div>
    </div>
  );
};
export default Login;
