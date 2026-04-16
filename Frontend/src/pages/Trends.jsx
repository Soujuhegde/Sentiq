import React from 'react';
import { FadeIn } from '../components/animations/FadeIn';
import { TrendChart } from '../components/charts/TrendChart';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { AlertTriangle, TrendingUp } from 'lucide-react';

export default function Trends() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sentiment Trends</h1>
        <p className="text-muted-foreground">Analyze historical shifts in customer perception.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <FadeIn delay={0} className="lg:col-span-2">
          <TrendChart />
        </FadeIn>
        <FadeIn delay={0.2} className="space-y-4">
          <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-destructive space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Emerging Issue</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Login timeouts increased</p>
              <p className="text-sm text-muted-foreground mt-1">
                We detected a 34% spike in negative sentiment related to "login" and "timeout" in the last 48 hours.
              </p>
            </CardContent>
          </Card>
          <Card className="border-success/50 bg-success/5">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-success space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Positive Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">New UI well received</p>
              <p className="text-sm text-muted-foreground mt-1">
                Positive mentions of the "dashboard interface" have grown 80% since the Tuesday release.
              </p>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
