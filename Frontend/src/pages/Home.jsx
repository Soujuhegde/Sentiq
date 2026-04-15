import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6 w-fit">
            Frontend Project Ready
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Welcome to your <span className="text-blue-600">New Setup</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            A clean, minimal, and professional foundation for your next big idea. 
            Built with React, Vite, and Tailwind CSS for maximum velocity.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Get Started
            </button>
            <button className="px-6 py-3 bg-white text-gray-700 font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300">
              Documentation
            </button>
          </div>
        </div>
        <div className="md:w-1/2 bg-blue-600 p-8 flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -mr-20 -mt-20 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-700 rounded-full -ml-16 -mb-16 opacity-50"></div>
          <div className="relative z-10 text-white text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🚀</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Fast Development</h2>
            <p className="text-blue-100">Hot reloading enabled for instant feedback as you code.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        <FeatureCard 
          icon="⚡" 
          title="Vite" 
          description="Lightning fast build tool with native ES modules support."
        />
        <FeatureCard 
          icon="🎨" 
          title="Tailwind CSS" 
          description="Utility-first CSS framework for rapid UI development."
        />
        <FeatureCard 
          icon="⚛️" 
          title="React" 
          description="Component-based library for building interactive interfaces."
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

export default Home;
