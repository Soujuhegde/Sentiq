import React from 'react';
import { motion } from 'framer-motion';

const FeatureHeatmap = () => {
  const features = ['UI Speed', 'RAG Accuracy', 'Latency', 'Integration', 'Mobile Sync'];
  const categories = ['Retail', 'Finance', 'Health', 'Logistics'];

  // Generate mock data: higher percentage = brighter lime
  const getData = () => {
    return categories.map(() => 
      features.map(() => Math.floor(Math.random() * 100))
    );
  };

  const data = getData();

  const getOpacity = (val) => {
    if (val < 30) return 'bg-charcoal/5';
    if (val < 60) return 'bg-lime-neon/20 text-charcoal';
    if (val < 85) return 'bg-lime-neon/60 text-charcoal';
    return 'bg-lime-neon text-charcoal shadow-[0_0_15px_rgba(190,242,100,0.4)]';
  };

  return (
    <div className="glass rounded-[32px] p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-xl font-bold mb-1">Feature Performance Matrix</h3>
          <p className="mono-label">Correlation between user vertical and feature adoption</p>
        </div>
        <div className="flex gap-4">
           {['Weak', 'Avg', 'High'].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                 <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-charcoal/5' : i === 1 ? 'bg-lime-neon/40' : 'bg-lime-neon'}`} />
                 <span className="text-[10px] mono-label tracking-normal capitalize">{label}</span>
              </div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-[100px_1fr] gap-4">
        {/* Y Axis Labels */}
        <div className="flex flex-col justify-around py-4">
          {categories.map(cat => (
            <span key={cat} className="text-sm font-medium text-charcoal-muted h-12 flex items-center">{cat}</span>
          ))}
        </div>

        {/* Heatmap Grid */}
        <div className="space-y-4">
           {/* X Axis Labels */}
           <div className="flex justify-around mb-2">
              {features.map(f => (
                <span key={f} className="text-[10px] mono-label text-center w-full">{f}</span>
              ))}
           </div>

           {data.map((row, i) => (
             <div key={i} className="flex gap-4 h-12">
                {row.map((val, j) => (
                  <motion.div
                    key={j}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    className={`flex-grow rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all ${getOpacity(val)}`}
                    title={`${val}% Adoption`}
                  >
                    {val}%
                  </motion.div>
                ))}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureHeatmap;
