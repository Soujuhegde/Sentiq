import React, { useState, useRef } from 'react';
import { Upload, FileJson, Link, CheckCircle2, AlertCircle, FileText, Database, Share2, Zap, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const IngestCard = ({ title, icon: Icon, description, action, active = false, onClick, onActionClick }) => (
  <motion.div 
    onClick={onClick}
    whileHover={{ y: -5 }}
    className={`glass p-8 rounded-[32px] border-2 transition-all cursor-pointer group ${active ? 'border-lime-neon/50 bg-white/60 shadow-lg' : 'border-transparent hover:border-charcoal/10'}`}
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${active ? 'bg-lime-neon text-charcoal' : 'bg-charcoal/5 text-charcoal-muted group-hover:bg-charcoal group-hover:text-white'}`}>
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-sm text-charcoal-muted font-medium leading-relaxed mb-6">{description}</p>
    <button 
      onClick={(e) => {
        if (active && onActionClick) {
          e.stopPropagation();
          onActionClick();
        }
      }}
      className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${active ? 'bg-charcoal text-white shadow-lg cursor-pointer' : 'bg-charcoal/5 text-charcoal-muted group-hover:bg-charcoal group-hover:text-white cursor-pointer'}`}
    >
      {action}
    </button>
  </motion.div>
);

const Ingestion = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success
  const [manualText, setManualText] = useState('');
  
  const fileInputRef = useRef(null);
  const jsonInputRef = useRef(null);

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadStatus('uploading');
      setTimeout(() => {
        setUploadStatus('success');
        setTimeout(() => setUploadStatus('idle'), 3000);
      }, 1500);
    }
  };

  const handleJsonUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadStatus('uploading');
      setTimeout(() => {
        setUploadStatus('success');
        setTimeout(() => setUploadStatus('idle'), 3000);
      }, 1500);
    }
  };

  const handleProcessManual = () => {
    if (!manualText.trim()) return;
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('success');
      setManualText('');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }, 1500);
  };

  const volumeData = [
    { time: '10:00', spam: 12, duplicates: 300 },
    { time: '10:05', spam: 18, duplicates: 450 },
    { time: '10:10', spam: 15, duplicates: 380 },
    { time: '10:15', spam: 25, duplicates: 600 },
    { time: '10:20', spam: 20, duplicates: 520 },
    { time: '10:25', spam: 30, duplicates: 850 },
    { time: '10:30', spam: 8,  duplicates: 1100 },
  ];

  const performanceData = [
    { time: '10:00', uptime: 99.9, latency: 12 },
    { time: '10:05', uptime: 99.8, latency: 15 },
    { time: '10:10', uptime: 99.9, latency: 13 },
    { time: '10:15', uptime: 99.7, latency: 18 },
    { time: '10:20', uptime: 99.8, latency: 14 },
    { time: '10:25', uptime: 99.9, latency: 11 },
    { time: '10:30', uptime: 99.8, latency: 14 },
  ];

  return (
    <main className="flex-grow pt-32 px-6 container mx-auto max-w-7xl relative z-10 pb-20 text-charcoal">
      <header className="mb-12">
        <div className="mono-label mb-2 text-lime-600">Layer 1 / Data Ingestion</div>
        <h1 className="text-5xl font-bold gradient-text">Intelligence Data Hub</h1>
        <p className="mt-4 text-charcoal-muted font-medium max-w-2xl text-lg">
          Sync, upload, or paste customer reviews from any source. Sentiq handles the noise, duplicates, and language shifts automatically.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <IngestCard 
          title="CSV / Excel Upload"
          icon={Upload}
          description="Drag and drop your spreadsheet exports from Amazon, Flipkart, or custom CRMs."
          action="Browse Files"
          active={activeTab === 'upload'}
          onClick={() => setActiveTab('upload')}
          onActionClick={() => fileInputRef.current?.click()}
        />
        <IngestCard 
          title="JSON Data Feed"
          icon={FileJson}
          description="Send unstructured JSON payloads directly into our neural pre-processing pipeline."
          action="Connect Endpoint"
          active={activeTab === 'json'}
          onClick={() => setActiveTab('json')}
          onActionClick={() => jsonInputRef.current?.click()}
        />
        <IngestCard 
          title="Manual Input"
          icon={FileText}
          description="Paste raw review strings to test sentiment extraction or process isolated cases."
          action="Open Editor"
          active={activeTab === 'manual'}
          onClick={() => setActiveTab('manual')}
          onActionClick={() => {
            document.getElementById('manual-textarea')?.focus();
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-12"
        >
          {activeTab === 'upload' && (
            <div 
              className="glass p-10 rounded-[40px] flex flex-col items-center justify-center border-dashed border-2 border-charcoal/20 bg-white/40 h-64 hover:border-lime-neon hover:bg-white/60 transition-all cursor-pointer relative overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
            >
               <input 
                 type="file" 
                 ref={fileInputRef} 
                 className="hidden" 
                 accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                 onChange={handleFileUpload} 
               />
               
               {uploadStatus === 'uploading' ? (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-lime-600">
                   <Loader2 size={48} className="animate-spin mb-4" />
                   <h4 className="text-xl font-bold">Uploading Data...</h4>
                 </motion.div>
               ) : uploadStatus === 'success' ? (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-lime-600">
                   <CheckCircle2 size={48} className="mb-4" />
                   <h4 className="text-xl font-bold mb-2">Upload Complete</h4>
                   <p className="text-sm font-medium opacity-80">Pipeline initiated.</p>
                 </motion.div>
               ) : (
                 <>
                   <Upload size={48} className="text-charcoal/30 mb-4 transition-transform group-hover:-translate-y-2" />
                   <h4 className="text-xl font-bold mb-2">Drop CSV or Excel files here</h4>
                   <p className="text-charcoal-muted text-sm">Supports matching schemas automatically</p>
                 </>
               )}
            </div>
          )}
          
          {activeTab === 'json' && (
            <div className="glass p-10 rounded-[40px] items-start border border-charcoal/10 bg-white/40 relative">
               <input 
                 type="file" 
                 ref={jsonInputRef} 
                 className="hidden" 
                 accept=".json, application/json" 
                 onChange={handleJsonUpload} 
               />
               <h4 className="text-xl font-bold mb-4 flex items-center gap-2"><FileJson className="text-lime-600" /> JSON Upload / Endpoint</h4>
               <p className="text-charcoal-muted mb-6">Upload a `.json` array of reviews or provide endpoint configurations.</p>
               
               {uploadStatus === 'uploading' || uploadStatus === 'success' ? (
                 <div className="w-full flex items-center justify-center p-8 bg-white border border-charcoal/10 rounded-2xl">
                   {uploadStatus === 'uploading' ? (
                     <div className="flex flex-col items-center text-lime-600">
                       <Loader2 size={32} className="animate-spin mb-3" />
                       <span className="font-bold">Processing JSON payload...</span>
                     </div>
                   ) : (
                     <div className="flex flex-col items-center text-lime-600">
                       <CheckCircle2 size={32} className="mb-3" />
                       <span className="font-bold">JSON payload successfully ingested.</span>
                     </div>
                   )}
                 </div>
               ) : (
                 <div className="flex flex-col md:flex-row gap-4 w-full">
                   <button 
                     onClick={() => jsonInputRef.current?.click()}
                     className="flex-1 bg-white border border-charcoal/10 py-6 rounded-2xl font-bold flex flex-col items-center justify-center gap-2 hover:border-lime-neon transition-colors"
                   >
                      <Upload size={24} className="text-charcoal/50" />
                      Select JSON File
                   </button>
                   <button 
                     onClick={() => {
                        setUploadStatus('uploading');
                        setTimeout(() => {
                          setUploadStatus('success');
                          setTimeout(() => setUploadStatus('idle'), 3000);
                        }, 1500);
                     }}
                     className="flex-1 bg-white border border-charcoal/10 py-6 rounded-2xl font-bold flex flex-col items-center justify-center gap-2 hover:border-lime-neon transition-colors"
                   >
                      <Link size={24} className="text-charcoal/50" />
                      Configure Webhook (Demo)
                   </button>
                 </div>
               )}
            </div>
          )}

          {activeTab === 'manual' && (
            <div className="glass p-8 md:p-10 rounded-[40px] border border-lime-neon/20 bg-white/60">
               <h4 className="text-xl font-bold mb-4 flex items-center gap-2"><FileText className="text-lime-600" /> Manual Text Processor</h4>
               <p className="text-charcoal-muted text-sm mb-4">Pipeline will run: Text Cleaning &rarr; Typo Correction &rarr; Translation &rarr; Near-Duplicate Clustering &rarr; Sentiment AI.</p>
               <textarea 
                  id="manual-textarea"
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  disabled={uploadStatus !== 'idle'}
                  className="w-full bg-white/50 border border-charcoal/10 rounded-2xl p-6 min-h-[160px] font-medium focus:outline-none focus:ring-2 focus:ring-lime-neon resize-none mb-4 disabled:opacity-50"
                  placeholder="Paste your raw text here..."
               />
               <div className="flex justify-end items-center gap-4">
                 {uploadStatus !== 'idle' && (
                   <span className="text-sm font-bold text-lime-600 flex items-center gap-2">
                     {uploadStatus === 'uploading' ? (
                       <><Loader2 size={16} className="animate-spin" /> Processing...</>
                     ) : (
                       <><CheckCircle2 size={16} /> Analysis Complete</>
                     )}
                   </span>
                 )}
                 <button 
                   onClick={handleProcessManual}
                   disabled={uploadStatus !== 'idle' || !manualText.trim()}
                   className="bg-charcoal text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    {uploadStatus === 'uploading' ? 'Processing...' : 'Process Text Node'}
                 </button>
               </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Graphs replacing Smart Integrations */}
        <div className="flex flex-col gap-8">
          {/* Top Graph: Volume Stats */}
          <div className="glass p-8 rounded-[40px] flex flex-col h-full bg-white/40 border border-lime-neon/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Threat & Duplicate Volume</h3>
              <span className="text-[10px] mono-label text-lime-600">Last 30 Mins</span>
            </div>
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeData}>
                  <defs>
                    <linearGradient id="colorSpam" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorDupes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#84cc16" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#84cc16" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#999'}} dy={10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }} 
                    labelStyle={{ fontWeight: 'bold', color: '#333', marginBottom: '4px' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="duplicates" name="Duplicate Clusters" stroke="#84cc16" strokeWidth={3} fillOpacity={1} fill="url(#colorDupes)" />
                  <Area type="monotone" dataKey="spam" name="Spam Blocked" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorSpam)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Graph: Performance Stats */}
          <div className="glass p-8 rounded-[40px] flex flex-col h-full bg-white/40 border border-lime-neon/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">System Performance</h3>
              <span className="text-[10px] mono-label text-lime-600">Real-time</span>
            </div>
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#999'}} dy={10} />
                  <YAxis yAxisId="left" domain={[99, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#999'}} dx={-10} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 30]} axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#999'}} dx={10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }} 
                    labelStyle={{ fontWeight: 'bold', color: '#333', marginBottom: '4px' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Line yAxisId="left" type="monotone" dataKey="uptime" name="Uptime (%)" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                  <Line yAxisId="right" type="monotone" dataKey="latency" name="Latency (ms)" stroke="#8b5cf6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Live Status / Verification */}
        <div className="glass p-10 rounded-[40px] border-lime-neon/10 bg-white/20">
          <h3 className="text-2xl font-bold mb-8">Preprocessing Statistics</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-3xl shadow-sm border border-charcoal/5">
              <div className="text-3xl font-bold mb-1">128</div>
              <div className="text-[10px] mono-label opacity-40 uppercase">Spam / Bots Blocked</div>
            </div>
            <div className="p-6 bg-white rounded-3xl shadow-sm border border-charcoal/5">
              <div className="text-3xl font-bold mb-1">4.2k</div>
              <div className="text-[10px] mono-label opacity-40 uppercase">Duplicate Clusters</div>
            </div>
            <div className="p-6 bg-white rounded-3xl shadow-sm border border-charcoal/5">
              <div className="text-3xl font-bold mb-1">99.8%</div>
              <div className="text-[10px] mono-label opacity-40 uppercase">Ingestion Uptime</div>
            </div>
            <div className="p-6 bg-white rounded-3xl shadow-sm border border-charcoal/5">
              <div className="text-3xl font-bold mb-1">14ms</div>
              <div className="text-[10px] mono-label opacity-40 uppercase">Avg Pipeline Latency</div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-charcoal text-white rounded-[32px] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-lime-neon flex items-center justify-center text-charcoal">
                <Zap size={20} />
              </div>
              <div>
                <div className="text-sm font-bold">Real-time Feed Active</div>
                <div className="text-[10px] opacity-60">Last ingestion: 4s ago</div>
              </div>
            </div>
            <CheckCircle2 size={24} className="text-lime-neon" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Ingestion;
