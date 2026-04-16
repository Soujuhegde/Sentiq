import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Collect reviews",
      desc: "Connect your sources for real-time scraping and ingestion."
    },
    {
      num: "02",
      title: "AI Analyzes",
      desc: "Our engine detects patterns, sentiment, and hidden anomalies."
    },
    {
      num: "03",
      title: "Actionable insights",
      desc: "Receive structured recommendations to drive product growth."
    }
  ];

  return (
    <section className="py-24 px-6 bg-ivory">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 sticky top-32">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How Sentiq <br /> transforms data</h2>
            <p className="text-charcoal-muted text-lg font-medium mb-8">
              Three simple steps from noisy feedback to intelligent decision making.
            </p>
            <div className="p-1 px-2 rounded-full bg-lime-neon/20 border border-lime-neon/30 inline-block text-[10px] font-bold uppercase tracking-widest text-charcoal">
              Optimized for Speed
            </div>
          </div>
          
          <div className="lg:col-span-8 flex flex-col gap-12">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group flex flex-col md:flex-row gap-8 items-start glass p-10 rounded-[40px] glass-hover"
              >
                <div className="text-6xl font-black text-lime-neon tracking-tighter opacity-50 group-hover:opacity-100 transition-opacity">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-charcoal">{step.title}</h3>
                  <p className="text-charcoal-muted text-lg leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
