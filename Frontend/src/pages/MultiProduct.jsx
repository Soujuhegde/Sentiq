import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CheckSquare, Square } from 'lucide-react';

const MultiProduct = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedApps, setSelectedApps] = useState(['Food Delivery App', 'Fitness App', 'Shopping App']);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/compare-products?product_ids=1,2,3');
        const result = await response.json();
        setData(result.products);
      } catch (error) {
        console.error("Error fetching comparison data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const allApps = ['Food Delivery App', 'Fitness App', 'Shopping App', 'Travel App'];

  const toggleApp = (app) => {
    if (selectedApps.includes(app)) {
      setSelectedApps(selectedApps.filter(a => a !== app));
    } else {
      if (selectedApps.length < 3) setSelectedApps([...selectedApps, app]);
    }
  };

  // Mock Sentiment Trends Data over 6 months
  const trendData = [
    { name: 'Jan', 'Food Delivery': 70, 'Fitness': 75, 'Shopping': 60 },
    { name: 'Feb', 'Food Delivery': 71, 'Fitness': 70, 'Shopping': 65 },
    { name: 'Mar', 'Food Delivery': 68, 'Fitness': 68, 'Shopping': 72 },
    { name: 'Apr', 'Food Delivery': 65, 'Fitness': 66, 'Shopping': 78 },
    { name: 'May', 'Food Delivery': 69, 'Fitness': 63, 'Shopping': 80 },
    { name: 'Jun', 'Food Delivery': 72, 'Fitness': 65, 'Shopping': 81 },
  ];

  const getHeatmapColor = (score) => {
    if (score >= 0.85) return 'bg-lime-neon/40 font-black';
    if (score >= 0.70) return 'bg-white/40 font-bold';
    return 'bg-red-500/20 text-red-600 font-bold'; // Issue
  };

  if (loading || !data) {
    return <div className="pt-32 px-6 container mx-auto text-center font-mono">Loading Neural Data...</div>;
  }

  // Filter visible products based on checkboxes
  const visibleProducts = data.filter(p => selectedApps.includes(p.name));

  return (
    <main className="flex-grow pt-32 px-6 container mx-auto max-w-7xl relative z-10 pb-20 text-charcoal">
      <header className="mb-12">
        <div className="mono-label mb-2 text-lime-600">Cross-Platform Audit</div>
        <h1 className="text-5xl font-bold gradient-text">Product Comparison Dashboard</h1>
      </header>

      {/* Select Products Panel */}
      <div className="glass p-8 rounded-[32px] mb-8">
        <h3 className="font-bold mb-4">Select Products to Compare:</h3>
        <div className="flex flex-wrap gap-4">
          {allApps.map(app => {
            const isSelected = selectedApps.includes(app);
            return (
              <button 
                key={app} 
                onClick={() => toggleApp(app)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${isSelected ? 'border-lime-neon bg-lime-neon/10' : 'border-charcoal/10 bg-white/40'}`}
              >
                {isSelected ? <CheckSquare size={18} className="text-lime-600" /> : <Square size={18} className="text-charcoal/30" />}
                <span className="font-bold text-sm tracking-wide">{app}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Metrics Table */}
      <div className="glass p-8 rounded-[32px] mb-8 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-charcoal/10 text-sm mono-label text-charcoal-muted">
              <th className="py-4 px-4">Metric</th>
              {visibleProducts.map(p => <th key={p.id} className="py-4 px-4 font-bold text-charcoal">{p.name}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-charcoal/5">
              <td className="py-5 px-4 font-bold">Avg Sentiment</td>
              {visibleProducts.map(p => (
                <td key={p.id} className="py-5 px-4 font-black">
                  {Math.round(p.avg_sentiment * 100)}% 
                  {p.avg_sentiment >= 0.70 ? ' 📈' : ' 📉'}
                </td>
              ))}
            </tr>
            <tr className="border-b border-charcoal/5">
              <td className="py-5 px-4 font-bold">Total Reviews</td>
              {visibleProducts.map(p => <td key={p.id} className="py-5 px-4 font-medium">{p.total_reviews}</td>)}
            </tr>
            <tr className="border-b border-charcoal/5">
              <td className="py-5 px-4 font-bold">Top Complaint</td>
              {visibleProducts.map(p => <td key={p.id} className="py-5 px-4 capitalize font-medium text-red-600">{p.top_complaint}</td>)}
            </tr>
            <tr>
              <td className="py-5 px-4 font-bold">Top Praise</td>
              {visibleProducts.map(p => <td key={p.id} className="py-5 px-4 capitalize font-medium text-lime-600">{p.top_praise}</td>)}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Feature Comparison Heatmap */}
      <div className="glass p-8 rounded-[32px] mb-8">
        <h3 className="font-bold mb-6 text-xl">Feature Comparison Heatmap</h3>
        <div className="overflow-x-auto rounded-2xl border border-charcoal/10 bg-white/20">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-charcoal text-lime-neon font-mono text-xs uppercase tracking-wider">
                <th className="py-4 px-6">Feature</th>
                {visibleProducts.map(p => <th key={p.id} className="py-4 px-6">{p.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {['ui', 'performance', 'support'].map((feature, idx) => (
                <tr key={feature} className={idx < 2 ? "border-b border-charcoal/5" : ""}>
                  <td className="py-4 px-6 font-bold capitalize bg-white/40">{feature === 'ui' ? 'UI/UX' : feature}</td>
                  {visibleProducts.map(p => {
                    const featScore = p.features[feature] || 0;
                    return (
                      <td key={p.id} className={`py-4 px-6 transition-colors ${getHeatmapColor(featScore)} border-l border-charcoal/5`}>
                        {Math.round(featScore * 100)}%
                        {featScore >= 0.85 && feature === 'ui' && p.name === 'Shopping App' && <span className="ml-2 text-[10px] uppercase text-charcoal/40 bg-white/50 px-2 py-1 rounded-full">← Winner</span>}
                        {featScore < 0.50 && p.name === 'Food Delivery App' && <span className="ml-2 text-[10px] uppercase text-red-600/60 bg-white/50 px-2 py-1 rounded-full">← Issue</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sentiment Trends Chart */}
      <div className="glass p-8 rounded-[32px]">
        <h3 className="font-bold mb-6 text-xl">📊 Sentiment Trends (All Products)</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} domain={[40, 100]} />
              <Tooltip 
                 contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
                 itemStyle={{ fontWeight: 'bold' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 'bold' }} />
              <Line type="monotone" dataKey="Food Delivery" stroke="#1a1a1a" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="Fitness" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="Shopping" stroke="#84cc16" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
};

export default MultiProduct;
