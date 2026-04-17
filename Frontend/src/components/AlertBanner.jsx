import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, X } from 'lucide-react';
import { motion } from 'framer-motion';

const AlertBanner = ({ message = "Unusual activity detected in Batch 4022 customer feedback.", type = "critical" }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="relative group overflow-hidden rounded-[24px] bg-charcoal p-[1px]">
        {/* Animated Neon Border */}
        <div className="absolute inset-x-[-50%] inset-y-[-50%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#BEF264_360deg)] animate-[spin_4s_linear_infinite] opacity-50" />
        
        <div className="relative bg-[#1a1a1a] rounded-[23px] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-xl bg-lime-neon/10 flex items-center justify-center border border-lime-neon/20">
              <AlertTriangle className="text-lime-neon" size={20} />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-0.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-lime-neon font-bold">Priority One</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">Unusual Activity Detected</span>
              </div>
              <p className="text-white font-medium text-lg tracking-tight">
                {message}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/human-review')}
              className="bg-lime-neon text-charcoal px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(190,242,100,0.2)]"
            >
              Investigate
            </button>
            <button className="text-white/20 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AlertBanner;

