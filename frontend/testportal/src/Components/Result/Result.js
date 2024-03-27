import React from 'react';
import { useState,useEffect } from 'react';
import Navbar from "../Admin/Navbar";
import { useNavigate } from 'react-router-dom';
import './Result.css';
import axios from "axios";
export const Result = () => {
  const [tableData, setTableData] = useState([]);
  const [data,setdata]=useState({});
  useEffect(()=>{
    if(localStorage.getItem("loginemail")===null)
    {
      window.location.href="/adminlogin"
    }
  })
  useEffect(async() => {
    let res = [];
        try {
            const response = await axios.get('http://127.0.0.1:8000/submit/result/');
            console.log(response.data.message);
            res=response.data.message
            setTableData(res)
            setdata(res);
            console.log(data.Name)
    
            
          } catch (error) {
            console.error('Error getting question::', error);
          }
      },[]
    );
    const handleurl = (url) => {
  
      window.open(url,'_blank');
      
    };
  return (
    <div className='main'>
        <Navbar /> 
        <h1>Result of Students</h1>
        <table className='report' border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>College</th>
            <th>Roll No</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Highest Degree</th>
            <th>Phone No.</th>
            <th>SF ID</th>
            <th>Degree</th>
            <th>Stream</th>
            <th>Score</th>
            <th>CV/Resume</th>
            <th>Test Taken</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
        
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{data.Name}</td>
              <td>{data.College_Name}</td>
              <td>{data.Rollno}</td>
              <td>{data.EmailID}</td>
              <td>{data.Gender}</td>
              <td>{data.Highest_Degree_and_Specialization}</td>
              <td>{data.Phone_Number}</td>
              <td>{data.SFID}</td>
              <td>{data.Stream}</td>
              <td>{data.Branch}</td>
              <td>{data.Score}</td>
              <td>
              <button  onClick={() => handleurl(data.Resume_Link)}>
              Resume Link
            </button></td>
              <td>{data.Test_Taken===true?"True":"False"}</td>
              {/* Add more table data cells as needed */}
            </tr>
          ))}
        </tbody>
        </table>
    </div>
  )
}

export default Result;