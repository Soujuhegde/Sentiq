import { useState } from 'react';
import { Send, Bot, User, Sparkles, ChevronRight, MessageSquare, Loader2 } from 'lucide-react';
import { ENDPOINTS } from '../api/config';

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([
    {
      role: 'assistant',
      content: "Neural core active. How may I assist with your market strategy today?"
    }
  ]);

  const executeQuery = async () => {
    if (!query.trim() || isLoading) return;

    const userMessage = { role: 'user', content: query };
    setHistory(prev => [...prev, userMessage]);
    setQuery("");
    setIsLoading(true);

    try {
      const response = await fetch(ENDPOINTS.CHATBOT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await response.json();
      
      setHistory(prev => [...prev, { 
        role: 'assistant', 
        content: data.response,
        thought: "Analyzing multi-vector sentiment data shards..."
      }]);
    } catch (err) {
      setHistory(prev => [...prev, { role: 'assistant', content: "Neural sync failed. Please check backend connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-grow pt-32 px-6 container mx-auto max-w-4xl relative z-10 flex flex-col pb-20">
      <header className="mb-8 border-b border-charcoal/5 pb-8 flex justify-between items-end">
        <div>
          <div className="mono-label mb-2">Interface / Neural Consulting</div>
          <h1 className="text-4xl font-bold gradient-text text-charcoal">AI Strategy Hub</h1>
        </div>
        <div className="flex gap-2">
           <div className="glass px-4 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-2 border-lime-neon/50">
              <Sparkles size={12} className="text-lime-neon" />
              Gemini 2.5 ACTIVE
           </div>
        </div>
      </header>
      
      <div className="flex-grow space-y-8 mb-12 min-h-[500px]">
         {history.map((msg, i) => (
           <div key={i} className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'assistant' ? 'lime-gradient text-charcoal' : 'bg-charcoal text-white'}`}>
                 {msg.role === 'assistant' ? <Bot size={24} /> : <User size={24} />}
              </div>
              
              <div className={`flex flex-col gap-3 max-w-[80%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                 {msg.thought && (
                    <div className="text-[10px] font-mono p-3 bg-charcoal/5 rounded-xl border-l-2 border-lime-neon/40 text-charcoal-muted italic">
                       {msg.thought}
                    </div>
                 )}
                 <div className={`p-6 rounded-[32px] font-medium text-sm leading-relaxed shadow-sm ${
                    msg.role === 'assistant' ? 'glass text-charcoal' : 'bg-charcoal text-white'
                 } ${msg.role === 'assistant' ? 'rounded-tl-none' : 'rounded-tr-none'}`}>
                    {msg.content}
                 </div>
              </div>
           </div>
         ))}
      </div>

      <div className="glass p-2 rounded-[32px] overflow-hidden flex items-center gap-2 sticky bottom-8">
         <div className="w-12 h-12 flex items-center justify-center text-charcoal-muted ml-2">
            <MessageSquare size={20} />
         </div>
         <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && executeQuery()}
            placeholder="Query the strategic engine..." 
            className="flex-grow bg-transparent px-2 py-4 outline-none font-medium text-charcoal"
            disabled={isLoading}
         />
         <button 
            onClick={executeQuery}
            disabled={isLoading}
            className="bg-charcoal text-white px-8 py-4 rounded-[28px] font-bold hover:bg-black transition-all flex items-center gap-3 active:scale-95"
         >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Execute'}
            <Send size={16} />
         </button>
      </div>

      <div className="mt-12 flex justify-center gap-6">
         {['Sentiment Audit', 'Churn Predictor', 'Sales Playbook'].map(btn => (
            <button key={btn} className="text-[10px] mono-label hover:text-charcoal transition-colors border-b border-transparent hover:border-lime-neon">
               {btn}
            </button>
         ))}
      </div>
    </main>
  );
};

export default Chatbot;

