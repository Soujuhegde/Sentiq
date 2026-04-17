import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

const FakeVsGenuine = () => {
  const data = useMemo(() => {
    return [
      { name: 'Mon', Genuine: 420, Fake: 110 },
      { name: 'Tue', Genuine: 380, Fake: 154 },
      { name: 'Wed', Genuine: 510, Fake: 90 },
      { name: 'Thu', Genuine: 460, Fake: 180 },
      { name: 'Fri', Genuine: 610, Fake: 220 },
      { name: 'Sat', Genuine: 780, Fake: 310 },
      { name: 'Sun', Genuine: 650, Fake: 190 },
    ];
  }, []);

  const totalGenuine = data.reduce((acc, d) => acc + d.Genuine, 0);
  const totalFake = data.reduce((acc, d) => acc + d.Fake, 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass p-4 rounded-xl shadow-xl bg-white/90">
          <p className="font-bold text-sm mb-2 text-charcoal">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex justify-between items-center gap-4 mb-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-xs font-bold text-charcoal">{entry.name}</span>
              </div>
              <span className="text-xs font-mono font-bold text-charcoal">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass rounded-[32px] p-8 h-full flex flex-col min-h-[400px]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold">Authenticity Radar</h3>
          <p className="mono-label">Genuine vs Manipulated Reviews</p>
        </div>
        <div className="flex gap-4">
           <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 text-green-600">
                 <ShieldCheck size={14} />
                 <span className="text-[10px] font-bold uppercase tracking-wider">Genuine</span>
              </div>
              <span className="font-mono text-charcoal font-bold text-sm">{totalGenuine.toLocaleString()}</span>
           </div>
           <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 text-red-500">
                 <ShieldAlert size={14} />
                 <span className="text-[10px] font-bold uppercase tracking-wider">Fake</span>
              </div>
              <span className="font-mono text-charcoal font-bold text-sm">{totalFake.toLocaleString()}</span>
           </div>
        </div>
      </div>

      <div className="flex-grow w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(31, 41, 55, 0.05)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: 'rgba(31, 41, 55, 0.6)' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: 'rgba(31, 41, 55, 0.6)' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(31,41,55,0.05)' }} />
            <Bar dataKey="Genuine" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Fake" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FakeVsGenuine;
