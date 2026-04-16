import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { FadeIn } from '../components/animations/FadeIn';
import { Zap, Activity, BrainCircuit, LineChart } from 'lucide-react';
import { FEATURES_OVERVIEW } from '../utils/constants';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import gsap from 'gsap';

export default function Home() {
  useSmoothScroll();
  const heroTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-char',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: 'power4.out', delay: 0.2 }
      );
    }, heroTextRef);
    return () => ctx.revert();
  }, []);

  const textParts = "Review Intelligence.\nRedefined.".split('');

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-2 font-bold text-2xl">
          <Zap className="h-8 w-8 text-primary" />
          <span>Sentiq<span className="text-primary">.ai</span></span>
        </div>
        <div className="space-x-4">
          <Button variant="ghost">Login</Button>
          <Link to="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-5xl mx-auto px-6 py-32 flex flex-col items-center text-center">
          <Badge>New Feature: Generative AI Summaries</Badge>
          <h1 
            ref={heroTextRef}
            className="mt-8 text-6xl md:text-8xl font-extrabold tracking-tight leading-[1.1]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
          >
            {textParts.map((char, index) => (
              <span 
                key={index} 
                className={char === '\n' ? 'block' : 'inline-block hero-char'}
                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </span>
            ))}
          </h1>
          <FadeIn delay={0.8} duration={1}>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform chaotic customer feedback into clear, actionable revenue metrics instantly. Built for modern product teams.
            </p>
            <div className="mt-10 flex items-center justify-center space-x-4">
              <Link to="/dashboard">
                <Button size="lg" className="h-12 px-8 text-lg">Explore Sentiq</Button>
              </Link>
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg">Book Demo</Button>
            </div>
          </FadeIn>
        </section>

        {/* Features Section */}
        <section className="w-full bg-card/30 border-t border-border mt-24 py-32">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold tracking-tight">Everything you need to build better.</h2>
                <p className="text-lg text-muted-foreground mt-4">Say goodbye to spreadsheets and complex queries.</p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {FEATURES_OVERVIEW.map((feature, idx) => (
                <FadeIn key={idx} delay={idx * 0.1} y={30} className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors duration-300">
                  <div className="bg-accent w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                    {idx === 0 ? <Activity className="text-primary" /> : 
                     idx === 1 ? <LineChart className="text-primary" /> :
                     idx === 2 ? <Zap className="text-primary" /> :
                     <BrainCircuit className="text-primary" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Re-use badge just for this page nicely without importing if missing, or import.
function Badge({ children }) {
  return (
    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20">
      {children}
    </div>
  );
}
