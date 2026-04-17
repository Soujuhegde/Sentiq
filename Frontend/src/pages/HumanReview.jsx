import React, { useState } from 'react';
import { Check, X, AlertCircle, ShieldAlert, ArrowRight, Filter } from 'lucide-react';

const HumanReview = () => {
  const queue = [
    {
      id: "INC-9902",
      type: "Unusual Feedback Pattern",
      title: "Suspicious Mood Shift - EU Retail",
      desc: "Our AI detected a 14% drop in positive mood in the 'Checkout' group. Likelihood of sarcasm is high (0.82) for 400+ reviews.",
      severity: "critical",
      time: "14m ago"
    },
    {
      id: "INC-8812",
      type: "Conflicting Trends",
      title: "App Store vs Play Store Differences",
      desc: "Rating gap of 1.2 points found. Smart analysis suggests 'Login Slowness' is much higher on Android segments.",
      severity: "high",
      time: "1h ago"
    },
    {
      id: "INC-7721",
      type: "Competitor Alert",
      title: "VertexAI Switching Trend Detected",
      desc: "14 Enterprise users mentioned 'Vertex Outage' as a main reason for switching. Review required to start sales priority plan.",
      severity: "medium",
      time: "3h ago"
    },
    {
      id: "INC-6632",
      type: "Deduplication Alert",
      title: "Repetitive Content Cluster Detected",
      desc: "5 identical reviews found in 2 minutes: 'Best experience ever!! highly quality product.'. High probability of bot activity.",
      severity: "low",
      time: "5h ago",
      isBot: true
    }
  ];

  const [showSpam, setShowSpam] = useState(true);
  const filteredQueue = showSpam ? queue : queue.filter(item => !item.isBot);

  return (
    <main className="flex-grow pt-32 px-6 container mx-auto max-w-7xl relative z-10 pb-20 text-charcoal">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <div className="mono-label mb-2">Quality Check / Manual Review</div>
          <h1 className="text-5xl font-bold gradient-text">Smart Review List</h1>
        </div>
        <div className="flex gap-4">
           <div className="glass px-6 py-2 rounded-full flex items-center gap-3 border-lime-neon/50 bg-white/40">
              <AlertCircle size={18} className="text-lime-neon" />
              <span className="font-bold text-charcoal">{queue.length} Pending Review</span>
           </div>
            <button 
               onClick={() => setShowSpam(!showSpam)}
               className={`glass px-6 py-2 rounded-full flex items-center gap-2 transition-all ${!showSpam ? 'bg-charcoal text-white' : 'hover:bg-white'}`}
            >
               <Filter size={16} />
               <span className="text-sm font-bold">{showSpam ? 'Hide Bots' : 'Show All'}</span>
            </button>
        </div>
      </header>
      
       <div className="space-y-6 mb-12">
          {filteredQueue.map((item, i) => (
            <div key={item.id} className={`glass p-8 rounded-[32px] flex flex-col md:flex-row items-center gap-8 group transition-all border border-transparent hover:border-lime-neon/20 ${item.isBot ? 'opacity-60 grayscale-[0.5]' : 'hover:bg-white/60'}`}>
               <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-xl ${item.isBot ? 'bg-red-950 text-red-100' : 'bg-charcoal text-white'}`}>
                  <span className="text-[10px] font-mono opacity-40 uppercase">{item.isBot ? 'SPAM' : 'ITEM'}</span>
                 <span className="font-black text-lg">#{item.id.split('-')[1]}</span>
              </div>
              
              <div className="flex-grow">
                 <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest ${
                      item.severity === 'critical' ? 'bg-red-500 text-white' : 
                      item.severity === 'high' ? 'bg-red-100 text-red-600' : 
                      'bg-lime-neon text-charcoal'
                    }`}>
                       {item.severity}
                    </span>
                     {item.isBot && (
                        <span className="text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest bg-red-100 text-red-600 border border-red-200">
                           BOT DETECTED
                        </span>
                     )}
                     <span className="mono-label">{item.type}</span>
                     <span className="w-1 h-1 rounded-full bg-charcoal/10" />
                     <span className="mono-label opacity-40">{item.time}</span>
                  </div>
                 <h3 className="text-2xl font-bold text-charcoal mb-2">{item.title}</h3>
                 <p className="text-charcoal-muted font-medium text-sm leading-relaxed max-w-3xl">
                    {item.desc}
                 </p>
              </div>
              
              <div className="flex gap-4 shrink-0">
                 <button className="w-16 h-16 rounded-[24px] flex items-center justify-center border-2 border-charcoal/5 text-charcoal-muted hover:bg-charcoal hover:text-white transition-all">
                    <X size={28} />
                 </button>
                 <button className="w-16 h-16 rounded-[24px] flex items-center justify-center lime-gradient text-charcoal shadow-lg hover:shadow-lime-neon/20 transition-all">
                    <Check size={28} />
                 </button>
              </div>
           </div>
         ))}
      </div>

      <div className="glass p-12 rounded-[40px] text-center border-charcoal/5 border-dashed border-2">
         <div className="w-20 h-20 rounded-full bg-charcoal/5 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={32} className="opacity-20" />
         </div>
         <h3 className="text-xl font-bold mb-2 opacity-40">Review list is clear</h3>
         <p className="text-sm font-medium text-charcoal-muted max-w-sm mx-auto">
            Your AI adjustment score is currently at 0.04. The AI system is learning from your recent approvals.
         </p>
      </div>
    </main>
  );
};

export default HumanReview;

