import React from 'react';

const AboutSection = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>About us</p>
    </footer>
  );
};

const styles = {
  footer: {
    marginTop: '60px',
    padding: '20px 0',
    textAlign: 'center',
    borderTop: '1px solid #eee',
  },
  text: {
    color: '#555',
    fontSize: '14px',
  }
};

export default AboutSection;
