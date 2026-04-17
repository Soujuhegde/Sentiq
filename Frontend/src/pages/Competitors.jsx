import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ENDPOINTS } from '../api/config';
import { Target, Users, Zap, ShieldAlert, BarChart3, TrendingUp } from 'lucide-react';

const Competitors = () => {
  const [landscape, setLandscape] = useState([]);
  const [comparisons, setComparisons] = useState([]);

  useEffect(() => {
    fetch(ENDPOINTS.COMPETITORS)
      .then(res => res.json())
      .then(data => {
        // Map market data to XY coordinates
        const mapped = data.map(brand => ({
          name: brand.brand,
          x: brand.market_share * 5, // Scale for matrix
          y: brand.sentiment,
          type: brand.sentiment > 70 ? 'leader' : 'challenger'
        }));
        setLandscape(mapped);
        
        // Build simple comparisons
        setComparisons(data.slice(1).map(brand => ({
          brand: brand.brand,
          metric: "Relative Sentiment Gap",
          gap: `${(brand.sentiment - data[0].sentiment).toFixed(1)}%`,
          status: brand.sentiment > 75 ? "Threat" : "Trailing"
        })));
      })
      .catch(err => console.error("Neural Market Recon Failed:", err));
  }, []);

  return (
    <main className="flex-grow pt-32 px-6 container mx-auto max-w-7xl relative z-10 pb-20 text-charcoal">
      <header className="mb-12">
        <div className="mono-label mb-2">Market / Strategic Reconnaissance</div>
        <h1 className="text-5xl font-bold gradient-text">Competitive Landscape</h1>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
         {/* 2x2 Matrix */}
         <div className="lg:col-span-2 glass p-12 rounded-[40px] relative overflow-hidden">
            <div className="flex justify-between items-start mb-12">
               <div>
                  <h3 className="text-2xl font-bold">Neural Market Position</h3>
                  <p className="mono-label">Gemini 2.5 Strategic Displacement Mapping</p>
               </div>
               <div className="flex gap-4">
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase"><div className="w-2 h-2 rounded-full bg-lime-neon" /> Leader</span>
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase"><div className="w-2 h-2 rounded-full bg-charcoal/20" /> Challenger</span>
               </div>
            </div>

            <div className="relative h-[400px] border-l-2 border-b-2 border-charcoal/10 ml-8 mb-8">
               {/* Quadrant Labels */}
               <div className="absolute top-4 right-4 mono-label opacity-20 text-xs">Market Leaders</div>
               <div className="absolute bottom-4 left-4 mono-label opacity-20 text-xs">Niche Players</div>
               
               {/* Axis Labels */}
               <div className="absolute -left-12 top-1/2 -rotate-90 mono-label text-[10px]">Strategic Vision</div>
               <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 mono-label text-[10px]">Execution Velocity</div>

               {landscape.map((v, i) => (
                  <motion.div
                     key={v.name}
                     initial={{ opacity: 0, scale: 0 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: i * 0.1 }}
                     style={{ left: `${v.x}%`, bottom: `${v.y}%` }}
                     className="absolute -translate-x-1/2 translate-y-1/2 group cursor-pointer"
                  >
                     <div className={`w-4 h-4 rounded-full ${v.type === 'leader' ? 'bg-lime-neon' : 'bg-charcoal/20'} group-hover:scale-150 transition-transform shadow-[0_0_15px_rgba(190,242,100,0.5)]`} />
                     <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-charcoal text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {v.name}: {v.x}/{v.y}
                     </div>
                     <span className="absolute left-6 top-1/2 -translate-y-1/2 font-mono text-[10px] font-bold whitespace-nowrap opacity-40 group-hover:opacity-100 transition-opacity">
                        {v.name}
                     </span>
                  </motion.div>
               ))}
            </div>
         </div>

         {/* Side Stats */}
         <div className="space-y-8">
            <div className="glass p-8 rounded-[32px]">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-charcoal text-white flex items-center justify-center">
                     <ShieldAlert size={20} />
                  </div>
                  <h4 className="font-bold">Threat Assessment</h4>
               </div>
               <div className="space-y-6">
                  {comparisons.map((c, i) => (
                     <div key={i} className="flex justify-between items-center">
                        <div>
                           <p className="text-xs font-mono opacity-40">{c.metric}</p>
                           <p className="font-bold">{c.brand}</p>
                        </div>
                        <div className="text-right">
                           <p className={`text-sm font-bold ${c.gap.includes('+') ? 'text-green-600' : 'text-red-500'}`}>{c.gap}</p>
                           <p className="text-[10px] mono-label tracking-normal">{c.status}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="glass p-8 rounded-[32px] lime-gradient border-none">
               <h4 className="font-bold text-charcoal mb-4">Strategic Recommendation</h4>
               <p className="text-sm font-medium text-charcoal/80 leading-relaxed mb-6">
                  Gemini suggests focusing on "Zero-Latency" clusters as VertexAI shows a 14.2% drop in mobile performance over the last 30 days.
               </p>
               <button className="w-full py-3 bg-charcoal text-white rounded-xl font-bold flex items-center justify-center gap-2 text-sm">
                  View Shift Log
                  <ArrowRight size={16} />
               </button>
            </div>
         </div>
      </div>

      <div className="glass p-12 rounded-[40px]">
         <h3 className="text-2xl font-bold mb-8">Competitive Feature Drift</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Semantic RAG', 'Live WebSocket Ticker', 'Predictive Sales Gauge', 'Multi-Model Routing'].map((feature, i) => (
               <div key={i} className="p-6 bg-charcoal/5 rounded-2xl group hover:bg-white transition-all border border-transparent hover:border-lime-neon/20">
                  <div className="mono-label mb-2">Feature Score</div>
                  <h5 className="font-bold mb-4">{feature}</h5>
                  <div className="flex items-baseline gap-2">
                     <span className="text-3xl font-black">{92 - i * 8}%</span>
                     <span className="text-[10px] font-mono opacity-40">vs Market 64%</span>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </main>
  );
};

const _ArrowRight = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default Competitors;

