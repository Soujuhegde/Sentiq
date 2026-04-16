import { useState, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { ENDPOINTS } from '../api/config';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-4 rounded-2xl border-white/50 shadow-xl">
        <p className="mono-label mb-2 text-[10px]">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-xs font-bold text-charcoal capitalize">{entry.name}:</span>
            <span className="text-xs font-mono text-charcoal-muted ml-auto">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const TrendChart = ({ title = "Sentiment Velocity Over Time" }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(ENDPOINTS.TRENDS)
      .then(res => res.json())
      .then(fetchedData => setData(fetchedData.slice(-12))) // Show last 12 points
      .catch(err => console.error("Neural Trend Sync Failed:", err));
  }, []);
  return (
    <div className="glass rounded-[32px] p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="mono-label">Real-time vector aggregation</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-lime-neon" />
            <span className="text-[10px] mono-label tracking-normal">Sentiment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-charcoal/10" />
            <span className="text-[10px] mono-label tracking-normal">Confidence</span>
          </div>
        </div>
      </div>

      <div className="flex-grow min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#BEF264" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#BEF264" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(31, 41, 55, 0.05)" />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: 'rgba(31, 41, 55, 0.4)' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: 'rgba(31, 41, 55, 0.4)' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(31,41,55,0.1)', strokeWidth: 1 }} />
            <Area 
              type="monotone" 
              dataKey="sentiment" 
              stroke="#BEF264" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSentiment)" 
              animationDuration={2000}
            />
            <Area 
              type="monotone" 
              dataKey="confidence" 
              stroke="rgba(31,41,55,0.1)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="transparent"
              animationDuration={2500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
