import React, { useState, useEffect } from 'react';
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

  const [issues, setIssues] = useState([]);
  
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/issue-classification');
        const data = await response.json();
        setIssues(data.issues);
      } catch (error) {
        console.error("Failed to load issue classification:", error);
      }
    };
    fetchIssues();
  }, []);

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

      {/* 🚨 Issue Classification Section */}
      <div className="border-t border-charcoal/10 mt-10 pt-10">
         <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
            🚨 Issue Classification
         </h4>
         
         <div className="overflow-hidden rounded-2xl border border-charcoal/10 bg-white/20 mb-6">
            <table className="w-full text-left text-sm">
               <thead>
                  <tr className="bg-charcoal text-lime-neon font-mono text-[10px] uppercase tracking-wider">
                     <th className="py-4 px-6">Feature</th>
                     <th className="py-4 px-6">Mentions</th>
                     <th className="py-4 px-6">Reviewers</th>
                     <th className="py-4 px-6 text-right">Type</th>
                  </tr>
               </thead>
               <tbody>
                  {issues.map((issue, idx) => (
                     <tr key={idx} className="border-b border-charcoal/5 hover:bg-white/40 transition-colors">
                        <td className="py-4 px-6 font-bold">{issue.feature}</td>
                        <td className="py-4 px-6 font-mono">{issue.mention_count}</td>
                        <td className="py-4 px-6 font-medium text-charcoal-muted">{issue.unique_reviewers} unique</td>
                        <td className="py-4 px-6 text-right">
                           <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${
                              issue.classification === 'SYSTEMIC' ? 'bg-red-500/20 text-red-600' :
                              issue.classification === 'RECURRING' ? 'bg-orange-500/20 text-orange-600' :
                              'bg-lime-neon/20 text-lime-600'
                           }`}>
                              {issue.classification} {issue.classification === 'SYSTEMIC' && '⚠️'}
                           </span>
                        </td>
                     </tr>
                  ))}
                  {issues.length === 0 && (
                     <tr>
                        <td colSpan="4" className="py-8 text-center text-charcoal-muted font-mono animate-pulse">Loading classification protocol...</td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>

         {/* Legend */}
         <div className="bg-white/40 border border-white/20 rounded-2xl p-6">
            <h5 className="font-bold mb-3 text-sm">Legend:</h5>
            <ul className="space-y-2 text-sm font-medium text-charcoal-muted">
               <li><span className="font-bold text-red-600">• SYSTEMIC:</span> 5+ unique reviewers (needs immediate fix)</li>
               <li><span className="font-bold text-orange-600">• RECURRING:</span> 2-4 unique reviewers (monitor closely)</li>
               <li><span className="font-bold text-lime-600">• ISOLATED:</span> 1 reviewer (may be edge case)</li>
            </ul>
         </div>
      </div>
    </div>
  );
};

export default FeatureHeatmap;
