

import React from 'react';
import './QuizPage.css';
import { useState,useEffect } from 'react';
import logo from '../../Assets/whirpool7915.jpg';
import { useRestrictCopyPaste } from "../Copy_Paste.ts"
import axios from "axios";
import Qnavbar from './Qnavbar';
import Swal from 'sweetalert2'

const QuizPage = () => {
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [marks, setMarks] = useState([]);
  const [options,setoption]=useState([]);
  const [count, setCount] = useState(0);
  const [showResult,setShowResult]=useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [timeLeft, setTimeLeft] = useState();
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [parts, setParts] = useState([]);
  const NoofQuestionsPerPage=5;
  const [TabSwitch,setTabSwitch]=useState(0)
  useEffect(()=>{
    if(localStorage.getItem("tempid")===null || localStorage.getItem("test_taken")==="true")
    {
      window.location.href="/"
    }
  })
  useEffect(async() => {
          let question = [];
          const p=new URLSearchParams({stream:localStorage.getItem("teststream"),branch:localStorage.getItem("testbranch")});
          // Check if shuffled questions and parts are available in local storage
          let storedShuffledQuestions = localStorage.getItem("shuffledQuestions");
          let storedParts = localStorage.getItem("parts");

          if (storedShuffledQuestions && storedParts) {
            // If available, parse and use them
            storedShuffledQuestions = JSON.parse(storedShuffledQuestions);
            storedParts = JSON.parse(storedParts);
            setRandomQuestions(storedShuffledQuestions);
            setParts(storedParts);
            setMarks(new Array(storedShuffledQuestions.length).fill(false));
            setoption(new Array(storedShuffledQuestions.length).fill(10));
          }else{
            try {
              const response = await axios.get(`https://arun2024.pythonanywhere.com/questions/?${p}`);
              console.log(response.data.data);
              question=response.data.data
      
              
            } catch (error) {
              console.error('Error getting question::', error);
            }
      
            const shuffledQuestions = question.sort(() => Math.random() - 0.5).slice(0, 10).map(q => {
              return {
                ...q,
                options: q.options.sort(() => Math.random() - 0.5)
              };
            });
      
            localStorage.setItem("shuffledQuestions", JSON.stringify(shuffledQuestions));
            const parts = [];
            for (let i = 0; i < shuffledQuestions.length; i += NoofQuestionsPerPage) {
              parts.push(shuffledQuestions.slice(i, i + NoofQuestionsPerPage));
            }
            localStorage.setItem("parts", JSON.stringify(parts));
            setRandomQuestions(shuffledQuestions);
            setParts(parts);
            setMarks(new Array(shuffledQuestions.length).fill(false));
            setoption(new Array(shuffledQuestions.length).fill(10));
          }
          
      }, []);
      useEffect(
        () => {
          const storedTime = localStorage.getItem('startTime');
          if (storedTime) {
            const elapsedSeconds = Math.floor((Date.now() - parseInt(storedTime)) / 1000);
            console.log(elapsedSeconds)
            setTimeLeft(Math.max(1800 - elapsedSeconds, 0)); // Time limit in seconds (300 seconds = 5 minutes)
          }
          else{
          setTimeLeft(1800)}
        },[]
      )
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
          
    document.addEventListener('fullscreenchange', onFullscreenChange);
  
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);
   
  const preventCopyPaste = (e) => {
    Swal.fire({
      title: "Copy, Paste and Cut is not allowed!",
      icon: 'error',
    });
    e.preventDefault();
    
  }


  // Restricts copy paste
  // useRestrictCopyPaste({window, actions:["copy","cut","paste"]});

  //Restricts Tab Switch

    const handleTabSwitch = () => {
      Swal.fire({
        title: "Tab switching is not allowed!Your Activity is Recorded",
        // text: "You clicked the button!",
        icon: 'error',
      });
        setTabSwitch(TabSwitch=>TabSwitch+1);
    }
      // Tab switch prevent
      useEffect(() => {
        document.addEventListener("visibilitychange", handleTabSwitch);
        return () => {
          document.removeEventListener("visibilitychange", handleTabSwitch);
        };
      });

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
            autosubmit()

          }
        }, 1000);
        
        return () => clearTimeout(timer);
      }, [timeLeft]);
      
      //Function for changing the marks array
      function handleUpdate(e, i,id) {
        console.log(randomQuestions)
        setoption([...options.slice(0,i),id,...options.slice(i+1)]);
        if (e.target.value === randomQuestions[i].answer) {
          setMarks([...marks.slice(0, i), true, ...marks.slice(i + 1)]);

        } else {
          setMarks([...marks.slice(0, i), false, ...marks.slice(i + 1)]);
        }
      }
      
      // This handles right click block
      useEffect(() => {
        const handleRightClick = (event) => {
          event.preventDefault();
        };
    
        document.addEventListener('contextmenu', handleRightClick);
    
        return () => {
          document.removeEventListener('contextmenu', handleRightClick);
        };
      }, []);

      // This blocks all the keypress events

      useEffect(() => {
        const handleKeyDown = (event) => {
          // Define an array of key codes you want to block
          const blockedKeys = ['F12', 'Shift', 'Alt'];
    
          // Check if the pressed key is in the blockedKeys array
          if (blockedKeys.includes(event.key)) {
            event.preventDefault();
          }
          if ((event.ctrlKey && event.shiftKey && event.key === 'I') || (event.ctrlKey && event.shiftKey && event.key === 'U') 
          || (event.ctrlKey && event.shiftKey && event.key === 'C') || (event.ctrlKey && event.shiftKey && event.key === 'J') ) {
            event.preventDefault();
          }
          
        };
      
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, []);


      //This autosubmits when time gets out
      function autosubmit(){
        getScore()
        window.location.href="/congrats"
      }

      function getScore() {
        setShowResult(true);
        let count = marks.filter(mark => mark === true).length;
        setCount(count);
        localStorage.setItem('score', count);
        localStorage.setItem('outoff',randomQuestions.length)
        localStorage.setItem('TabSwitchCount',TabSwitch)
      }
      const handleNext = () => {
        if (currentPartIndex < parts.length - 1) {
          setCurrentPartIndex(currentPartIndex + 1);
        }
      };


      const handlePrev = () => {
        if (currentPartIndex > 0) {
          setCurrentPartIndex(currentPartIndex - 1);
        }
      };
      

      return (
        <div className="main" style={{width:"100%",height:"100%"}}  onCopy={(e) => preventCopyPaste(e)}
        onPaste={(e) => preventCopyPaste(e)}
        onCut={(e) => preventCopyPaste(e)}>
          <Qnavbar/>
          
            <div className="timer-container">
              
              <div className='timer-container-row'>
            
            <div className="timer">
              Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            
            </div>
            <div className='timer-container-row'>
            {currentPartIndex>0 && <button className="prev-button" onClick={handlePrev}>{'< Previous'}</button>}
              {currentPartIndex<parts.length-1 && <button className="next-button" onClick={handleNext}>{'Next >'}</button>}
              </div>
              <div className='timer-container-row'>
              <div className="button-group">
              
                <button className="submit-button2" onClick={getScore}>Submit</button>
            </div>
            </div>
          </div>
          <div className="skill-test" style={{width:"100%",height:"90%"}}>
            {Object.keys(parts).length > 0 && (
            <div className="quiz">
              <header>
              <h1 className="ml" >{localStorage.getItem("teststream")} {localStorage.getItem("testbranch")} Skill Test</h1>
          </header>
              {Object.keys(parts[currentPartIndex]).map((key, i) => (
                <div className="question" key={i}>
                  <h2>{currentPartIndex * NoofQuestionsPerPage + i + 1}) {parts[currentPartIndex][key].question}</h2>
                  {parts[currentPartIndex][key].options.map((option, optionIndex) => (
                    <div>
                    {(options[currentPartIndex*NoofQuestionsPerPage+i]===optionIndex) && (
                      <div className={`option`} key={optionIndex}>
                        <input
                        type="radio"
                        id={`${currentPartIndex * NoofQuestionsPerPage + i}-${optionIndex}`}
                        name={`question-${currentPartIndex * NoofQuestionsPerPage + i}`}
                        value={option}
                        checked="checked"
                        onChange={e => handleUpdate(e, currentPartIndex*NoofQuestionsPerPage+i,optionIndex)}
                      />
                      <label htmlFor={`${currentPartIndex * NoofQuestionsPerPage + i}-${optionIndex}`} >{option}</label>
                    </div>
                    )}
                    {(options[currentPartIndex*NoofQuestionsPerPage+i]!==optionIndex) && (
                      <div className={`option`} key={optionIndex}>
                        <input
                        type="radio"
                        id={`${currentPartIndex * NoofQuestionsPerPage + i}-${optionIndex}`}
                        name={`question-${currentPartIndex * NoofQuestionsPerPage + i}`}
                        value={option}
                        onChange={e => handleUpdate(e, currentPartIndex*NoofQuestionsPerPage+i,optionIndex)}
                      />
                      <label htmlFor={`${currentPartIndex * NoofQuestionsPerPage + i}-${optionIndex}`} >{option}</label>
                    </div>
                    )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          
            {showResult && <div className="result">{
            "Do you want to Submit the Test ?"
            }
            <br/>
            <button onClick={()=>{window.location.href="/congrats"}} className='Yes_button'>Yes</button>
            <button onClick={()=>{setShowResult(false)}} className='No_Button'>No</button>
            </div>}
          </div>
          
        </div>
      );
    };

export default QuizPage;