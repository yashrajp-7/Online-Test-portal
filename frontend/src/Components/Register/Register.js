import React, { useState } from "react";
import basestyle from "../Base.module.css";
import registerstyle from "./Register.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({
    name: "",
    branch: "",
    gender: "",
    phone: "",
    college: "",
    email: "",
    degree: "",
    specialization: "",
    sfid: "",
    cv: null
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

    if (!user.specialization) {
      errors.specialization = "Specialization is required";
    }

    if (!user.sfid) {
      errors.sfid = "SF ID is required";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const signupHandler = async (e) => {
    e.preventDefault();
     //ARUN USE IT
    // if (validateForm()) {
    //   try {
    //     const response = await axios.post("http://localhost:9002/signup", user);
    //     alert(response.data.message);
    //     navigate("/login");
    //   } catch (error) {
    //     console.error("Registration failed:", error);
    //     alert("Registration failed. Please try again later.");
    //   }
    // }
    window.location.href="/stream"
  };

  return (
    <>
    
      <div className={registerstyle.register}>
        <form>
          <h1>Create your account</h1>
          <div className={registerstyle.gridContainer}>
            <div className={registerstyle.leftSide}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={changeHandler}
                value={user.name}
              />
              <p className={basestyle.error}>{formErrors.name}</p>
              <input
                type="text"
                name="branch"
                id="branch"
                placeholder="Branch"
                onChange={changeHandler}
                value={user.branch}
              />
              <p className={basestyle.error}>{formErrors.branch}</p>
              <input
                type="text"
                name="gender"
                id="gender"
                placeholder="Gender"
                onChange={changeHandler}
                value={user.gender}
              />
              <p className={basestyle.error}>{formErrors.gender}</p>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                onChange={changeHandler}
                value={user.phone}
              />
              <p className={basestyle.error}>{formErrors.phone}</p>
              <input
                type="file"
                name="cv"
                id="cv"
                onChange={changeHandler}
                accept=".pdf,.doc,.docx"
              />
            </div>
            <div className={registerstyle.rightSide}>
              <input
                type="text"
                name="college"
                id="college"
                placeholder="College Name"
                onChange={changeHandler}
                value={user.college}
              />
              <p className={basestyle.error}>{formErrors.college}</p>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={changeHandler}
                value={user.email}
              />
              <p className={basestyle.error}>{formErrors.email}</p>
              <input
                type="text"
                name="degree"
                id="degree"
                placeholder="Highest Degree"
                onChange={changeHandler}
                value={user.degree}
              />
              <p className={basestyle.error}>{formErrors.degree}</p>
              <input
                type="text"
                name="specialization"
                id="specialization"
                placeholder="Specialization"
                onChange={changeHandler}
                value={user.specialization}
              />
              <p className={basestyle.error}>{formErrors.specialization}</p>
              <input
                type="text"
                name="sfid"
                id="sfid"
                placeholder="SF ID"
                onChange={changeHandler}
                value={user.sfid}
              />
              <p className={basestyle.error}>{formErrors.sfid}</p>
            </div>
          </div>
          <button className={basestyle.button_common} onClick={signupHandler}>
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
