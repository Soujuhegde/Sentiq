import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Cpu, ShieldCheck } from 'lucide-react';

const NeuralNode = ({ delay, icon: Icon, className }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [1, 0.5, 1],
      y: [0, -20, 0],
      x: [0, 10, 0],
      scale: 1 
    }}
    transition={{ 
      duration: 5, 
      delay, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
    className={`absolute glass p-3 rounded-2xl shadow-xl z-20 ${className}`}
  >
    <Icon className="text-lime-neon" size={20} />
  </motion.div>
);

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <section ref={containerRef} className="relative pt-20 pb-32 px-6 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Layered Background */}
      <div className="absolute inset-0 mesh-gradient opacity-40 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-ivory/50 backdrop-blur-3xl -z-10" />
      
      <div className="container mx-auto max-w-7xl relative">
        {/* Floating Neural Nodes */}
        <NeuralNode icon={Cpu} delay={0} className="top-0 left-[10%] hidden lg:block" />
        <NeuralNode icon={ShieldCheck} delay={1.5} className="bottom-[20%] right-[15%] hidden lg:block" />
        <NeuralNode icon={Activity} delay={3} className="top-[30%] right-[5%] hidden lg:block" />

        <div className="flex flex-col items-center text-center space-y-12 mb-24">
          <motion.h1 
            style={{ y: y1 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.9] tracking-[-0.05em] max-w-6xl mx-auto gradient-text"
          >
            Review <br />
            <span className="relative inline-block">
              Intelligence
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 1.5, ease: "circOut" }}
                className="absolute -bottom-2 left-0 w-full h-4 bg-lime-neon/40 -z-10 origin-left"
              />
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-3xl text-charcoal-muted max-w-3xl mx-auto font-medium"
          >
            Predicting business impact through <br /> 
            <span className="text-charcoal px-2 py-0.5 bg-lime-neon/20 rounded-lg">real-time AI detection</span>.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <button className="px-12 py-5 bg-charcoal text-white rounded-full text-xl font-bold shadow-2xl hover:bg-black transition-all hover:scale-110 bloom-shadow active:scale-95">
              Try Sentiq for free
            </button>
            <button className="px-12 py-5 glass text-charcoal rounded-full text-xl font-bold shadow-lg hover:bg-white transition-all hover:scale-110 active:scale-95">
              Get a demo
            </button>
          </motion.div>
        </div>

        <motion.div 
          style={{ y: y2, rotateX: rotate }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative rounded-[40px] overflow-hidden glass p-4 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.12)] border border-white/40">
            <img 
              src="/src/assets/dashboard_mock.png" 
              alt="Sentiq Elite Dashboard" 
              className="w-full h-auto rounded-[32px] shadow-2xl"
            />
            
            {/* Overlay Glass Widget */}
            <motion.div 
              animate={{ 
                x: [0, 20, 0],
                y: [0, 10, 0]
              }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 hidden xl:flex glass p-8 rounded-3xl shadow-2xl flex-col gap-4 border-lime-neon/30 border-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full lime-gradient flex items-center justify-center">
                  <Activity size={20} className="text-charcoal" />
                </div>
                <div>
                  <div className="text-xs font-bold text-charcoal-muted uppercase">Market share</div>
                  <div className="text-2xl font-black text-charcoal">+12.4%</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

