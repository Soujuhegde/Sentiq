import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../api/config';
import LiveFeed from '../components/LiveFeed';
import AlertBanner from '../components/AlertBanner';
import FeatureHeatmap from '../components/FeatureHeatmap';
import { TrendingUp, Users, Zap, BrainCircuit, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    total_reviews: 0,
    avg_sentiment: 0,
    active_nodes: 0,
    market_velocity: 0
  });

  useEffect(() => {
    fetch(ENDPOINTS.METRICS)
      .then(res => res.json())
      .then(data => setMetrics(data))
      .catch(err => console.error("Data Connection Error:", err));
  }, []);

  const stats = [
    { 
       label: "Net Sentiment Score", 
       value: metrics.avg_sentiment.toFixed(1), 
       trend: "+2.4%", 
       info: "Sector Benchmark: 62.1",
       icon: <BrainCircuit size={20} />,
       path: "/trends"
    },
    { 
       label: "Active Data Sources", 
       value: metrics.active_nodes.toLocaleString(), 
       trend: "Stable", 
       info: "99.9% Uptime",
       icon: <Zap size={20} />,
       path: "/dashboard"
    },
    { 
       label: "Market Share Velocity", 
       value: `${metrics.market_velocity}%`, 
       trend: "+5.1%", 
       info: "Lead: VertexAI (16.2%)",
       icon: <Users size={20} />,
       path: "/competitors"
    },
  ];

  return (
    <main className="flex-grow pt-32 px-6 container mx-auto max-w-7xl relative z-10 pb-20 text-charcoal">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <div className="mono-label mb-2">Platform / Intelligence Hub</div>
          <h1 className="text-5xl font-bold gradient-text">Executive Dashboard</h1>
        </div>
        <div className="flex flex-col items-end gap-2">
            <div className="mono-label text-[10px] opacity-40">System Sync Status</div>
            <div className="flex items-center gap-2 px-4 py-1.5 glass rounded-full border-lime-neon/20">
                <div className="w-2 h-2 rounded-full bg-lime-neon animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Live Active</span>
            </div>
        </div>
      </header>

      {/* Real-Time Sync Controller */}
      <div className="glass p-8 rounded-[32px] mb-12 border-lime-neon/10 bg-white/5 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-8 opacity-5">
            <BrainCircuit size={120} />
         </div>
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
                <h3 className="text-xl font-bold mb-2">Real-Time Sync Controller</h3>
                <p className="text-sm text-charcoal-muted font-medium">
                    Target any Android App ID for real-time sentiment extraction and feature mapping.
                </p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
                <input 
                    id="app-id-input"
                    type="text" 
                    placeholder="e.g., com.whatsapp" 
                    className="flex-grow md:w-64 bg-charcoal/5 border border-charcoal/10 px-6 py-4 rounded-2xl font-mono text-sm focus:outline-none focus:border-lime-neon/50 transition-all font-bold"
                />
                <button 
                   onClick={() => {
                      const id = document.getElementById('app-id-input').value || 'com.whatsapp';
                      fetch(`${ENDPOINTS.TRIGGER_SCRAPE}?app_id=${id}`, { method: 'POST' })
                        .then(() => alert(`Sync initiated for ${id}. Dashboard will update live.`));
                   }}
                   className="whitespace-nowrap bg-charcoal text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all flex items-center gap-3 shadow-xl"
                >
                    <Zap size={18} />
                    Sync Live Data
                </button>
            </div>
         </div>
      </div>

      <AlertBanner message="Anomaly detected in EMEA Retail feedback cluster. Potential churn variance +14%." />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            onClick={() => navigate(stat.path)}
            className="glass p-8 rounded-[32px] group hover:bg-white/60 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl lime-gradient flex items-center justify-center text-charcoal shadow-sm">
                {stat.icon}
              </div>
              <div className={`text-sm font-bold flex items-center gap-1 ${stat.trend.includes('+') ? 'text-green-600' : 'text-charcoal-muted'}`}>
                {stat.trend}
                <TrendingUp size={14} />
              </div>
            </div>
            <div className="mono-label mb-2 opacity-100">{stat.label}</div>
            <div className="text-4xl font-bold mb-4">{stat.value}</div>
            <div className="text-[10px] font-mono tracking-wider opacity-40 uppercase">{stat.info}</div>
            
            <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
              <ArrowRight size={18} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FeatureHeatmap />
        </div>
        <div className="lg:col-span-1 h-full">
          <LiveFeed />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;


