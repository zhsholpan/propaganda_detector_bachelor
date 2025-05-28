// src/pages/ResultsPage.js
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './ResultsPage.css';

const ResultsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.result) {
    return (
      <div className="app-container">
        <div className="content-wrapper">
          <h1>Propaganda Detection Results</h1>
          <p>No input provided. Please go back and enter a sentence.</p>
          <button className="primary-button" onClick={() => navigate('/')}>
            Back to Homepage
          </button>
        </div>
      </div>
    );
  }

  const { input, result } = state;
  const predictions = result.predictions;
  const firstTechnique = Object.keys(predictions)[0];
  const firstDetails = predictions[firstTechnique];

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1>Propaganda Detection Results</h1>

        <label htmlFor="analyzedInput">Input Analyzed</label>
        <input
          id="analyzedInput"
          type="text"
          value={input}
          disabled
          placeholder="Enter text analyzed..."
        />

        <div className="highlighted-text">{input}</div>

        {Object.keys(predictions).length > 0 && (
          <button
            className="primary-button"
            onClick={() =>
              navigate(`/technique/${firstTechnique.toLowerCase().replace(/\s+/g, '-')}`, {
                state: {
                  technique: firstTechnique,
                  input,
                  span: firstDetails.highlight || input,
                  explanation: firstDetails.explanation || '',
                  definition: firstDetails.definition || '',
                  why: firstDetails.why || '',
                },
              })
            }
          >
            Learn more
          </button>
        )}

        <h2 className="section-title">Detected Propaganda Techniques</h2>

        {Object.keys(predictions).length === 0 ? (
          <p>✅ No propaganda detected.</p>
        ) : (
          <div className="techniques-list">
            {Object.entries(predictions).map(([technique, details]) => (
              <div className="technique-item" key={technique}>
                <div className="left">
                  <div className="icon">📌</div>
                  <div>
                    <strong>{technique}</strong>
                    <div className="explanation">
                      {details.explanation || 'Explanation not available.'}
                    </div>
                  </div>
                </div>
                <div className="quote">
                  <em>{details.highlight || input}</em>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer>
        <Link to="/about" className="footer-link">About us</Link>
      </footer>
    </div>
  );
};

export default ResultsPage;
