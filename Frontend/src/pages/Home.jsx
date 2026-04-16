import React from 'react';
import { useNavigate } from 'react-router-dom';
import NeuralBackground from '../components/NeuralBackground';
import CommandHub from '../components/CommandHub';
import HeroEditorial from '../components/HeroEditorial';
import FeaturesStacking from '../components/FeaturesStacking';
import Differentiation from '../components/Differentiation';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Database, FileText, ShoppingBag, Globe, ArrowRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const sources = [
    { name: 'Snowflake', icon: <Database className="text-blue-400" /> },
    { name: 'SQL Server', icon: <Database /> },
    { name: 'CSV/Excel', icon: <FileText /> },
    { name: 'Shopify', icon: <ShoppingBag /> },
    { name: 'Custom API', icon: <Globe /> },
  ];

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <NeuralBackground />
      <CommandHub />
      
      <main className="relative">
        <HeroEditorial />
        
        {/* Abstract Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-charcoal/5 to-transparent my-20" />
        
        <FeaturesStacking />

        {/* Data Source Selector */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <div className="mono-label mb-4">Ingestion / Connectivity</div>
                <h2 className="text-5xl font-bold tracking-tighter leading-tight mb-6">
                  One platform. <span className="text-charcoal-muted">Every data source.</span>
                </h2>
                <p className="text-xl text-charcoal-muted font-medium">
                  Connect your entire ecosystem in minutes. Sentiq's neural engine maps any schema to active intelligence.
                </p>
              </div>
              <button 
                onClick={() => navigate('/dashboard')}
                className="group flex items-center gap-3 bg-charcoal text-white pl-8 pr-6 py-4 rounded-full font-bold hover:bg-black transition-all"
              >
                Enter the Platform
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {sources.map((source, i) => (
                <div 
                  key={i} 
                  onClick={() => navigate('/dashboard')}
                  className="glass p-8 rounded-[32px] flex flex-col items-center justify-center text-center group hover:bg-white/60 transition-all cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-2xl bg-charcoal/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {React.cloneElement(source.icon, { size: 32 })}
                  </div>
                  <span className="font-bold text-charcoal">{source.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <div className="mask-section">
           <Differentiation />
        </div>
        
        <FinalCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;




