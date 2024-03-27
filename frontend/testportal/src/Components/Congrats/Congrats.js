
import {useEffect } from "react";
import logo from '../../Assets/congratsp.png';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import axios from "axios";
import "./Congrats.css";
export default function Congrats() {
    const marks=localStorage.getItem("score");
    const outoff=localStorage.getItem("outoff");
    function handleClick(){
        console.log(localStorage.clear());
        window.location.href = '/login';
    }
    useEffect(()=>{
        if(localStorage.getItem("tempid")===null )
        {
          window.location.href="/"
        }
      });
    useEffect(()=>
    {
        const formData = new FormData();
    
    
    formData.append('email',localStorage.getItem("email"));
    formData.append('score',localStorage.getItem("score") );
    formData.append('test_taken',"True");
        axios.post('http://127.0.0.1:8000/submit/answer/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      
    })
      .then(response => {
        console.log(response.data.message);
        localStorage.setItem("test_taken",true);
        })
        .catch(error => {console.error( error)});
    
    })
    const { width, height } = useWindowSize()
    return (
        <div className='outer'>
        <div className="congrats-container">
            <Confetti width={width} height={height}/>
            <img src={logo} alt="congrats" />
            <h1>Congratulations! Your Test Has Been Submitted!!!!!</h1>
            <button onClick={handleClick}>Log Out</button>
        </div>
        </div>
    )
}