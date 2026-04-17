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
import Layout from './components/Layout';

import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "trends", element: <Trends /> },
      { path: "competitors", element: <Competitors /> },
      { path: "chatbot", element: <Chatbot /> },
      { path: "sales-impact", element: <SalesImpact /> },
      { path: "human-review", element: <HumanReview /> },
      { path: "demo", element: <Chatbot /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export { router };
export default function App() {
  return null; // The router is rendered in main.jsx via RouterProvider
}




