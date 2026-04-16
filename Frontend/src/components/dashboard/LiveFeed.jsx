import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Activity } from 'lucide-react';
import { LIVE_FEED } from '../../utils/constants';
import { cn } from '../../utils/cn';

export function LiveFeed() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center space-x-2">
        <Activity className="h-5 w-5 text-primary" />
        <CardTitle>Live Feed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {LIVE_FEED.map((item) => (
          <div key={item.id} className="flex flex-col space-y-1 pb-4 border-b border-border/50 last:border-0 last:pb-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.source}</span>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
            <p className="text-sm text-foreground/80">{item.text}</p>
            <div>
              <Badge variant={item.sentiment === 'positive' ? 'success' : item.sentiment === 'negative' ? 'destructive' : 'secondary'}>
                {item.sentiment}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
