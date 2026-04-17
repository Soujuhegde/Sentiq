import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroEditorial = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen relative flex items-center px-6 md:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full gap-12 items-center">
        
        {/* Left Side: Massive Vertical Branding */}
        <div className="hidden lg:flex lg:col-span-1 justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.1, x: 0 }}
            className="vertical-text text-[15rem] font-black tracking-tighter text-charcoal select-none leading-none"
          >
            SENTIQ
          </motion.div>
        </div>

        {/* Middle: Core Content */}
        <div className="lg:col-span-6 relative z-10">
          <div className="mono-label mb-8 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-charcoal/20" />
            Advanced Strategic Intelligence
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-7xl md:text-9xl font-black mb-12 leading-[0.85] tracking-tight"
          >
            Master the <br />
            <span className="text-lime-neon underline decoration-[10px] underline-offset-[20px]">Signal</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-charcoal-muted max-w-lg mb-12 font-medium leading-normal"
          >
            Convert scattered customer feedback into strategic intelligence using advanced sentiment analysis and topic modeling.
          </motion.p>

          <div className="flex items-center gap-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="px-12 py-5 bg-charcoal text-white rounded-2xl text-xl font-bold hover:bg-black transition-all shadow-[20px_20px_60px_-10px_rgba(0,0,0,0.2)]"
            >
              Enter Platform
            </motion.button>
            <div className="hidden md:block">
              <span className="mono-label block mb-1">Status</span>
              <span className="text-sm font-bold flex items-center gap-2 text-charcoal">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                System Online
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Editorial Dashboard Mock */}
        <div className="lg:col-span-5 relative mt-20 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, rotate: 10, y: 50 }}
            animate={{ opacity: 1, rotate: -2, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2, ease: "circOut" }}
            className="relative"
          >
            <div className="glass p-6 rounded-[48px] shadow-[40px_40px_100px_-20px_rgba(0,0,0,0.1)] border-white/60 border-2 overflow-hidden">
               <div className="h-[400px] w-full bg-charcoal/5 rounded-[32px] relative overflow-hidden flex items-center justify-center">
                  <img 
                    src="/assets/images/neural_viz.png" 
                    alt="Neural Visualization" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
               </div>
              {/* Technical Stamp Overlay */}
              <div className="absolute bottom-12 -left-12 glass px-6 py-4 rounded-2xl shadow-xl">
                <div className="mono-label text-lime-neon font-bold">Confidence</div>
                <div className="text-2xl font-black text-charcoal">98.4%</div>
              </div>
            </div>
            
            {/* Background Circle Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-lime-neon/10 rounded-full blur-[100px] -z-10" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HeroEditorial;

