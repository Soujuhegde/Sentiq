import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Zap, 
  Target, 
  MessageSquare, 
  TrendingUp, 
  Globe 
} from 'lucide-react';

const Card = ({ i, title, desc, icon: Icon }) => (
  <motion.div
    initial={{ y: 0 }}
    whileInView={{ y: i * -20 }}
    viewport={{ once: false, margin: "-100px" }}
    className="sticky top-40 w-full glass rounded-[60px] p-12 md:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border-white/60 border-2 overflow-hidden group"
  >
    <div className="absolute top-0 right-0 w-96 h-96 bg-lime-neon/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
    
    <div className="flex flex-col md:flex-row gap-16 items-center relative z-10">
      <div className="md:w-1/3">
        <div className="w-20 h-20 rounded-3xl bg-charcoal flex items-center justify-center mb-8 group-hover:lime-gradient transition-all duration-500 shadow-2xl">
          <Icon className="text-lime-neon group-hover:text-charcoal transition-colors" size={36} />
        </div>
        <h3 className="text-4xl font-black mb-6 text-charcoal leading-none tracking-tighter">
          {title}
        </h3>
        <div className="mono-label flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-lime-neon" />
          Module Active
        </div>
      </div>
      
      <div className="md:w-2/3">
        <p className="text-3xl text-charcoal-muted leading-tight font-medium opacity-80">
          {desc}
        </p>
        <div className="mt-12 pt-12 border-t border-charcoal/5 grid grid-cols-2 gap-8 text-charcoal-muted uppercase font-mono text-xs tracking-widest opacity-40">
          <div>Complexity: High</div>
          <div>Neural Weight: 0.94</div>
        </div>
      </div>
    </div>
  </motion.div>
);

const FeaturesStacking = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Feature Insight",
      desc: "Granular sentiment analysis down to the individual UI element level."
    },
    {
      icon: Zap,
      title: "Real-time Pulse",
      desc: "Live ingestion of global feedback with millisecond anomaly detection."
    },
    {
      icon: Target,
      title: "Market Bench",
      desc: "Neural comparison with competitor datasets in real-time."
    }
  ];

  return (
    <section id="features" className="py-20 px-6 container mx-auto max-w-7xl">
      <div className="mb-40 flex justify-between items-end">
        <div>
          <div className="mono-label mb-4">Functional Stack</div>
          <h2 className="text-6xl md:text-[8rem] font-black leading-none tracking-tighter">
            Intelligence <br />
            <span className="text-lime-neon">Layers.</span>
          </h2>
        </div>
        <div className="hidden lg:block text-right">
          <p className="max-w-xs text-charcoal-muted font-bold text-lg mb-4">
            A non-linear grid for a non-linear problem. 
          </p>
          <div className="mono-label">Bespoke Architectural Build</div>
        </div>
      </div>

      <div className="flex flex-col gap-[30vh] pb-[30vh]">
        {features.map((feature, i) => (
          <Card key={i} i={i} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesStacking;
