import { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
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
      <div className="glass p-4 rounded-2xl shadow-xl bg-white/90">
        <p className="mono-label mb-2 text-[10px]">{label}</p>
        <p className="text-[10px] opacity-60 mb-2">Batch Range: {payload[0].payload.range}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-xs font-bold text-charcoal capitalize">{entry.name}:</span>
            <span className="text-xs font-mono text-charcoal-muted ml-auto">{entry.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomDot = (props) => {
  const { cx, cy, payload, value, dataKey, index, fullData } = props;
  
  if (index === 0) {
    return <circle cx={cx} cy={cy} r={3} fill={props.stroke} stroke="none" />;
  }
  
  const prevValue = fullData[index - 1][dataKey];
  const increase = value - prevValue;

  if (increase > 20) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={6} fill="#ef4444" stroke="#ffffff" strokeWidth={2} />
        <g transform={`translate(${cx}, ${cy - 25})`}>
             <rect x="-40" y="-12" width="80" height="15" rx="4" fill="#ef4444" />
             <text textAnchor="middle" dy="0" fill="#ffffff" fontSize="8" fontWeight="bold" className="font-mono">
               SPIKE!
             </text>
        </g>
      </g>
    );
  }

  return <circle cx={cx} cy={cy} r={3} fill={props.stroke} stroke="none" />;
};

const TrendChart = ({ title = "Emerging Trend Detection" }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(ENDPOINTS.TRENDS)
      .then(res => res.json())
      .then(d => setData(d))
      .catch(err => console.error("Trends Error:", err));
  }, []);

  return (
    <div className="glass rounded-[32px] p-8 h-full flex flex-col min-h-[400px]">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="mono-label">Complaint Frequency Anomaly Detection</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#BEF264]" />
            <span className="text-[10px] mono-label tracking-normal">Battery</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#60A5FA]" />
            <span className="text-[10px] mono-label tracking-normal">Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#A78BFA]" />
            <span className="text-[10px] mono-label tracking-normal">Quality</span>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-[10px] mono-label tracking-normal text-red-500 font-bold">Anomaly (&gt;20% spike)</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 30, right: 30, left: -20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(31, 41, 55, 0.05)" />
            <XAxis 
              dataKey="batch" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: 'rgba(31, 41, 55, 0.6)' }}
            />
            <YAxis 
              domain={[0, 100]}
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: 'rgba(31, 41, 55, 0.6)' }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(31,41,55,0.1)', strokeWidth: 1 }} />
            <Line 
              type="monotone" 
              dataKey="battery" 
              stroke="#BEF264" 
              strokeWidth={3}
              dot={(props) => <CustomDot {...props} fullData={data} />}
              animationDuration={1500}
            />
            <Line 
              type="monotone" 
              dataKey="delivery" 
              stroke="#60A5FA" 
              strokeWidth={3}
              dot={(props) => <CustomDot {...props} fullData={data} />}
              animationDuration={1500}
            />
            <Line 
              type="monotone" 
              dataKey="quality" 
              stroke="#A78BFA" 
              strokeWidth={3}
              dot={(props) => <CustomDot {...props} fullData={data} />}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
