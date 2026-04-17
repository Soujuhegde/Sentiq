import React, { useState } from 'react';
import { Upload, FileJson, Link, CheckCircle2, AlertCircle, FileText, Database, Share2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const IngestCard = ({ title, icon: Icon, description, action, active = false, onClick }) => (
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
    <button className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${active ? 'bg-charcoal text-white shadow-lg' : 'bg-charcoal/5 text-charcoal-muted group-hover:bg-charcoal group-hover:text-white'}`}>
      {action}
    </button>
  </motion.div>
);

const Ingestion = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success

  const integrations = [
    { name: 'Amazon SP-API', status: 'Ready', icon: <Share2 size={16}/> },
    { name: 'Shopify Reviews', status: 'Coming Soon', icon: <Database size={16}/> },
    { name: 'Google Play Store', status: 'Active', icon: <Zap size={16}/> },
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
        />
        <IngestCard 
          title="JSON Data Feed"
          icon={FileJson}
          description="Send unstructured JSON payloads directly into our neural pre-processing pipeline."
          action="Connect Endpoint"
          active={activeTab === 'json'}
          onClick={() => setActiveTab('json')}
        />
        <IngestCard 
          title="Manual Input"
          icon={FileText}
          description="Paste raw review strings to test sentiment extraction or process isolated cases."
          action="Open Editor"
          active={activeTab === 'manual'}
          onClick={() => setActiveTab('manual')}
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
            <div className="glass p-10 rounded-[40px] flex flex-col items-center justify-center border-dashed border-2 border-charcoal/20 bg-white/40 h-64 hover:border-lime-neon hover:bg-white/60 transition-all cursor-pointer">
               <Upload size={48} className="text-charcoal/30 mb-4" />
               <h4 className="text-xl font-bold mb-2">Drop CSV or Excel files here</h4>
               <p className="text-charcoal-muted text-sm">Supports matching schemas automatically</p>
            </div>
          )}
          
          {activeTab === 'json' && (
            <div className="glass p-10 rounded-[40px] items-start border border-charcoal/10 bg-white/40">
               <h4 className="text-xl font-bold mb-4 flex items-center gap-2"><FileJson className="text-lime-600" /> JSON Upload / Endpoint</h4>
               <p className="text-charcoal-muted mb-6">Upload a `.json` array of reviews or provide endpoint configurations.</p>
               <div className="flex flex-col md:flex-row gap-4 w-full">
                 <button className="flex-1 bg-white border border-charcoal/10 py-6 rounded-2xl font-bold flex flex-col items-center justify-center gap-2 hover:border-lime-neon transition-colors">
                    <Upload size={24} className="text-charcoal/50" />
                    Select JSON File
                 </button>
                 <button className="flex-1 bg-white border border-charcoal/10 py-6 rounded-2xl font-bold flex flex-col items-center justify-center gap-2 hover:border-lime-neon transition-colors">
                    <Link size={24} className="text-charcoal/50" />
                    Configure Webhook
                 </button>
               </div>
            </div>
          )}

          {activeTab === 'manual' && (
            <div className="glass p-8 md:p-10 rounded-[40px] border border-lime-neon/20 bg-white/60">
               <h4 className="text-xl font-bold mb-4 flex items-center gap-2"><FileText className="text-lime-600" /> Manual Text Processor</h4>
               <p className="text-charcoal-muted text-sm mb-4">Pipeline will run: Text Cleaning &rarr; Typo Correction &rarr; Translation &rarr; Near-Duplicate Clustering &rarr; Sentiment AI.</p>
               <textarea 
                  className="w-full bg-white/50 border border-charcoal/10 rounded-2xl p-6 min-h-[160px] font-medium focus:outline-none focus:ring-2 focus:ring-lime-neon resize-none mb-4"
                  placeholder="Paste your raw text here..."
               />
               <div className="flex justify-end">
                 <button className="bg-charcoal text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-black transition-all">
                    Process Text Node
                 </button>
               </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Connection Panel */}
        <div className="glass p-10 rounded-[40px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold">Smart Integrations</h3>
            <span className="text-[10px] mono-label text-lime-600">3 Sources Connected</span>
          </div>
          <div className="space-y-4 flex-grow">
            {integrations.map((app) => (
              <div key={app.name} className="flex items-center justify-between p-6 bg-charcoal/5 rounded-3xl group hover:bg-white/40 transition-all border border-transparent hover:border-charcoal/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    {app.icon}
                  </div>
                  <span className="font-bold text-charcoal">{app.name}</span>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${app.status === 'Ready' || app.status === 'Active' ? 'bg-lime-neon/20 text-lime-600' : 'bg-charcoal/5 text-charcoal-muted'}`}>
                  {app.status}
                </div>
              </div>
            ))}
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
