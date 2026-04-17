import React from 'react';

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-charcoal/5">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <a href="/" className="flex items-center gap-2 group">

                <div className="w-8 h-8 rounded-lg lime-gradient flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <span className="text-charcoal font-bold text-xl leading-none">S</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-charcoal">Sentiq</span>
              </a>
            </div>
            <p className="text-charcoal-muted font-medium max-w-xs leading-relaxed">
              Decoding the science of sentiment. Gemini 2.5 powered intelligence for the modern enterprise.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-charcoal mb-6 text-xs uppercase tracking-widest">Platform</h4>
            <ul className="space-y-4 text-charcoal-muted font-medium text-sm">
              <li><a href="/dashboard" className="hover:text-charcoal transition-colors">Neural Dashboard</a></li>
              <li><a href="/trends" className="hover:text-charcoal transition-colors">Trend Engine</a></li>
              <li><a href="/sales-impact" className="hover:text-charcoal transition-colors">Sales Predictor</a></li>
              <li><a href="/chatbot" className="hover:text-charcoal transition-colors">Strategy Console</a></li>
            </ul>
          </div>


          <div>
            <h4 className="font-bold text-charcoal mb-6">Company</h4>
            <ul className="space-y-4 text-charcoal-muted font-medium text-sm">
              <li><a href="#" className="hover:text-charcoal transition-colors">About</a></li>
              <li><a href="#" className="hover:text-charcoal transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-charcoal transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-charcoal transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-charcoal mb-6">Legal</h4>
            <ul className="space-y-4 text-charcoal-muted font-medium text-sm">
              <li><a href="#" className="hover:text-charcoal transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-charcoal transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-charcoal transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-charcoal mb-6">Social</h4>
            <ul className="space-y-4 text-charcoal-muted font-medium text-sm">
              <li><a href="#" className="hover:text-charcoal transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-charcoal transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-charcoal transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-charcoal/5">
          <p className="text-charcoal-muted text-sm font-medium">
            © 2026 Sentiq AI Inc. All rights reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-charcoal-muted text-sm font-medium">Status: All Systems Operational</span>
            <span className="text-charcoal-muted text-sm font-medium">v. 2026.4.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
