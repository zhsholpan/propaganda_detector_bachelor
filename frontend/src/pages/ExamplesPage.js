import React, { useEffect, useState } from 'react';
import './ExamplesPage.css';

const ExamplesPage = () => {
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetch(`http://localhost:8000/examples?limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setExamples(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Failed to fetch examples:", err);
        setLoading(false);
      });
  }, [limit]);

  const loadMore = () => setLimit(prev => prev + 5);

  return (
    <div className="examples-container">
      <div className="examples-wrapper">
        <h1 className="examples-title">Propaganda Examples</h1>
        <p className="examples-subtitle">
          These are example sentences with labeled propaganda techniques from a prepared dataset.
          They help demonstrate what kind of biased language the system detects and how specific spans are highlighted.
        </p>

        {loading && <p className="examples-subtitle">Loading examples...</p>}
        {!loading && examples.length === 0 && (
          <p className="examples-subtitle">No labeled examples found.</p>
        )}

        {examples.map((ex, idx) => (
          <div key={idx} className="example-card">
            {ex.article_id && (
              <p className="example-id">Article ID: {ex.article_id}</p>
            )}
            <p className="example-text">
              <strong>Text:</strong> {ex.text}
            </p>
            <div>
              <p className="techniques-title">Detected Techniques:</p>
              <ul className="technique-list">
                {ex.techniques.map((t, i) => (
                  <li key={i}>
                    <span className="tech-label">{t.label}</span>:{" "}
                    <span className="tech-span">{t.span}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {!loading && examples.length >= limit && (
          <div className="load-more-container">
            <button className="load-more-button" onClick={loadMore}>
              Load more examples
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamplesPage;
