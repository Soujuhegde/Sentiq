import React from 'react';
import { MessageSquare, ThumbsUp, AlertTriangle, TrendingUp } from 'lucide-react';
import { FadeIn } from '../components/animations/FadeIn';
import { StatCard } from '../components/dashboard/StatCard';
import { LiveFeed } from '../components/dashboard/LiveFeed';
import { TrendChart } from '../components/charts/TrendChart';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back. Here is what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <FadeIn delay={0}>
          <StatCard 
            title="Total Reviews"
            value="14,249"
            icon={MessageSquare}
            trend="up"
            trendValue="12%"
          />
        </FadeIn>
        <FadeIn delay={0.1}>
          <StatCard 
            title="Avg Sentiment Score"
            value="78 / 100"
            icon={ThumbsUp}
            trend="up"
            trendValue="4%"
          />
        </FadeIn>
        <FadeIn delay={0.2}>
          <StatCard 
            title="Critical Issues"
            value="24"
            icon={AlertTriangle}
            trend="down"
            trendValue="18%"
          />
        </FadeIn>
        <FadeIn delay={0.3}>
          <StatCard 
            title="Engagement Rate"
            value="8.4%"
            icon={TrendingUp}
            trend="up"
            trendValue="2%"
          />
        </FadeIn>
      </div>

      {/* Charts & Feed Grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <FadeIn delay={0.4} className="lg:col-span-2 h-[450px]">
          <TrendChart />
        </FadeIn>
        <FadeIn delay={0.5} className="h-[450px]">
          <LiveFeed />
        </FadeIn>
      </div>
      
      {/* Heatmap Dummy Area */}
      <FadeIn delay={0.6}>
        <Card>
          <CardHeader>
            <CardTitle>Feature Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-48 w-full bg-accent/50 rounded-md border border-border flex items-center justify-center p-8">
               <div className="flex flex-wrap gap-2">
                 {['Login UI', 'Pricing Page', 'Checkout Flow', 'Dashboard', 'Notifications', 'Mobile App', 'Support'].map((tag, i) => (
                   <span key={tag} className={`px-3 py-1 rounded-md text-sm font-medium ${i % 2 === 0 ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                     {tag}
                   </span>
                 ))}
               </div>
             </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
