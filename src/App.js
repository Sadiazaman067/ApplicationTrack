import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Analytics from './Analytics';

function App() {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('jobjar');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('jobjar', JSON.stringify(applications));
  }, [applications]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard applications={applications} setApplications={setApplications} />} />
          <Route path="/analytics" element={<Analytics applications={applications} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;