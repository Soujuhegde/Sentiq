import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const AnnouncementBar = () => {
  return (
    <div className="flex justify-center pt-32 pb-6 px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-primary/20 border border-lime-primary/30 shadow-sm"
      >
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-charcoal">
          <Sparkles size={12} className="text-lime-neon fill-lime-neon" />
          New
        </span>
        <div className="w-px h-3 bg-charcoal/10" />
        <span className="text-sm font-medium text-charcoal-muted">
          Real-time review intelligence engine launched
        </span>
        <motion.span 
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-charcoal-muted ml-1"
        >
          →
        </motion.span>
      </motion.div>
    </div>
  );
};

export default AnnouncementBar;
