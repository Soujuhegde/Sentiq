import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer 
} from 'recharts';

const PriorityActionMatrix = () => {
  const navigate = useNavigate();

  // Calculated strictly on sentiment to impact inversion
  const data = useMemo(() => [
    { feature: 'Battery Drain', impact: 9.5, frequency: 180, sentiment: -0.9 },
    { feature: 'App Crash', impact: 8.5, frequency: 154, sentiment: -0.8 },
    { feature: 'Slow Loading', impact: 6.5, frequency: 95, sentiment: -0.6 },
    { feature: 'Confusing UI', impact: 4.2, frequency: 160, sentiment: -0.3 },
    { feature: 'Login Error', impact: 8.8, frequency: 35, sentiment: -0.85 },
    { feature: 'Missing Dark Mode', impact: 3.1, frequency: 190, sentiment: -0.2 },
    { feature: 'Push Notifications', impact: 2.5, frequency: 45, sentiment: -0.1 },
    { feature: 'Export Fails', impact: 7.5, frequency: 15, sentiment: -0.7 },
    { feature: 'Offline Sync', impact: 5.5, frequency: 105, sentiment: -0.5 },
    { feature: 'Password Reset', impact: 6.2, frequency: 20, sentiment: -0.55 },
  ], []);

  // Bubble colors
  const getColor = (impact) => {
    if (impact >= 7) return '#ef4444'; // Red (critical)
    if (impact >= 4.5) return '#f97316'; // Orange (medium)
    return '#eab308'; // Yellow (low)
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass p-4 rounded-xl shadow-xl bg-white/90">
          <p className="font-bold text-sm mb-1">{data.feature}</p>
          <div className="text-xs text-charcoal-muted">
            Impact (1-10): <span className="font-mono">{data.impact.toFixed(1)}</span>
          </div>
          <div className="text-xs text-charcoal-muted mb-1">
            Frequency: <span className="font-mono">{data.frequency}</span> reviews
          </div>
          <div className="text-[10px] font-bold py-0.5 px-2 rounded-full inline-block" style={{ backgroundColor: getColor(data.impact) + '20', color: getColor(data.impact) }}>
            Sentiment: {data.sentiment.toFixed(2)}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass rounded-[32px] p-8 h-full flex flex-col min-h-[450px]">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h3 className="text-xl font-bold">Priority Action Matrix</h3>
          <p className="mono-label">Issue Triaging By Impact vs Frequency</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-[10px] mono-label">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-[10px] mono-label">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-[10px] mono-label">Low</span>
          </div>
        </div>
      </div>

      <div className="flex-grow w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />
            <XAxis 
              type="number" 
              dataKey="impact" 
              name="Impact Score" 
              domain={[0, 10]} 
              ticks={[0, 2, 4, 6, 8, 10]}
              axisLine={{ stroke: 'rgba(31, 41, 55, 0.2)' }}
              tickLine={false}
              tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: 'rgba(31, 41, 55, 0.5)' }}
            />
            <YAxis 
              type="number" 
              dataKey="frequency" 
              name="Frequency" 
              domain={[0, 200]} 
              ticks={[0, 50, 100, 150, 200]}
              axisLine={{ stroke: 'rgba(31, 41, 55, 0.2)' }}
              tickLine={false}
              tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: 'rgba(31, 41, 55, 0.5)' }}
            />
            <ZAxis type="number" dataKey="frequency" range={[150, 800]} name="Volume" />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />

            {/* Quadrant Lines */}
            <ReferenceLine x={5} stroke="rgba(31, 41, 55, 0.15)" strokeDasharray="5 5" />
            <ReferenceLine y={100} stroke="rgba(31, 41, 55, 0.15)" strokeDasharray="5 5" />

            {/* Quadrant Areas/Labels */}
            <ReferenceArea x1={0} x2={5} y1={100} y2={200} fill="transparent" label={{ position: 'insideTopLeft', value: 'MONITOR', fill: 'rgba(31,41,55,0.4)', fontSize: 14, fontWeight: 'bold' }} />
            <ReferenceArea x1={5} x2={10} y1={100} y2={200} fill="transparent" label={{ position: 'insideTopRight', value: 'FIX NOW', fill: 'rgba(239,68,68,0.5)', fontSize: 14, fontWeight: 'bold' }} />
            <ReferenceArea x1={0} x2={5} y1={0} y2={100} fill="transparent" label={{ position: 'insideBottomLeft', value: 'LOW PRIORITY', fill: 'rgba(31,41,55,0.4)', fontSize: 14, fontWeight: 'bold' }} />
            <ReferenceArea x1={5} x2={10} y1={0} y2={100} fill="transparent" label={{ position: 'insideBottomRight', value: 'QUICK WIN', fill: 'rgba(249,115,22,0.5)', fontSize: 14, fontWeight: 'bold' }} />

            <Scatter 
              name="Issues" 
              data={data} 
              onClick={(e) => {
                 if (e && e.feature) {
                   navigate(`/reviews?filter=${encodeURIComponent(e.feature)}`);
                 }
              }}
              style={{ cursor: 'pointer' }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.impact)} opacity={0.85} stroke="#fff" strokeWidth={1.5} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriorityActionMatrix;
