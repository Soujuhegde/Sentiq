import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

// Lazy loading could be added here, but for simplicity we import directly.
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Trends from './pages/Trends';
import Competitors from './pages/Competitors';
import Chatbot from './pages/Chatbot';
import SalesImpact from './pages/SalesImpact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="trends" element={<Trends />} />
          <Route path="competitors" element={<Competitors />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="sales-impact" element={<SalesImpact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
