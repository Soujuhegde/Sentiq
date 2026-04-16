import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Differentiation = () => {
  const points = [
    "Feature-level deep insights",
    "Real-time anomaly & spike detection",
    "Works with noisy real-world data",
    "Actionable product recommendations"
  ];

  return (
    <section className="py-40 px-6 relative overflow-hidden">
      {/* Section Transition Bleed */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-ivory to-transparent -z-10" />
      
      <div className="container mx-auto max-w-7xl">
        <div className="glass rounded-[60px] p-16 md:p-32 relative overflow-visible border-lime-neon/10 border-2">
          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-lime-neon/15 blur-[120px] -z-10 rounded-full" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-8xl font-black mb-12 leading-[0.9] tracking-[-0.05em]">
                  Not just <br /> 
                  sentiment.<br />
                  <span className="text-lime-neon drop-shadow-2xl">Real intel.</span>
                </h2>
                <div className="space-y-8">
                  {points.map((point, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-6 group"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-charcoal flex items-center justify-center group-hover:lime-gradient transition-all duration-300">
                        <CheckCircle2 size={20} className="text-lime-neon group-hover:text-charcoal" />
                      </div>
                      <span className="text-2xl font-bold text-charcoal opacity-90">{point}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative lg:-mr-48"
            >
              <div className="glass p-4 rounded-[40px] shadow-[0_64px_128px_-16px_rgba(0,0,0,0.15)] relative z-10 border-white/60 border-4">
                <div className="bg-charcoal rounded-[32px] overflow-hidden aspect-[4/3] flex items-center justify-center p-12 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-neon/10 to-transparent" />
                  <div className="text-center relative z-10">
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                      className="text-lime-neon text-9xl font-black mb-6 drop-shadow-[0_0_30px_rgba(190,242,100,0.5)]"
                    >
                      98%
                    </motion.div>
                    <div className="text-white text-xl font-black tracking-widest uppercase opacity-40">Precision AI Scoring</div>
                  </div>
                </div>
              </div>
              {/* Decorative artifacts for asymmetry */}
              <div className="absolute -top-12 -right-12 w-32 h-32 glass rounded-full opacity-30 blur-2xl" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-lime-neon/20 rounded-full opacity-40 blur-3xl animate-pulse" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Differentiation;
