import React, { useState } from 'react';
import './TestPortal.css';

const TestPortal = ({ redirectToQuizPage }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const startTest = () => {
    setShowConfirmation(false);
     window.location.href = '/quiz';
  }

  return (
    <div className="ml-skill-test-container">
      <header>
        <h1>Whirlpool eSpace - Intern</h1>
      </header>
      <div className="ml-skill-test">
        <section className="yellow-section">
          <h2>ML Skill Test</h2>
          {/* Other content specific to the ML Skill Test */}
          {/* ... */}
        </section>
        <section className="section">
          <h2>Before starting:</h2>
          <ul>
            <li>Read eSpace - ML Test</li>
            <li>Read eSpace - ML Test</li>
            <li>Read eSpace - ML Test</li>
          </ul>
          <button onClick={() => setShowConfirmation(true)}>Start test now!</button>
        </section>
        {showConfirmation && (
          <div className="confirmation-dialog">
            <p>Do you want to start the test? There will be no going back.</p>
            <button className="yes-button" onClick={startTest}>Yes</button>
            <button className="No-button" onClick={() => setShowConfirmation(false)}>No</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPortal;
