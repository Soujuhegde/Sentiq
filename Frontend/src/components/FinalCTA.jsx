import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-60 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 mb-12">
              <span className="mono-label">Final Platform Setup</span>
              <div className="w-px h-8 bg-charcoal/20" />
              <div className="mono-label text-lime-neon font-bold uppercase">Sentiq Verified</div>
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
                  Ready for strategic deployment. Gemini-driven analysis starts instantly.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 hidden lg:flex items-center justify-between gap-8 py-10">
            <div className="vertical-text mono-label text-[12px] opacity-20 hover:opacity-100 transition-opacity uppercase font-bold xl:block">
               Strategic Intelligence Platform // Business Infrastructure // v.2026.SENTIQ
            </div>
            
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full relative flex-1"
              >
                <div className="glass p-6 rounded-[40px] shadow-[30px_30px_80px_-20px_rgba(0,0,0,0.15)] border-white/60 border-2 bg-white/20 backdrop-blur-xl relative z-10 w-full max-w-md ml-auto">
                   <div className="flex justify-between items-center mb-6 px-2">
                      <span className="mono-label text-charcoal font-bold">System Status</span>
                      <span className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Online
                      </span>
                   </div>
                   <div className="h-[280px] w-full bg-charcoal/5 rounded-[24px] relative overflow-hidden flex items-center justify-center">
                      <img 
                        src="/assets/images/sentiq_dashboard_viz.png" 
                        alt="Dashboard Visualization" 
                        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80 contrast-125 hover:scale-105 transition-transform duration-1000"
                      />
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4 mt-6 px-2">
                      <div>
                        <div className="text-[10px] font-bold text-charcoal-muted uppercase mb-1">Latency</div>
                        <div className="font-mono text-xl font-black text-charcoal">12ms</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-charcoal-muted uppercase mb-1">Node Count</div>
                        <div className="font-mono text-xl font-black text-charcoal">4,096</div>
                      </div>
                   </div>
                </div>

                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/4 w-[80%] h-[100%] bg-lime-neon/20 rounded-full blur-[80px] -z-10" />
            </motion.div>
          </div>

        </div>
      </div>
      
      {/* Background Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-lime-neon/5 rounded-full blur-[150px] -z-10 animate-pulse" />
    </section>
  );
};

export default FinalCTA;

