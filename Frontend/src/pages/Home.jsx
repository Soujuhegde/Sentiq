import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroEditorial from '../components/HeroEditorial';
import FeaturesStacking from '../components/FeaturesStacking';
import Differentiation from '../components/Differentiation';
import FinalCTA from '../components/FinalCTA';
import { Target, Activity, Zap, MessageSquare, Briefcase, ArrowRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  
  const useCases = [
    { name: 'Product Strategy', icon: <Target className="text-lime-500" /> },
    { name: 'Brand Monitoring', icon: <Activity className="text-charcoal" /> },
    { name: 'Keeping Customers', icon: <Zap className="text-blue-500" /> },
    { name: 'User Feedback', icon: <MessageSquare className="text-purple-500" /> },
    { name: 'Sales Data', icon: <Briefcase className="text-emerald-500" /> },
  ];

  return (
    <main className="relative">
      <div id="platform">
        <HeroEditorial />
      </div>
      
      {/* Abstract Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-charcoal/5 to-transparent my-20" />
      
      <div id="solutions">
        <FeaturesStacking />
      </div>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-24 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="mono-label mb-4">Business Uses</div>
              <h2 className="text-5xl font-bold tracking-tighter leading-tight mb-6">
                Infinite uses. <span className="text-charcoal-muted">One smart system.</span>
              </h2>
              <p className="text-xl text-charcoal-muted font-medium">
                Turn messy feedback into clear business goals. Discover how Sentiq empowers every department.
              </p>
            </div>
            <button 
              onClick={() => navigate('/dashboard')}
              className="group flex items-center gap-3 bg-charcoal text-white pl-8 pr-6 py-4 rounded-full font-bold hover:bg-black transition-all"
            >
              Explore Use Cases
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {useCases.map((useCase, i) => (
              <div 
                key={i} 
                onClick={() => navigate('/dashboard')}
                className="glass p-8 rounded-[32px] flex flex-col items-center justify-center text-center group hover:bg-lime-neon/10 transition-all cursor-pointer border border-transparent hover:border-lime-neon/30"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {React.cloneElement(useCase.icon, { size: 32 })}
                </div>
                <span className="font-bold text-charcoal">{useCase.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div id="resources" className="mask-section">
         <Differentiation />
      </div>
      
      <div id="pricing">
        <FinalCTA />
      </div>
    </main>
  );
};

export default Home;




