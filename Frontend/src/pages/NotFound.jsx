import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import NeuralBackground from '../components/NeuralBackground';

const NotFound = () => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-ivory text-charcoal p-6">
      <NeuralBackground />
      
      <div className="glass p-12 md:p-20 rounded-[48px] max-w-2xl w-full text-center relative z-10 border-red-500/10 border-2">
        <div className="w-20 h-20 rounded-3xl bg-charcoal flex items-center justify-center mb-10 mx-auto shadow-2xl">
          <ShieldAlert className="text-red-400" size={40} />
        </div>
        
        <div className="mono-label mb-4 text-red-500 font-bold">Error Code / 404</div>
        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
          Link <br />
          <span className="text-charcoal-muted">Broken.</span>
        </h1>
        
        <p className="text-xl text-charcoal-muted font-medium mb-12 leading-relaxed">
          The requested info does not exist in the active system. It may have been moved or deleted during a system update.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center gap-3 bg-charcoal text-white px-10 py-4 rounded-full font-bold hover:bg-black transition-all shadow-xl group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back Home
        </Link>
      </div>

      <div className="absolute bottom-12 mono-label opacity-40">
        System Version: v2026.4.1 // Group: Main
      </div>
    </div>
  );
};

export default NotFound;
