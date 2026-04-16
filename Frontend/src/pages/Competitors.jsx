import React from 'react';
import { FadeIn } from '../components/animations/FadeIn';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { COMPETITORS_DATA } from '../utils/constants';

export default function Competitors() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Competitor Benchmarking</h1>
        <p className="text-muted-foreground">See how you stack up against the market leaders.</p>
      </div>

      <FadeIn delay={0}>
        <Card>
          <CardHeader>
            <CardTitle>Market Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-accent/50">
                  <tr>
                    <th className="px-6 py-3 rounded-tl-md">Brand</th>
                    <th className="px-6 py-3">App Rating</th>
                    <th className="px-6 py-3">Total Mentions</th>
                    <th className="px-6 py-3 rounded-tr-md">Sentiment Score</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPETITORS_DATA.map((comp, idx) => (
                    <tr key={comp.name} className="border-b border-border last:border-0">
                      <td className="px-6 py-4 font-medium flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: comp.color }} />
                        <span>{comp.name}</span>
                      </td>
                      <td className="px-6 py-4">{comp.rating} / 5.0</td>
                      <td className="px-6 py-4">{comp.mentions}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-accent rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full" 
                              style={{ width: `${comp.sentiment}%`, backgroundColor: comp.color }}
                            ></div>
                          </div>
                          <span className="w-8 font-medium">{comp.sentiment}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      <div className="grid gap-4 md:grid-cols-2">
        <FadeIn delay={0.2}>
          <Card>
            <CardHeader>
              <CardTitle>Strength: Customer Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You are outperforming <strong>Competitor A</strong> by 24% in positive sentiment regarding customer support resolution times.
              </p>
            </CardContent>
          </Card>
        </FadeIn>
        <FadeIn delay={0.3}>
          <Card>
            <CardHeader>
              <CardTitle>Weakness: Pricing Value</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                <strong>Competitor C</strong> has 45% fewer complaints regarding subscription costs compared to your recent pricing update.
              </p>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
