import "./App.css";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import TestPortal from "./Components/TestPortal/TestPortal";
import QuizPage from "./Components/QuizPage/QuizPage";
import Congrats from "./Components/Congrats/Congrats";
import Instruction from "./Components/Instruction/Instruction";
import Stream from "./Components/Stream/Stream";
function App() {
  const [userstate, setUserState] = useState({
  });
  return (
    <>
      
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              userstate && userstate._id ? (
                <Profile
                  setUserState={setUserState}
                  username={userstate.fname}
                />
              ) : (
                <Login setUserState={setUserState} />
              )
            }
          ></Route>
          <Route
            path="/login"
            element={<Login setUserState={setUserState} />}
          ></Route>
          <Route path="/signup" element={<Register />}></Route>
          {/* <Route path="/Test" element ={<TestPortal/>}></Route> */}
          <Route path="/Quiz" element ={<QuizPage/>}></Route>
          <Route path="/Instruction" element ={<Instruction/>}></Route>
          <Route path="/Congrats" element ={<Congrats/>}></Route>
          <Route path="/Stream" element ={<Stream/>}></Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
