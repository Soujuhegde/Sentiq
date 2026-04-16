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

const Card = ({ i, title, desc, icon: Icon, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.1 }}
    className={`glass p-10 rounded-[40px] glass-hover group flex flex-col justify-between ${className}`}
  >
    <div className="w-14 h-14 rounded-2xl bg-charcoal flex items-center justify-center mb-12 group-hover:lime-gradient transition-all duration-500 shadow-xl group-hover:bloom-shadow">
      <Icon className="group-hover:text-charcoal text-white transition-colors" size={28} />
    </div>
    <div>
      <h3 className="text-2xl font-black mb-4 text-charcoal tracking-tight">{title}</h3>
      <p className="text-charcoal-muted leading-relaxed font-semibold text-lg opacity-80">
        {desc}
      </p>
    </div>
  </motion.div>
);

const Features = () => {
  return (
    <section id="features" className="py-32 px-6 relative">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[350px]">
          {/* Header Card - Large 12cols */}
          <div className="md:col-span-12 flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
            <motion.h2 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="text-5xl md:text-8xl font-black max-w-4xl leading-[0.9] tracking-[-0.05em]"
            >
              Intelligence that <br /> 
              <span className="text-lime-neon">scales</span> with you
            </motion.h2>
            <p className="text-xl text-charcoal-muted font-bold max-w-sm border-l-4 border-lime-neon pl-6">
              Processing millions of data points to give your product team the ultimate edge.
            </p>
          </div>

          <Card 
            i={0} 
            className="md:col-span-8 md:row-span-1"
            icon={BarChart3}
            title="Feature-level sentiment"
            desc="Deep dive into exact product components that drive delight or frustration across your entire user base."
          />
          
          <Card 
            i={1} 
            className="md:col-span-4 md:row-span-2"
            icon={Zap}
            title="Real-time trends"
            desc="Instant notifications when new patterns emerge."
          />

          <Card 
            i={2} 
            className="md:col-span-4 md:row-span-1"
            icon={Target}
            title="Competitor tracking"
            desc="Benchmarks against industry leaders."
          />

          <Card 
            i={3} 
            className="md:col-span-4 md:row-span-1"
            icon={MessageSquare}
            title="AI Chat Interface"
            desc="Natural language queries for direct insights."
          />

          <Card 
            i={4} 
            className="md:col-span-6 md:row-span-1"
            icon={TrendingUp}
            title="Predictive Impact"
            desc="Forecast sentiment shifts on revenue."
          />

          <Card 
            i={5} 
            className="md:col-span-6 md:row-span-1"
            icon={Globe}
            title="Global Context"
            desc="Hindi, English, and 40+ languages analyzed natively."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;

