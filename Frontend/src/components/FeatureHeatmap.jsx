import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const FeatureHeatmap = () => {
  const rowFeatures = ['battery', 'packaging', 'delivery', 'taste', 'durability', 'customer_support', 'quality', 'price', 'shipping'];
  const dates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
  }, []);

  const data = useMemo(() => {
    return rowFeatures.map(() => 
      dates.map(() => ({
        score: (Math.random() * 2) - 1,
        reviews: Math.floor(Math.random() * 100) + 1
      }))
    );
  }, [dates]);

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

  return (
    <div className="glass rounded-[32px] p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-xl font-bold mb-1">Feature Performance Matrix</h3>
          <p className="mono-label">Feature-level sentiment over time</p>
        </div>
        <div className="flex gap-4">
           {[
             { label: 'Negative', color: 'bg-red-500' },
             { label: 'Neutral', color: 'bg-yellow-400' },
             { label: 'Positive', color: 'bg-green-500' }
           ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                 <div className={`w-3 h-3 rounded-full ${item.color}`} />
                 <span className="text-[10px] mono-label tracking-normal capitalize">{item.label}</span>
              </div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-[130px_1fr] gap-4 items-start">
        {/* Y Axis Labels */}
        <div className="flex flex-col space-y-2 py-0">
          <div className="h-[22px] mb-2" />
          {rowFeatures.map(f => (
            <span key={f} className="text-[11px] font-bold text-charcoal-muted h-10 flex items-center capitalize">{f.replace('_', ' ')}</span>
          ))}
        </div>

        {/* Heatmap Grid */}
        <div className="space-y-2 flex-grow">
           {/* X Axis Labels */}
           <div className="flex justify-around mb-2">
              {dates.map(d => (
                <span key={d} className="text-[10px] mono-label text-center w-full">{d}</span>
              ))}
           </div>

           {data.map((row, i) => (
             <div key={i} className="flex gap-2 h-10 w-full">
                {row.map((val, j) => {
                  const hue = (val.score + 1) * 60; // -1 to +1 -> 0 to 120
                  const fontColor = val.score > -0.3 && val.score < 0.3 ? 'text-charcoal' : 'text-white';
                  return (
                  <motion.div
                    key={j}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    style={{ backgroundColor: `hsl(${hue}, 80%, 45%)` }}
                    className={`flex-grow rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all shadow-sm ${fontColor}`}
                    title={`Feature: ${rowFeatures[i]}\nDate: ${dates[j]}\nScore: ${val.score.toFixed(2)}\nReviews: ${val.reviews}`}
                  >
                    {val.score.toFixed(2)}
                  </motion.div>
                )})}
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
