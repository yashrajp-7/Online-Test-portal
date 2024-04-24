import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import chart from '../../Assets/chart.png';
import res from '../../Assets/result (2).png';
import pas from '../../Assets/pass.png';
import paper from '../../Assets/question.png';
import './Pmenu.css';

export const Pmenu = () => {

    const navigate = useNavigate();

    const toResult = () => {
  
        navigate('/Result');
    }
    const topass=()=>
      {
        navigate('/password');
    }
    const toPaper=()=>{
        navigate('/admin');
    }
    const toChart=()=>{
        navigate('/chart');
    }
    
  return (
    <div className='menu4'>
        <div className='icons4'>
        <button className="icon-button4" title='Upload Questions' aria-label="Home" onClick={toPaper}>
            <img src={paper} />
          </button>
          <span className='icon-label4' onClick={toPaper}>Upload Questions</span>
      <button className="icon-button4" title='Result' aria-label="result" onClick={toResult}>
            <img src={res} /> 
          </button>
          <span className='icon-label4' onClick={toResult} >Result</span>
          <button className="icon-button4" title='Statistics' aria-label="chart" onClick={toChart}>
            <img src={chart} />
          </button>
          <span className='icon-label4' onClick={toChart}>Statistics</span>
      <button className="icon-button4" title='Change Password' aria-label="password" onClick={topass}>
          <img src={pas} />
      </button>
      <span className='icon-label4' onClick={topass}>Change Password</span>
      </div>
    </div>
  )
}
export default Pmenu;