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
  useEffect(()=>{
    
    console.log(localStorage.clear());
    console.log(console.clear());
  },[]);
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

  const loginHandler = async(e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
  
    if( user.email!=="" && user.password!=="")
    {
      const p=new URLSearchParams({email:user.email,password:user.password});
      try {
        const response = await axios.get(`http://localhost:8000/login/admin/?${p}`);
        if(response.data.message==="valid admin!!!")
        {
          localStorage.setItem("loginemail",user.email)
          window.location.href="/result"
          
        }
        
      } catch (error) {
        console.error('Error uploading::', error);
        alert("Incorrect password or username!!!");
      }
    }
    
  };

  return (
    <div className={"big"} > 
    <img style={{height:"150px",width:"280px",float:"right",marginTop:"160px",marginRight: "140px"}} src={logo} />
      <div className={"login"} >
        
        <form>
          <h1> Admin Login</h1>
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

          <button className={"button_common"} onClick={loginHandler}>
            Login
          </button>

        </form>
      </div>
    </div>
  );
};
export default Login;
