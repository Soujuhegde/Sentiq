import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Users, MessageSquare, Briefcase, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';

const NAV_ITEMS = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Trends', href: '/trends', icon: TrendingUp },
  { title: 'Competitors', href: '/competitors', icon: Users },
  { title: 'Chatbot', href: '/chatbot', icon: MessageSquare },
  { title: 'Sales Impact', href: '/sales-impact', icon: Briefcase },
];

export function Sidebar({ className }) {
  return (
    <div className={cn('flex flex-col w-64 border-r border-border bg-card/50 min-h-screen', className)}>
      <div className="flex h-16 items-center px-6 border-b border-border">
        <NavLink to="/" className="flex items-center space-x-2 font-bold text-xl tracking-tight">
          <Zap className="h-6 w-6 text-primary" />
          <span>Sentiq<span className="text-primary">.ai</span></span>
        </NavLink>
      </div>
      <div className="flex-1 px-4 py-6 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
