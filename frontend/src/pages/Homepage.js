// src/pages/Homepage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDetect = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    try {
      setError('');
      const response = await axios.post(
        'http://localhost:8000/predict',
        { text: inputText }
      );

      navigate('/results', {
        state: {
          input: inputText,
          result: response.data
        }
      });
    } catch (err) {
      console.error('Detection failed:', err);
      setError('⚠️ Failed to fetch prediction. Please make sure the backend is online.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1>Propaganda Detection System 🔍</h1>
        <p className="subtitle">Identify Hidden Manipulation in Texts</p>
        <p className="description">
          This tool analyzes your sentence and highlights any propaganda techniques it finds,
          helping you recognize biased or emotionally charged content.
        </p>

        <div className="input-section">
          <label htmlFor="inputText">Input Panel</label>
          <textarea
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="They want to destroy our traditions and impose their values."
          />
          <p className="hint">Example hint: 'They want to destroy our values…'</p>
          <button onClick={handleDetect} disabled={loading}>
            {loading ? 'Detecting...' : 'Detect Propaganda'}
          </button>
        </div>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>

      <footer>
        <div className="footer-links">
          <Link to="/about" className="footer-link" style={{ marginRight: '1rem' }}>About us</Link>
          <Link to="/examples" className="footer-link">See Examples</Link>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
