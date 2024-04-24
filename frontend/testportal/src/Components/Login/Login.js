


import React, { useState , useEffect} from "react";
import logo from '../../Assets/whirpool7915.jpg';
import "./Login.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from 'sweetalert2'

const Login = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    tempid: "",
    password: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showModal, setShowModal] = useState(false); // Define showModal and setShowModal
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  useEffect(()=>{
    console.log(localStorage.clear());
  })

  useEffect(() => {
    // Disable body scroll on mount
    document.body.style.overflow = 'hidden';

    // Cleanup function to re-enable body scroll on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

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

  const loginHandler = async(e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    
    if(!agreedToTerms)
    {
      Swal.fire({
        title: "Accept Terms and Conditions to login!!!",
        icon: 'warning',
      });
    }
    if(agreedToTerms && user.tempid!=="" && user.password!=="")
    {
      const p=new URLSearchParams({tempid:user.tempid,password:user.password});
      try {
        const response = await axios.get(`https://arun2024.pythonanywhere.com/login/?${p}`);
        if(response.data.message==="valid student!")
        {
          localStorage.setItem("tempid",user.tempid)
          window.location.href="/signup"
          
        }
        
      } catch (error) {
        console.error('Error uploading::', error);
        Swal.fire({
          title: "Incorrect password or TempID!!!",
          icon: 'error',
        });
      }
    }
  };

  const toggleCheckbox = () => {
    setAgreedToTerms(!agreedToTerms);
  };
  
  
  return (
    <div className={"big00"} > 
    
      <div className={"login00"} >
        
        <form>
        <img className="whirlpool00" src={logo} />
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
          {formErrors.password && <p className={"error"}>{formErrors.password}</p>}
          <br></br>
          <label className={"checkboxContainer"}>
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={toggleCheckbox}
            />
            <span className={"checkmark"}></span>
            <span className={"clickableText"}>
              I agree to the  
              <NavLink to="#" onClick={() => setShowModal(true)}> Terms of Service </NavLink> 
              and 
              <NavLink to="#" onClick={() => setShowPrivacyModal(true)}> Privacy Notice</NavLink>
            </span>
          </label>
          <button className={"button_common100"} onClick={loginHandler}>
            Login
          </button>
        </form>
      </div>

     
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Terms of Service</h2>
            <p>
    <strong>Acceptance of Terms:</strong> By accessing or using the portal, you agree to abide by these Terms of Service. If you do not agree with any part of these terms, you may not access the portal.
</p>
<p>
    <strong>Use of the Portal:</strong> The portal is intended solely for the purpose of conducting technical tests for hiring interns for Whirlpool Corporation. Any unauthorized use of the portal is strictly prohibited.
</p>
<p>
    <strong>User Account:</strong> You may be required to create a user account to access the portal. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
</p>
<p>
    <strong>Accuracy of Information:</strong> You agree to provide accurate and complete information when creating your account and when participating in any tests or assessments on the portal.
</p>
<p>
    <strong>Intellectual Property:</strong> All content and materials provided on the portal, including test questions, are the property of Whirlpool Corporation and are protected by intellectual property laws. You may not use, reproduce, or distribute any content from the portal without prior written permission.
</p>
<p>
    <strong>Prohibited Activities:</strong> You agree not to engage in any activity that disrupts or interferes with the proper functioning of the portal, including but not limited to hacking, spamming, or transmitting malware.
</p>

          </div>
        </div>
      )}
      
      {showPrivacyModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowPrivacyModal(false)}>&times;</span>
            <h2>Privacy Notice</h2>
    

<p>
    At Whirlpool Corporation, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Notice explains how we collect, use, and safeguard the information you provide when using our web app for conducting technical tests for hiring interns.
</p>

<h3>Information We Collect</h3>

<p>
    When you use our web app, we may collect certain personal information from you, including but not limited to:
</p>

<ul>
    <li>Basic account information such as your name, email address, and contact details.</li>
    <li>Information you provide when completing tests or assessments on the portal.</li>
    <li>Technical information such as your IP address, browser type, and device information.</li>
</ul>

<h3>How We Use Your Information</h3>

<p>
    We may use the information we collect from you for the following purposes:
</p>

<ul>
    <li>To create and manage your user account.</li>
    <li>To administer tests and assessments and evaluate your qualifications for internship positions.</li>
    <li>To communicate with you regarding your account, test results, and internship opportunities.</li>
    
</ul>        
 </div>
        </div>
      )}
    </div>
  );
};

export default Login;
