import { motion } from 'framer-motion';
import TrendChart from '../components/TrendChart';
import ReportExport from '../components/ReportExport';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import FeatureTrendAnalyzer from '../components/FeatureTrendAnalyzer';

const Trends = () => {
  return (
    <main className="flex-grow pt-32 px-6 container mx-auto max-w-7xl relative z-10 pb-20 text-charcoal">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <div className="mono-label mb-2">Engine / Feedback Review</div>
            <h1 className="text-5xl font-bold gradient-text">Historical Data</h1>
          </div>
          <div className="flex gap-4">
             <div className="glass px-6 py-2 rounded-full text-sm font-bold text-charcoal border-lime-neon/30">Rolling 7 Days</div>
             <div className="glass px-6 py-2 rounded-full text-sm font-medium text-charcoal-muted hover:bg-white transition-all cursor-pointer">Quarterly View</div>
             <div className="glass px-6 py-2 rounded-full text-sm font-medium text-charcoal-muted hover:bg-white transition-all cursor-pointer">Annual Audit</div>
          </div>
        </header>

        {/* Feature Trend Analysis Section - Priority 1 */}
        <FeatureTrendAnalyzer />
        
        <div className="grid grid-cols-1 gap-8 mb-12">
           <div className="h-[500px]">
              <TrendChart title="Mood Difference: Mobile vs Web" />
           </div>
           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="relative group">
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-lime-neon text-charcoal text-[10px] font-black rounded-full shadow-lg">98% CONFIDENCE</div>
                  <ReportExport reportName="EMEA Customer Feedback Report" />
               </div>
               <div className="relative group">
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-lime-neon text-charcoal text-[10px] font-black rounded-full shadow-lg">94% CONFIDENCE</div>
                  <ReportExport reportName="Competitor Comparison Details" />
               </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 glass p-12 rounded-[40px]">
              <h3 className="text-2xl font-bold mb-8">AI Unusual Findings</h3>
              <div className="space-y-6">
                 {[
                   { id: "X-204", cause: "Sudden surge in 'latency' keywords specifically in EU-West-2 region after v1.4.2 patch.", severity: "High", confidence: "94%" },
                   { id: "B-881", cause: "Language model detected sarcasm shift in 14% of North American retail feedback.", severity: "Med", confidence: "82%" },
                   { id: "Y-002", cause: "Divergence between Play Store rating (4.2) and App Store sentiment vector (3.1).", severity: "High", confidence: "98%" }
                 ].map((item, i) => (
                   <div key={i} className="flex items-start justify-between p-6 bg-charcoal/5 rounded-2xl group hover:bg-white/40 transition-all">
                      <div className="flex items-start gap-6">
                         <div className="w-12 h-12 rounded-xl bg-charcoal text-white flex items-center justify-center font-mono font-bold shrink-0 shadow-lg">
                            {item.id}
                         </div>
                         <div>
                            <div className="flex items-center gap-3 mb-1">
                               <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${item.severity === 'High' ? 'bg-red-100 text-red-600' : 'bg-lime-neon text-charcoal'}`}>
                                  {item.severity} SEVERITY
                               </span>
                               <span className="mono-label">Gemini 2.5 Verified</span>
                            </div>
                            <p className="text-sm font-bold text-charcoal leading-relaxed">{item.cause}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="mono-label mb-1">Confidence</div>
                         <div className="text-lg font-bold text-charcoal">{item.confidence}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="lg:col-span-1 glass p-12 rounded-[40px] flex flex-col">
              <h3 className="text-2xl font-bold mb-6">Topic Drift</h3>
              <div className="flex-grow space-y-8">
                 {[
                   { tag: "#UserExperience", val: 84, trend: "up" },
                   { tag: "#Integration", val: 42, trend: "down" },
                   { tag: "#Security", val: 96, trend: "stable" },
                   { tag: "#Latency", val: 12, trend: "up" }
                 ].map((topic, i) => (
                   <div key={i}>
                      <div className="flex justify-between items-end mb-2">
                         <span className="text-sm font-bold">{topic.tag}</span>
                         <span className="text-[10px] font-mono opacity-40">{topic.val}% Relevance</span>
                      </div>
                      <div className="h-1 w-full bg-charcoal/10 rounded-full overflow-hidden">
                         <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${topic.val}%` }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                            className={`h-full ${topic.trend === 'up' ? 'bg-lime-neon' : topic.trend === 'down' ? 'bg-red-400' : 'bg-charcoal'}`}
                         />
                      </div>
                   </div>
                 ))}
              </div>
              <button className="mt-12 w-full py-4 glass border-lime-neon/20 rounded-2xl font-bold hover:bg-white transition-all flex items-center justify-center gap-2">
                 Deep Neural Sweep
                 <div className="w-1.5 h-1.5 rounded-full bg-lime-neon" />
              </button>
           </div>
        </div>
    </main>
  );
};

export default Trends;


