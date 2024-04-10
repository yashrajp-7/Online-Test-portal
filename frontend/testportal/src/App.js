import "./App.css";
import AdminLogin from "./Components/AdminLogin/ALogin";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import QuizPage from "./Components/QuizPage/QuizPage";
import Congrats from "./Components/Congrats/Congrats";
import Instruction from "./Components/Instruction/Instruction";
import Admin from "./Components/Admin/Admin";
import Result from "./Components/Result/Result";
import Charts from "./Components/Charts/Charts";
import PasswordChangePage from "./Components/PasswordChange/Passwordchange";
function App() {
  const [userstate, setUserState] = useState({
  });
  return (
    
    <div className="App">
      <Router>
        <Routes>
       
          <Route path="/adminlogin" element={<AdminLogin/>}></Route>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/Admin" element ={<Admin/>}></Route>
          <Route path="/Quiz" element ={<QuizPage/>}></Route>
          <Route path="/Instruction" element ={<Instruction/>}></Route>
          <Route path="/Congrats" element ={<Congrats/>}></Route>
          <Route path="/Result" element ={<Result/>}></Route>
          <Route path="/password" element ={<PasswordChangePage/>}></Route>
          <Route path="/chart" element ={<Charts/>}></Route>
        </Routes>
      </Router>
 </div>
 
  );
}

export default App;
