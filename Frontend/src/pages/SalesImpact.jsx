import React, { useEffect, useRef } from 'react';
import { FadeIn } from '../components/animations/FadeIn';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { DollarSign, ShieldAlert } from 'lucide-react';
import gsap from 'gsap';

export default function SalesImpact() {
  const dialRef = useRef(null);
  const numberRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(dialRef.current, { rotation: -90 }, { rotation: 45, duration: 1.5, ease: 'power3.out', delay: 0.2 });
      
      gsap.to(numberRef.current, {
        innerText: 240.5,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.2,
        snap: { innerText: 0.1 },
        onUpdate: function() {
           if (numberRef.current) {
             numberRef.current.innerHTML = '$' + Number(this.targets()[0].innerText).toFixed(1) + 'k';
           }
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sales Impact & Risk</h1>
        <p className="text-muted-foreground">Understand how customer sentiment affects your bottom line.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <FadeIn delay={0} className="lg:col-span-1">
          <Card className="h-full flex flex-col items-center justify-center py-10">
             <CardTitle className="mb-6 text-muted-foreground">Revenue At Risk</CardTitle>
             {/* Pure CSS/GSAP animated dial */}
             <div className="relative w-48 h-24 overflow-hidden mb-4">
               <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[20px] border-accent"></div>
               <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[20px] border-destructive border-b-transparent border-r-transparent transform -rotate-45"></div>
               {/* Needle */}
               <div 
                 ref={dialRef}
                 className="absolute bottom-0 left-1/2 w-1 h-24 bg-foreground origin-bottom transform -rotate-90 -translate-x-1/2"
               ></div>
               <div className="absolute bottom-[-4px] left-1/2 w-4 h-4 bg-foreground rounded-full transform -translate-x-1/2"></div>
             </div>
             <div className="text-5xl font-extrabold tracking-tight text-destructive" ref={numberRef}>
               $0k
             </div>
             <p className="text-sm text-muted-foreground mt-4">Based on critical app downtime reports</p>
          </Card>
        </FadeIn>

        <div className="lg:col-span-2 space-y-4 flex flex-col">
          <FadeIn delay={0.2}>
            <Card>
              <CardHeader className="flex flex-row items-center space-x-2">
                <ShieldAlert className="h-5 w-5 text-destructive" />
                <CardTitle>Top Drivers of Negative Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Login Downtime</span>
                    <span className="text-sm text-muted-foreground">Est. $120k</span>
                  </div>
                  <div className="w-full bg-accent rounded-full h-2">
                    <div className="bg-destructive h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Subscription Bug</span>
                    <span className="text-sm text-muted-foreground">Est. $80k</span>
                  </div>
                  <div className="w-full bg-accent rounded-full h-2">
                    <div className="bg-destructive/80 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Customer Support Slow Response</span>
                    <span className="text-sm text-muted-foreground">Est. $40k</span>
                  </div>
                  <div className="w-full bg-accent rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
          <FadeIn delay={0.3} className="flex-1">
             <Card className="h-full">
               <CardHeader className="flex flex-row items-center space-x-2">
                 <DollarSign className="h-5 w-5 text-success" />
                 <CardTitle>Upsell Opportunities</CardTitle>
               </CardHeader>
               <CardContent>
                 <p className="text-sm text-muted-foreground">
                   28% of highly positive reviews mention "wish there was an enterprise tier". Prioritize sales outreach to these accounts.
                 </p>
               </CardContent>
             </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
