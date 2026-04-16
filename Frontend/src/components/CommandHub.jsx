import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Plus, 
  BarChart3, 
  Settings, 
  MessageSquare, 
  Zap, 
  ChevronRight,
  Target,
  Users,
  Eye,
  Home
} from 'lucide-react';

const CommandHub = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const tools = [
    { icon: <Home size={18} />, label: "Home", path: "/" },
    { icon: <BarChart3 size={18} />, label: "Sentiment Dashboard", path: "/dashboard" },
    { icon: <Zap size={18} />, label: "Trend Engine", path: "/trends" },
    { icon: <Target size={18} />, label: "Sales Impact", path: "/sales-impact" },
    { icon: <Users size={18} />, label: "Competitor Tracker", path: "/competitors" },
    { icon: <MessageSquare size={18} />, label: "Query AI", path: "/chatbot" },
    { icon: <Eye size={18} />, label: "Human Review", path: "/human-review" },
  ];

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[60] flex items-center gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="glass rounded-[32px] p-2 flex flex-col gap-2 shadow-[20px_0_60px_rgba(0,0,0,0.1)] border-lime-neon/20 border-2"
          >
            {tools.map((tool, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  navigate(tool.path);
                  setIsOpen(false);
                }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all group relative ${
                  location.pathname === tool.path 
                    ? 'bg-lime-neon text-charcoal shadow-[0_0_15px_rgba(190,242,100,0.3)]' 
                    : 'text-charcoal-muted hover:bg-lime-neon/10 hover:text-charcoal'
                }`}
              >
                {tool.icon}
                <div className="absolute right-full mr-4 bg-charcoal text-white text-[10px] font-mono px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {tool.label}
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${isOpen ? 'bg-charcoal text-white translate-x-12' : 'lime-gradient text-charcoal'}`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
        >
          {isOpen ? <ChevronRight size={20} /> : <Plus size={20} />}
        </motion.div>
      </motion.button>

      {/* Vertical Breadcrumb Label */}
      {!isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-12 py-4">
          <span className="vertical-text mono-label flex items-center gap-4">
            <span className="w-1 h-1 rounded-full bg-lime-neon" />
            Control Hub
            <span className="w-1 h-1 rounded-full bg-lime-neon" />
          </span>
        </div>
      )}
    </div>
  );
};

export default CommandHub;

