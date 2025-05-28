import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>
        Propaganda Detection System <span role="img" aria-label="magnifier">🔍</span>
      </h1>
      <p style={styles.subtitle}>
        <strong>Identify Hidden Manipulation in Texts</strong>
      </p>
      <p style={styles.description}>
        This tool analyzes your sentence and highlights any propaganda techniques it finds, helping you recognize
        biased or emotionally charged content in news, tweets, or everyday communication.
      </p>
    </header>
  );
};

const styles = {
  header: {
    padding: '40px 20px 10px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1rem',
    marginBottom: '0.3rem',
  },
  description: {
    fontSize: '0.9rem',
    color: '#555',
    maxWidth: '600px',
    margin: '0 auto',
  }
};

export default Header;
