import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-60 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
          
          <div className="lg:w-2/3">
            <div className="flex items-center gap-4 mb-12">
              <span className="mono-label">Final Node Initialization</span>
              <div className="w-px h-8 bg-charcoal/20" />
              <div className="mono-label text-lime-neon font-bold uppercase">Claude-v3 Verified</div>
            </div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-[9rem] font-black text-charcoal mb-16 leading-[0.8] tracking-tight"
            >
              Start <br /> 
              <span className="text-lime-neon drop-shadow-2xl italic">Scaling.</span>
            </motion.h2>
            
            <div className="flex flex-wrap items-center gap-12">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="px-16 py-8 bg-charcoal text-white rounded-[32px] text-3xl font-black shadow-[40px_40px_100px_rgba(0,0,0,0.2)] hover:bg-black transition-all"
              >
                Enter Platform
              </motion.button>
              
              <div className="max-w-[200px]">
                <p className="text-sm text-charcoal-muted font-bold leading-tight uppercase opacity-60">
                  Ready for strategic deployment. Claude-driven analysis starts instantly.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3 hidden lg:block">
            <div className="vertical-text mono-label text-[12px] opacity-20 hover:opacity-100 transition-opacity uppercase font-bold">
               Strategic Intelligence Platform // Neural Infrastructure // v.2026.SENTIQ
            </div>
          </div>

        </div>
      </div>
      
      {/* Background Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-lime-neon/5 rounded-full blur-[150px] -z-10 animate-pulse" />
    </section>
  );
};

export default FinalCTA;

