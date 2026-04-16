import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Trends from './pages/Trends';
import Competitors from './pages/Competitors';
import Chatbot from './pages/Chatbot';
import SalesImpact from './pages/SalesImpact';
import HumanReview from './pages/HumanReview';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const location = useLocation();

  return (
    <div className="App selection:bg-lime-neon/30 selection:text-charcoal relative">
      <div className="noise" />
      <ScrollToTop />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="/trends" element={<PageWrapper><Trends /></PageWrapper>} />
          <Route path="/competitors" element={<PageWrapper><Competitors /></PageWrapper>} />
          <Route path="/chatbot" element={<PageWrapper><Chatbot /></PageWrapper>} />
          <Route path="/sales-impact" element={<PageWrapper><SalesImpact /></PageWrapper>} />
          <Route path="/human-review" element={<PageWrapper><HumanReview /></PageWrapper>} />
          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default App;




