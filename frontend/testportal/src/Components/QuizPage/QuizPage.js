// TestPortal.js

import React from 'react';
import './QuizPage.css';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestrictCopyPaste } from "../Copy_Paste.ts"
import axios from "axios";
const QuizPage = () => {
    const [randomQuestions, setRandomQuestions] = useState([]);
  const [marks, setMarks] = useState([]);
  const [count, setCount] = useState(0);
  const [showResult,setShowResult]=useState(false);
  const [timeLeft, setTimeLeft] = useState(() => {
    const storedTime = localStorage.getItem('startTime');
    if (storedTime) {
      const elapsedSeconds = Math.floor((Date.now() - parseInt(storedTime)) / 1000);
      console.log(elapsedSeconds)
      return Math.max(12000 - elapsedSeconds, 0); // Time limit in seconds (300 seconds = 5 minutes)
    }
    return 12000
  });

  useEffect(async() => {
    const storedQuestions = localStorage.getItem('randomQuestions');
    if (storedQuestions) {
      setRandomQuestions(JSON.parse(storedQuestions));
      setMarks(new Array(JSON.parse(storedQuestions).length).fill(false));
    } else {
      let question = [];
      let q=""
      if(localStorage.getItem('teststream')==="B.Tech")
      {
        q=q+"B"
      }
      else{
        q=q+"M"
      }
      if(localStorage.getItem('testbranch')==="Computer Science/Information Technology")
      {
        q=q+"CSE"
      }
      else if(localStorage.getItem('testbranch')==="Electrical and Communication")
      {
        q=q+"ET"
      }
      else if(localStorage.getItem('testbranch')==="Electrical and Electronics")
      {
        q=q+"EE"
      }
      else{
        q=q+"ME"
      }
      console.log(q);
      const p=new URLSearchParams({stream:q});
      try {
        const response = await axios.get(`http://localhost:8000/questions/?${p}`);
        console.log(response.data.data);
        question=response.data.data

        
      } catch (error) {
        console.error('Error getting question::', error);
      }
      

      const shuffledQuestions = question.sort(() => Math.random() - 0.5).slice(0, 5).map(q => {
        return {
          ...q,
          options: q.options.sort(() => Math.random() - 0.5)
        };
      });

      setRandomQuestions(shuffledQuestions);
      setMarks(new Array(shuffledQuestions.length).fill(false));
      localStorage.setItem('randomQuestions', JSON.stringify(shuffledQuestions));
    }
  }, []);


  //Restricts copy paste
  // useRestrictCopyPaste({window, actions:["copy","cut","paste"]});

    // const handleTabSwitch = () => {
    //     alert("Tab switching is not allowed!Your Activity is Recorded");
    // }
    //   // Tab switch prevent
    //   useEffect(() => {
    //     document.addEventListener("visibilitychange", handleTabSwitch);
    //     return () => {
    //       document.removeEventListener("visibilitychange", handleTabSwitch);
    //     };
    //   }, []);
    // window.onblur = function () { 
    //   alert('Tab switching is prohibited!');
    // }; 
    
      //Stroing time in cookie
      useEffect(() => {
        if(!localStorage.getItem('startTime')){
           localStorage.setItem('startTime', Date.now());
        }
      }, []);
      
      //Time set
      useEffect(() => {
        const timer = setTimeout(() => {
          if (timeLeft > 0) {
            setTimeLeft(prevTime => prevTime - 1);
          } else {
            // Auto-submit the quiz when time runs out
            return ()=>{window.location.href="/congrats"}
          }
        }, 1000);
        
        return () => clearTimeout(timer);
      }, [timeLeft]);
      
      //Disable Back Button
      
      function handleUpdate(e, i) {
        if (e.target.value === randomQuestions[i].answer) {
          setMarks([...marks.slice(0, i), true, ...marks.slice(i + 1)]);
        } else {
          setMarks([...marks.slice(0, i), false, ...marks.slice(i + 1)]);
        }
      }

      // useEffect(() => {
      //   const handleRightClick = (event) => {
      //     event.preventDefault();
      //   };
    
      //   document.addEventListener('contextmenu', handleRightClick);
    
      //   return () => {
      //     document.removeEventListener('contextmenu', handleRightClick);
      //   };
      // }, []);

      // useEffect(() => {
      //   const handleKeyDown = (event) => {
      //     // Define an array of key codes you want to block
      //     const blockedKeys = ['F12', 'Control', 'Shift', 'Alt'];
    
      //     // Check if the pressed key is in the blockedKeys array
      //     if (blockedKeys.includes(event.key)) {
      //       event.preventDefault();
      //     }
      //     if ((event.ctrlKey && event.shiftKey && event.key === 'I') || (event.ctrlKey && event.shiftKey && event.key === 'U') 
      //     || (event.ctrlKey && event.shiftKey && event.key === 'C') || (event.ctrlKey && event.shiftKey && event.key === 'J') ) {
      //       event.preventDefault();
      //     }
          
      //   };
      
      //   document.addEventListener('keydown', handleKeyDown);
    
      //   return () => {
      //     document.removeEventListener('keydown', handleKeyDown);
      //   };
      // }, []);

      function getScore() {
        setShowResult(true);
        let count = marks.filter(mark => mark === true).length;
        setCount(count);
        console.log(count)
        localStorage.setItem('score', count);
        localStorage.setItem('outoff',randomQuestions.length)
      }

  return (
    <div>
      <header>
        <h1>Whirlpool eSpace - Intern</h1>
          <h1>{localStorage.getItem("teststream")} {localStorage.getItem("testbranch")} Skill Test</h1>
          
      </header>
        <div className="timer-container">
        <div className="timer">
          Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </div>
      <div className="skill-test">
      <div className="quiz">
        {
        randomQuestions.map((item, i) => (
        <div className="question" key={i}>
          <h2>{i+1}) {item.question}</h2>
          {item.options.map((option, index1) => (
            <div className="option" key={index1}>
              <input
                type="radio"
                name={item.question}
                value={option}
                onChange={e => handleUpdate(e, i)}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      ))
      }
      </div>
      <div className="button-group">
            <button className="submit-button" onClick={getScore}>Submit</button>
        </div>
        {showResult && <div className="result">{
        "Do you want to Submit the Test ?"
        }
        <br/>
        <button onClick={()=>{window.location.href="/congrats"}}>Yes</button>
        <button onClick={()=>{setShowResult(false)}}>No</button>
        </div>}
        </div>
      </div>
    // </div>
  );
};

export default QuizPage;
