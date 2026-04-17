import { motion } from 'framer-motion';
import { Target, TrendingUp, DollarSign, Brain, BarChart3, ArrowRight, Zap } from 'lucide-react';

const SalesImpact = () => {
  const triggers = [
    { title: "Sentiment Inversion", impact: "+$1.2M", desc: "Detected 14% drop in positive retail sentiment; fixing this cluster unlocks latent renewal revenue." },
    { title: "Feature Adoption Gap", impact: "+$420k", desc: "Enterprise tier users are 22% more likely to churn if 'RAG Accuracy' drops below 85%." },
    { title: "Competitor Churn Event", impact: "+$2.8M", desc: "VertexAI's recent outage has created a $2M primary migration opportunity." },
  ];

  return (
    <main className="flex-grow pt-32 px-6 container mx-auto max-w-7xl relative z-10 pb-20 text-charcoal">
      <header className="mb-12">
        <div className="mono-label mb-2">Revenue / Predictive Intelligence</div>
        <h1 className="text-5xl font-bold gradient-text">Sales Impact Engine</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
         {/* Predictive Gauge Card */}
         <div className="glass p-12 rounded-[40px] flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute top-8 left-8 mono-label">Confidence Index</div>
            <div className="relative w-64 h-64 mb-8">
               <svg className="w-full h-full transform -rotate-90">
                  <circle 
                     cx="128" cy="128" r="110" 
                     fill="transparent" 
                     stroke="currentColor" 
                     strokeWidth="20" 
                     className="text-charcoal/5"
                  />
                  <motion.circle 
                     cx="128" cy="128" r="110" 
                     fill="transparent" 
                     stroke="currentColor" 
                     strokeWidth="20" 
                     strokeDasharray={690}
                     initial={{ strokeDashoffset: 690 }}
                     animate={{ strokeDashoffset: 140 }}
                     transition={{ duration: 2, ease: "easeOut" }}
                     className="text-lime-neon"
                     strokeLinecap="round"
                  />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-black text-charcoal">84.2</span>
                  <span className="text-[10px] font-mono tracking-widest opacity-40 uppercase">Gemini Verify</span>
               </div>
            </div>
            <h3 className="text-3xl font-bold mb-4">Predictive Sales Lift</h3>
            <p className="text-charcoal-muted max-w-md mx-auto">
               Estimated revenue acceleration for the upcoming H2 period based on current sentiment trajectory.
            </p>
            
            <div className="mt-8 flex gap-4">
               <div className="glass px-4 py-2 rounded-xl text-sm font-bold bg-white/40">+$4.2M Attainable</div>
               <div className="glass px-4 py-2 rounded-xl text-sm font-bold bg-white/40">12% Growth Propensity</div>
            </div>
         </div>

         {/* Revenue Waterfall simulation */}
         <div className="glass p-12 rounded-[40px]">
            <h3 className="text-2xl font-bold mb-8">Impact Correlation Waterfall</h3>
            <div className="space-y-4">
               {[
                 { label: "Baseline Revenue", val: 100, color: "bg-charcoal/10" },
                 { label: "Sentiment Optimization", val: 115, color: "bg-lime-neon" },
                 { label: "Technical Debt Resolution", val: 122, color: "bg-lime-neon/60" },
                 { label: "Competitor Displacement", val: 138, color: "bg-lime-neon" }
               ].map((bar, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex justify-between text-sm font-bold">
                        <span>{bar.label}</span>
                        <span className={i > 0 ? 'text-green-600' : ''}>{i === 0 ? '$42.1M' : `+$${(Math.random() * 5).toFixed(1)}M`}</span>
                     </div>
                     <div className="h-4 w-full bg-charcoal/5 rounded-lg overflow-hidden">
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${(bar.val / 138) * 100}%` }}
                           transition={{ duration: 1.5, delay: i * 0.2 }}
                           className={`h-full ${bar.color}`}
                        />
                     </div>
                  </div>
               ))}
            </div>
            <div className="mt-8 pt-8 border-t border-charcoal/5 flex justify-between items-center text-charcoal">
               <span className="font-bold">Total Projected Q4 Target</span>
               <span className="text-3xl font-black italic">$56.2M</span>
            </div>
         </div>
      </div>

      {/* Sales Triggers */}
      <div className="glass p-12 rounded-[40px]">
         <div className="flex justify-between items-center mb-10">
            <div>
               <h3 className="text-2xl font-bold">Automated Sales Triggers</h3>
               <p className="mono-label">Gemini 2.5 Strategic Opportunities</p>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold group">
               View Trigger History
               <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {triggers.map((trigger, i) => (
               <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.02 }}
                  className="p-8 bg-charcoal/5 rounded-[32px] border border-transparent hover:border-lime-neon/20 transition-all flex flex-col"
               >
                  <div className="flex justify-between items-start mb-6">
                     <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                        {i === 0 ? <Zap className="text-lime-neon" /> : i === 1 ? <Brain className="text-charcoal" /> : <DollarSign className="text-charcoal" />}
                     </div>
                     <span className="text-lg font-black text-green-600">{trigger.impact}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-4">{trigger.title}</h4>
                  <p className="text-sm font-medium text-charcoal-muted leading-relaxed mb-6 flex-grow">{trigger.desc}</p>
                  <button className="w-full py-3 bg-charcoal text-white rounded-xl font-bold text-sm">
                     Execute Playbook
                  </button>
               </motion.div>
            ))}
         </div>
      </div>
    </main>
  );
};

export default SalesImpact;

