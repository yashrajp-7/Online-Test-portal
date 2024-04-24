

import { useEffect } from "react";
import logo from '../../Assets/congratsp.png';
import logo1 from '../../Assets/whirpool7915.jpg';
import axios from "axios";
import "./Congrats.css";

export default function Congrats() {
    const marks = localStorage.getItem("score");
    const outoff = localStorage.getItem("outoff");

    function handleClick() {
        console.log(localStorage.clear());
        window.location.href = '/login';
    }

    useEffect(() => {
        if (localStorage.getItem("tempid") === null) {
            window.location.href = "/"
        }
        // Prevent body from scrolling
        document.body.style.overflow = 'hidden';

        return () => {
            // Re-enable scrolling when component unmounts
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        const formData = new FormData();
    
        formData.append('email', localStorage.getItem("email"));
        formData.append('score', localStorage.getItem("score"));
        formData.append('test_taken', "True");
        formData.append('TabSwitchCount', localStorage.getItem("TabSwitchCount"));
        axios.post('http://127.0.0.1:8000/submit/answer/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log(response.data.message);
                localStorage.setItem("test_taken", true);
            })
            .catch(error => {
                console.error(error);
            });
    
    });

  

    return (
        <div className="congrats-container">
            <div className="logo-container">
                <img src={logo1} alt="Whirlpool Logo" />
            </div>
            <img src={logo} alt="congrats" />
            <h1>Congratulations! </h1>
            <h1>Your Test Has Been Submitted!</h1>
            <button onClick={handleClick}>Log Out</button>
        </div>
    );
}
