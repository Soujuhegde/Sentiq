import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { ENDPOINTS } from '../api/config';

const LiveFeed = () => {
  const [activities, setActivities] = useState([
    { type: 'sentiment', text: 'Sentiq Neural Core Initialized', value: 'Active', icon: <TrendingUp size={14} /> },
  ]);

  useEffect(() => {
    let ws;
    let reconnectTimeout;

    const connect = () => {
      ws = new WebSocket(ENDPOINTS.LIVE_WS);

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === 'new_review') {
            const newActivity = {
              type: 'sentiment',
              text: message.data.text.substring(0, 60) + (message.data.text.length > 60 ? "..." : ""),
              value: message.data.sentiment,
              confidence: message.data.confidence || 0.92,
              icon: message.data.sentiment === 'Positive' ? <TrendingUp size={14} /> : <TrendingDown size={14} />
            };
            setActivities(prev => [newActivity, ...prev].slice(0, 6));
          }
        } catch (err) {
          console.error("Neural Data Corruption:", err);
        }
      };

      ws.onerror = () => {
        console.warn("Neural Link Interrupted. Retrying...");
      };

      ws.onclose = () => {
        reconnectTimeout = setTimeout(connect, 5000);
      };
    };

    connect();

    return () => {
      if (ws) ws.close();
      clearTimeout(reconnectTimeout);
    };
  }, []);

  return (
    <div className="glass rounded-[32px] p-8 overflow-hidden relative">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold">Neural Live Feed</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-lime-neon animate-ping" />
          <span className="mono-label !opacity-100">Live</span>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/40 transition-colors group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.value.includes('+') ? 'bg-lime-neon/20 text-lime-neon' : 'bg-charcoal/5 text-charcoal'}`}>
              {item.icon}
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium text-charcoal group-hover:translate-x-1 transition-transform">{item.text}</p>
              <p className="text-[10px] mono-label mt-1">Just now</p>
            </div>
            <div className="text-right shrink-0">
               <div className="text-xs font-bold font-mono px-2 py-1 bg-charcoal/5 rounded text-charcoal-muted">
                  {item.value}
               </div>
               {item.confidence && (
                 <div className="text-[9px] font-black text-lime-600 mt-1 uppercase tracking-tighter">
                    {Math.round(item.confidence * 100)}% Conf
                 </div>
               )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
    </div>
  );
};

export default LiveFeed;
