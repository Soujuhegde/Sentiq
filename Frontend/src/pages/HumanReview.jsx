import React from 'react';
import { Check, X, AlertCircle, ShieldAlert, ArrowRight, Filter } from 'lucide-react';
import NeuralBackground from '../components/NeuralBackground';
import CommandHub from '../components/CommandHub';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HumanReview = () => {
  const queue = [
    {
      id: "INC-9902",
      type: "Semantic Anomaly",
      title: "Suspicious Sentiment Inversion - EU Retail",
      desc: "Claude detected a 14% drop in positive sentiment in the 'Checkout' cluster. Sarcasm probability is high (0.82) for 400+ reviews.",
      severity: "critical",
      time: "14m ago"
    },
    {
      id: "INC-8812",
      type: "Trend Divergence",
      title: "App Store vs Play Store Disparity",
      desc: "Rating delta of 1.2 points detected. Semantic analysis suggests 'Login Latency' is much higher on Android shards.",
      severity: "high",
      time: "1h ago"
    },
    {
      id: "INC-7721",
      type: "Competitor Alert",
      title: "VertexAI Migration Pattern Detected",
      desc: "14 Enterprise users mentioned 'Vertex Outage' as a primary reason for switching. Review required to assign aggressive sales playbook.",
      severity: "medium",
      time: "3h ago"
    }
  ];

  return (
    <div className="min-h-screen relative flex flex-col">
      <NeuralBackground />
      <Navbar />
      <CommandHub />
      
      <main className="flex-grow pt-32 px-6 container mx-auto max-w-7xl relative z-10 pb-20 text-charcoal">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <div className="mono-label mb-2">Quality Assurance / Human-in-the-loop</div>
            <h1 className="text-5xl font-bold gradient-text">Neural Review Queue</h1>
          </div>
          <div className="flex gap-4">
             <div className="glass px-6 py-2 rounded-full flex items-center gap-3 border-lime-neon/50 bg-white/40">
                <AlertCircle size={18} className="text-lime-neon" />
                <span className="font-bold text-charcoal">{queue.length} Pending Review</span>
             </div>
             <button className="glass px-6 py-2 rounded-full flex items-center gap-2 hover:bg-white transition-all">
                <Filter size={16} />
                <span className="text-sm font-bold">Filter Pipeline</span>
             </button>
          </div>
        </header>
        
        <div className="space-y-6 mb-12">
           {queue.map((item, i) => (
             <div key={item.id} className="glass p-8 rounded-[32px] flex flex-col md:flex-row items-center gap-8 group hover:bg-white/60 transition-all border border-transparent hover:border-lime-neon/20">
                <div className="w-20 h-20 rounded-2xl bg-charcoal text-white flex flex-col items-center justify-center shrink-0 shadow-xl">
                   <span className="text-[10px] font-mono opacity-40">ITEM</span>
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
           <h3 className="text-xl font-bold mb-2 opacity-40">Queue Hygiene is Optimal</h3>
           <p className="text-sm font-medium text-charcoal-muted max-w-sm mx-auto">
              Your neural correction bias is currently at 0.04. The Claude model is learning from your recent approvals.
           </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HumanReview;

