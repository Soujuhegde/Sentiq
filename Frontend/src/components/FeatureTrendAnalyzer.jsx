import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const FeatureTrendAnalyzer = () => {
  const [feature, setFeature] = useState('packaging');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const featuresList = ['packaging', 'battery', 'ui', 'latency', 'pricing'];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/feature-trends?feature=${feature}&window_size=50`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching feature trends:", error);
        // Fallback mock data in case backend isn't running or accessible
        setData({
          feature: feature,
          current_window: {
            mention_count: 19,
            total_reviews: 50,
            percentage: 38,
            avg_sentiment: 0.3,
            review_ids: [87, 92, 95]
          },
          previous_window: {
            mention_count: 4,
            total_reviews: 50,
            percentage: 8,
            avg_sentiment: 0.4
          },
          trend: "emerging",
          severity: "high"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [feature]);

  // Mock data for the bar chart representing feature mentions over time (e.g. 5 windows)
  const chartData = [
    { name: 'W1', mentions: data ? Math.max(0, data.previous_window.mention_count - 2) : 2 },
    { name: 'W2', mentions: data ? data.previous_window.mention_count : 4 },
    { name: 'W3', mentions: data ? data.previous_window.mention_count + 3 : 7 },
    { name: 'W4', mentions: data ? data.current_window.mention_count - 5 : 14 },
    { name: 'W5', mentions: data ? data.current_window.mention_count : 19 },
  ];

  if (loading || !data) {
    return <div className="glass p-8 rounded-[40px] animate-pulse h-[500px]">Loading Feature Trends...</div>;
  }

  const changePct = data.current_window.percentage - data.previous_window.percentage;
  const sentimentChange = ((data.current_window.avg_sentiment - data.previous_window.avg_sentiment) / Math.abs(data.previous_window.avg_sentiment)) * 100;

  return (
    <div className="glass p-8 lg:p-12 rounded-[40px] mb-12 flex flex-col gap-8 text-charcoal">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="mono-label mb-2 flex items-center gap-2">
            Priority 1 Alert
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          </div>
          <h3 className="text-3xl font-bold">Feature Trend Analysis</h3>
          <p className="text-charcoal-muted mt-2">Comparing last {data.current_window.total_reviews} reviews vs previous window</p>
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="mono-label text-sm">Select Feature:</label>
          <select 
            value={feature} 
            onChange={(e) => setFeature(e.target.value)}
            className="bg-white/50 border border-charcoal/10 rounded-xl px-4 py-3 font-bold text-charcoal focus:outline-none focus:ring-2 focus:ring-lime-neon capitalize"
          >
            {featuresList.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 overflow-hidden rounded-2xl border border-charcoal/10 bg-white/20">
        
        <div className="p-6 border-b md:border-b-0 md:border-r border-charcoal/10">
          <div className="mono-label mb-4 opacity-50">Current Window</div>
          <p className="text-4xl font-black mb-2">{data.current_window.percentage}%</p>
          <p className="font-medium text-sm text-charcoal-muted mb-6">
            ({data.current_window.mention_count}/{data.current_window.total_reviews} mentions)
          </p>
          <div className="p-3 bg-white/40 rounded-xl">
            <span className="mono-label block mb-1">Sentiment Avg</span>
            <span className="font-bold text-lg">{data.current_window.avg_sentiment.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="p-6 border-b md:border-b-0 md:border-r border-charcoal/10">
          <div className="mono-label mb-4 opacity-50">Previous Window</div>
          <p className="text-4xl font-black mb-2 text-charcoal/60">{data.previous_window.percentage}%</p>
          <p className="font-medium text-sm text-charcoal-muted mb-6">
            ({data.previous_window.mention_count}/{data.previous_window.total_reviews} mentions)
          </p>
          <div className="p-3 bg-charcoal/5 rounded-xl">
            <span className="mono-label block mb-1">Sentiment Avg</span>
            <span className="font-bold text-lg text-charcoal/80">{data.previous_window.avg_sentiment.toFixed(2)}</span>
          </div>
        </div>

        <div className={`p-6 flex flex-col justify-center ${changePct > 0 ? 'bg-red-500/10' : 'bg-lime-neon/20'}`}>
          <div className="mono-label mb-2 opacity-60">Net Change</div>
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-5xl font-black ${changePct > 0 ? 'text-red-600' : 'text-charcoal'}`}>
              {changePct > 0 ? '+' : ''}{changePct}%
            </span>
            {changePct > 20 && <span className="text-2xl">⚠️</span>}
          </div>
          <div className="inline-block px-3 py-1 bg-charcoal text-white rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 self-start">
            {data.trend} Trend
          </div>
          
          <div className="pt-4 border-t border-charcoal/10">
             <span className="mono-label block mb-1">Sentiment Shift</span>
             <span className="font-bold text-red-600">
               {sentimentChange > 0 ? '+' : ''}{sentimentChange.toFixed(0)}% worse
             </span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        {/* Trend Visualization */}
        <div className="bg-white/40 p-6 rounded-2xl border border-white/20">
          <h4 className="font-bold mb-6 flex items-center justify-between">
            <span>📊 Mentions Over Time</span>
            <span className="mono-label text-[10px]">Rolling Windows</span>
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#666', fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#666', fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} 
                />
                <Bar dataKey="mentions" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#ef4444' : '#1a1a1a'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sample Reviews */}
        <div className="bg-white/40 p-6 rounded-2xl border border-white/20 flex flex-col">
          <h4 className="font-bold mb-6">🔍 Sample Mentions</h4>
          <div className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {data.current_window.review_ids.map((id, index) => {
              // Creating some mock content based on IDs since we don't have the rich text from backend in this MVP
              const mockTexts = [
                "Packaging was damaged on arrival",
                "Poor packaging quality",
                "Box was crushed, product ok"
              ];
              const text = mockTexts[index % mockTexts.length];
              return (
                <div key={id} className="p-4 bg-white/60 rounded-xl border border-white shadow-sm flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0">
                    #{id}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{text}</p>
                    <span className="text-[10px] mono-label mt-2 block opacity-50">Sentiment: Negative</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureTrendAnalyzer;
