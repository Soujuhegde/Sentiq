import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Blog', href: '#blog' },
  ];

  const isPlatformPage = location.pathname !== '/';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}
    >
      <div className="container mx-auto px-6">
        <div className={`mx-auto max-w-7xl glass rounded-full px-6 py-2 flex items-center justify-between ${isScrolled ? 'shadow-lg bg-white/60' : 'bg-white/40'}`}>
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg lime-gradient flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <span className="text-charcoal font-bold text-xl leading-none">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-charcoal">Sentiq</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {!isPlatformPage ? (
              navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-sm font-medium text-charcoal-muted hover:text-charcoal transition-colors"
                >
                  {link.name}
                </a>
              ))
            ) : (
              <div className="flex items-center gap-2 px-4 py-1.5 bg-charcoal/5 rounded-full border border-charcoal/10">
                <div className="w-1.5 h-1.5 rounded-full bg-lime-neon animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] font-bold text-charcoal-muted">Neural Active</span>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/chatbot"
              className="px-5 py-2 text-sm font-bold text-charcoal hover:bg-white rounded-full transition-all border border-transparent hover:border-ivory"
            >
              Strategy Console
            </Link>
            <Link 
              to="/dashboard"
              className="group px-5 py-2 text-sm font-bold text-white bg-charcoal rounded-full transition-all hover:bg-black shadow-sm flex items-center gap-2"
            >
              Enter Platform
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-charcoal"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-6 right-6 mt-2 glass rounded-2xl p-6 shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {!isPlatformPage ? (
                navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    className="text-lg font-bold text-charcoal"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))
              ) : (
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-charcoal">Neural Dashboard</Link>
              )}
              <hr className="border-charcoal/10" />
              <Link to="/chatbot" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 text-center text-charcoal font-bold rounded-xl hover:bg-white/50">
                Strategy Console
              </Link>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 bg-charcoal text-white text-center font-bold rounded-xl">
                Enter Platform
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;

