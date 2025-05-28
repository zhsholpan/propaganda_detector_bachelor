// src/pages/AboutPage.js
import React, { useState } from 'react';
import './AboutPage.css';

const AboutPage = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    alert('Thanks for your feedback!');
    setFeedback('');
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">

        {/* Title Section */}
        <h1 className="title">About This Project</h1>
        <p className="subtitle">
          This is a student-built prototype for detecting propaganda in text.
        </p>

        <hr className="divider" />

        {/* How It Works */}
        <h2 className="how-it-works-title">How It Works</h2>
        <p className="how-it-works-desc">
          Check out the steps below to know how this propaganda detection system works.
        </p>

        <div className="card-list">
          <div className="info-card">
            <span role="img" aria-label="ABC Input" className="emoji">🔤</span>
            <div>
              <strong>User Inputs a Sentence</strong>
              <p>Simply input a sentence that you want to analyze for propaganda techniques.</p>
            </div>
          </div>

          <div className="info-card">
            <span role="img" aria-label="Brain" className="emoji">🧠</span>
            <div>
              <strong>Model Analyzes It</strong>
              <p>The system’s LSTM architecture processes the sentence for potential propaganda techniques.</p>
            </div>
          </div>

          <div className="info-card">
            <span role="img" aria-label="Magnifier" className="emoji">🔍</span>
            <div>
              <strong>Detected Techniques Revealed</strong>
              <p>The system displays the detected techniques with detailed explanations.</p>
            </div>
          </div>
        </div>

        <hr className="divider" />

        {/* Feedback Form */}
        <h2 className="feedback-title">Submit Feedback</h2>
        <p className="feedback-desc">Your feedback is valuable to us. Let us know if this tool was helpful.</p>

        <div className="feedback-form">
          <textarea
            placeholder="Share your thoughts..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>

        <p className="note">
          This tool is in early development. Your feedback helps improve future versions.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
