import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../api/config';
import LiveFeed from '../components/LiveFeed';
import AlertBanner from '../components/AlertBanner';
import FeatureHeatmap from '../components/FeatureHeatmap';
import TrendChart from '../components/TrendChart';
import ReviewClustering from '../components/ReviewClustering';
import FakeVsGenuine from '../components/FakeVsGenuine';

import { TrendingUp, Users, Zap, BrainCircuit, ArrowRight, AlertTriangle, Activity, Globe, Bot, MessageSquareDashed } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    total_reviews: 0,
    avg_sentiment: 0,
    active_nodes: 0,
    market_velocity: 0
  });
  const [timeFilter, setTimeFilter] = useState('7d');

  useEffect(() => {
    fetch(`${ENDPOINTS.METRICS}?period=${timeFilter}`)
      .then(res => res.json())
      .then(data => setMetrics(data))
      .catch(err => console.error("Data Connection Error:", err));
  }, [timeFilter]);

  const totalReviews = metrics.total_reviews || 0;
  const sentimentScore = metrics.avg_sentiment || 0;
  const totalPositive = metrics.positive || 0;
  const totalNegative = metrics.negative || 0;
  const criticalIssues = metrics.active_nodes || 0;
  const totalLanguages = metrics.languages || 0;
  const totalSpam = metrics.bot_count || 0;
  const totalSarcastic = Math.floor(totalReviews * 0.08); // Proxy for now

  const getSentimentColor = (score) => {
    if (score > 0.3) return 'text-green-500';
    if (score >= -0.3) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getSentimentBg = (score) => {
    if (score > 0.3) return 'bg-green-500/20';
    if (score >= -0.3) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  return (
    <main className="flex-grow pt-32 px-6 container mx-auto max-w-7xl relative z-10 pb-20 text-charcoal">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <div className="mono-label mb-2">Platform / Action Center</div>
          <h1 className="text-5xl font-bold gradient-text">Executive Dashboard</h1>
        </div>
        <div className="flex flex-col items-end gap-2">
            <div className="mono-label text-[10px] opacity-40">System Update Status</div>
            <div className="flex items-center gap-2 px-4 py-1.5 glass rounded-full border-lime-neon/20">
                <div className="w-2 h-2 rounded-full bg-lime-neon animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Live Tracking</span>
            </div>
        </div>
      </header>



      <AlertBanner message="Unusual change detected in EMEA Retail feedback group. Potential cancellation risk shift +14%." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Card 1: Total Reviews */}
        <div className="glass p-8 rounded-[32px] relative overflow-hidden flex flex-col h-full cursor-pointer hover:bg-white/60 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl lime-gradient flex items-center justify-center text-charcoal shadow-sm">
                <Users size={20} />
              </div>
              <select 
                value={timeFilter} 
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-white/20 border-none outline-none text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer text-charcoal"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>
            <div className="mono-label mb-2">Total Reviews Processed</div>
            <div className="text-4xl font-bold mb-4">{totalReviews.toLocaleString()}</div>
            <div className="flex gap-2 mb-4">
              <div className="flex-1 bg-green-500/10 rounded-xl p-3 border border-green-500/20">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-green-600 mb-1">Positive</div>
                <div className="text-lg font-bold text-green-700">{totalPositive.toLocaleString()}</div>
              </div>
              <div className="flex-1 bg-red-500/10 rounded-xl p-3 border border-red-500/20">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-600 mb-1">Negative</div>
                <div className="text-lg font-bold text-red-700">{totalNegative.toLocaleString()}</div>
              </div>
            </div>
            <div className="text-[10px] font-mono tracking-wider opacity-40 uppercase mt-auto">Across all active streams</div>
        </div>

        {/* Card 2: Overall Sentiment */}
        <div className="glass p-8 rounded-[32px] relative overflow-hidden flex flex-col h-full cursor-pointer hover:bg-white/60 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${getSentimentBg(sentimentScore)} ${getSentimentColor(sentimentScore)}`}>
                <BrainCircuit size={20} />
              </div>
              <div className="text-xs font-bold text-charcoal-muted">
                 Weighted
              </div>
            </div>
            <div className="mono-label mb-2">Overall Sentiment Score</div>
            <div className={`text-4xl font-bold mb-4 ${getSentimentColor(sentimentScore)}`}>
               {sentimentScore > 0 ? '+' : ''}{sentimentScore.toFixed(2)}
            </div>
            <div className="text-[10px] font-mono tracking-wider opacity-40 uppercase mt-auto">Scale: -1.0 to +1.0</div>
        </div>

        {/* Card 3: Critical Issues */}
        <div className="glass p-8 rounded-[32px] relative overflow-hidden flex flex-col h-full cursor-pointer hover:bg-white/60 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center shadow-sm">
                <AlertTriangle size={20} />
              </div>
              <div className="text-sm font-bold flex items-center gap-1 text-red-500">
                +{(1.2 * mult).toFixed(1)}% <TrendingUp size={14} />
              </div>
            </div>
            <div className="mono-label mb-2">Critical Issues Detected</div>
            <div className="text-4xl font-bold mb-4">{criticalIssues}</div>
            <div className="flex gap-2 mt-auto">
              <span className="px-2 py-1 bg-red-500/20 text-red-600 rounded-[4px] text-[10px] font-bold">{Math.max(1, Math.floor(criticalIssues * 0.6))} High</span>
              <span className="px-2 py-1 bg-orange-500/20 text-orange-600 rounded-[4px] text-[10px] font-bold">{Math.floor(criticalIssues * 0.3)} Med</span>
              <span className="px-2 py-1 bg-yellow-500/10 text-yellow-600 rounded-[4px] text-[10px] font-bold">{Math.floor(criticalIssues * 0.1)} Low</span>
            </div>
        </div>

        {/* Card 4: Trending Features */}
        <div className="glass p-8 rounded-[32px] relative overflow-hidden flex flex-col h-full cursor-pointer hover:bg-white/60 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl lime-gradient flex items-center justify-center text-charcoal shadow-sm">
                <Activity size={20} />
              </div>
              <div className="text-xs font-bold text-charcoal-muted">Top 3</div>
            </div>
            <div className="mono-label mb-2">Trending Features</div>
            <div className="flex flex-col gap-3 mt-2 flex-grow justify-end">
              {[
                 { name: 'Battery', change: (12.4 * mult).toFixed(1), up: true },
                 { name: 'UI Speed', change: (5.1 * mult).toFixed(1), up: false },
                 { name: 'Delivery', change: (8.2 * mult).toFixed(1), up: true }
              ].map(f => (
                <div key={f.name} className="flex justify-between items-center text-sm font-bold border-b border-charcoal/5 pb-1">
                  <span>{f.name}</span>
                  <span className={`flex items-center gap-1 ${f.up ? 'text-green-500' : 'text-red-500'}`}>
                    {f.up ? '↑' : '↓'} {f.change}%
                  </span>
                </div>
              ))}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Card 5: Languages */}
        <div className="glass p-8 rounded-[32px] relative overflow-hidden flex flex-col h-full cursor-pointer hover:bg-white/60 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shadow-sm">
                <Globe size={20} />
              </div>
            </div>
            <div className="mono-label mb-2">Total Languages Processed</div>
            <div className="text-4xl font-bold mb-4">{totalLanguages}</div>
            <div className="text-[10px] font-mono tracking-wider opacity-40 uppercase mt-auto">Auto-detected</div>
        </div>

        {/* Card 6: Spam / Bot */}
        <div className="glass p-8 rounded-[32px] relative overflow-hidden flex flex-col h-full cursor-pointer hover:bg-white/60 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center shadow-sm">
                <Bot size={20} />
              </div>
            </div>
            <div className="mono-label mb-2">Spam / Bot Generated</div>
            <div className="text-4xl font-bold mb-4">{totalSpam.toLocaleString()}</div>
            <div className="text-[10px] font-mono tracking-wider opacity-40 uppercase mt-auto">Filtered automatically</div>
        </div>

        {/* Card 7: Sarcastic */}
        <div className="glass p-8 rounded-[32px] relative overflow-hidden flex flex-col h-full cursor-pointer hover:bg-white/60 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center shadow-sm">
                <MessageSquareDashed size={20} />
              </div>
            </div>
            <div className="mono-label mb-2">Total Sarcastic Reviews</div>
            <div className="text-4xl font-bold mb-4">{totalSarcastic.toLocaleString()}</div>
            <div className="text-[10px] font-mono tracking-wider opacity-40 uppercase mt-auto">Sentiment adjusted</div>
        </div>

        {/* Card 8: Empty Box */}
        <div className="glass p-8 rounded-[32px] relative overflow-hidden flex flex-col h-full cursor-pointer hover:bg-white/60 transition-all border-dashed">
            <div className="flex-grow flex items-center justify-center">
               <span className="text-sm font-bold text-charcoal-muted opacity-50">+ Add Metric Widget</span>
            </div>
        </div>
      </div>

      <div className="mb-12">
        <TrendChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <ReviewClustering />
        <FakeVsGenuine />
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


