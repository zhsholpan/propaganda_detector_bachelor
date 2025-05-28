// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ResultsPage from './pages/ResultsPage';
import TechniquePage from './pages/TechniquePage';
import AboutPage from './pages/AboutPage';
import ExamplesPage from './pages/ExamplesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/technique/:name" element={<TechniquePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/examples" element={<ExamplesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
