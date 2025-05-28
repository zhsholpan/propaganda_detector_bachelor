import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './TechniquePage.css';

const TechniquePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  if (!state || !state.technique) {
    return (
      <div className="app-container">
        <div className="content-wrapper">
          <h2>No technique selected.</h2>
          <button className="primary-button" onClick={() => navigate('/results')}>
            Back to Results
          </button>
        </div>
      </div>
    );
  }

  const {
    technique,
    input,
    explanation,
    definition,
    why
  } = state;

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1 className="technique-title">{technique}</h1>
        <p className="technique-subtitle">
          {explanation || 'A propaganda technique that uses emotionally charged language to manipulate the audience.'}
        </p>

        <button onClick={() => navigate('/results')} className="primary-button">
          Back to Results
        </button>

        {/* Definition Section */}
        <div className="definition-section">
          <div className="definition-left">
            <h2>Definition</h2>
            <p>{definition || 'A form of propaganda that uses emotionally loaded language to sway opinions.'}</p>
          </div>
          <div className="definition-card">
            <div className="icon-box">📢</div>
            <div>
              <strong>{technique}</strong>
              <p className="definition-card-desc">
                {explanation || 'Explanation not available.'}
              </p>
            </div>
          </div>
        </div>

        {/* Example Section */}
        <h2 className="example-header">Example Sentence</h2>
        <div className="example-table">
          <div className="row">
            <div className="label">Original Input Sentence</div>
            <div className="value"><em>{input}</em></div>
          </div>
          {/* Removed Highlighted Part row */}
          <div className="row">
            <div className="label">Why Detected</div>
            <div className="value"><em>{why || 'Reason not provided by the system.'}</em></div>
          </div>
        </div>

        <div className="explore-more">
          <p>
            Explore more examples of <strong>{technique}</strong> or other propaganda techniques.
          </p>
        </div>
      </div>

      <footer>
        <Link to="/about" className="footer-link">About us</Link>
      </footer>
    </div>
  );
};

export default TechniquePage;
