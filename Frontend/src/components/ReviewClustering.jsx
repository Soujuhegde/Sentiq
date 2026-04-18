import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ENDPOINTS } from '../api/config';

const ReviewClustering = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(ENDPOINTS.CLUSTERING)
      .then(res => res.json())
      .then(d => setData(d))
      .catch(err => console.error("Clustering Error:", err));
  }, []);

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value, color } = payload[0].payload;
      return (
        <div className="glass p-4 rounded-xl shadow-xl bg-white/90 border-t-2" style={{ borderColor: color }}>
          <p className="font-bold text-sm mb-1 text-charcoal">{name}</p>
          <div className="text-xs text-charcoal-muted mb-1">
            Count: <span className="font-mono font-bold text-charcoal">{value.toLocaleString()}</span>
          </div>
          <div className="text-[10px] font-bold py-0.5 px-2 rounded-full inline-block mt-1" style={{ backgroundColor: color + '20', color: color }}>
            {((value / total) * 100).toFixed(1)}%
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass rounded-[32px] p-8 h-full flex flex-col min-h-[400px]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold">Review Quality Clustering</h3>
          <p className="mono-label">Distribution of review categories</p>
        </div>
        {data[1].value > total * 0.1 && (
           <div className="bg-red-500/10 border border-red-500/20 text-red-600 px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-widest uppercase">High Bot Activity</span>
           </div>
        )}
      </div>

      <div className="flex-grow w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} style={{ outline: 'none' }} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              content={(props) => {
                const { payload } = props;
                return (
                  <ul className="flex justify-center gap-6 mt-4">
                    {payload.map((entry, index) => (
                      <li key={`item-${index}`} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-xs font-bold text-charcoal">{entry.value}</span>
                        <span className="text-[10px] font-mono text-charcoal-muted">
                           {((entry.payload.value / total) * 100).toFixed(1)}%
                        </span>
                      </li>
                    ))}
                  </ul>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-36px]">
           <div className="text-3xl font-bold text-charcoal">{total.toLocaleString()}</div>
           <div className="text-[10px] font-mono text-charcoal-muted tracking-widest uppercase mt-1">Analyzed</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewClustering;
