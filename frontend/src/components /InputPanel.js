import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputPanel = () => {
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();

  const onCheck = async () => {
    if (!inputText.trim()) return;

    try {
      const response = await fetch('http://127.0.0.1:8001/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      navigate('/results', { state: data }); // pass data to ResultsPage
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>Input Panel</label>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="They want to destroy our traditions and impose their values. We cannot remain silent."
        style={styles.input}
      />
      <p style={styles.example}>
        Example hint: 'They want to destroy our values...'
      </p>
      <button onClick={onCheck} style={styles.button}>
        Detect Propaganda
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'left',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '10px',
    display: 'block',
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginBottom: '8px',
  },
  example: {
    fontSize: '12px',
    color: '#777',
    marginBottom: '16px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    fontSize: '16px',
    borderRadius: '6px',
    cursor: 'pointer',
  }
};

export default InputPanel;
