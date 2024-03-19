import React from 'react';
import logo from '../../Assets/congratsp.png';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import "./Congrats.css";
export default function Congrats() {
    const marks=localStorage.getItem("score");
    const outoff=localStorage.getItem("outoff");
    function handleClick(){
        window.location.href = '/login';
    }
    const { width, height } = useWindowSize()
    return (
        <div className="congrats-container">
            <Confetti width={width} height={height}/>
            <img src={logo} alt="congrats" />
            <h1>Congratulations! Your Test Has Been Submitted!!!!!</h1>
            <h2>Your scored {marks}/{outoff}</h2>
            <button onClick={handleClick}>Log Out</button>
        </div>
    )
}