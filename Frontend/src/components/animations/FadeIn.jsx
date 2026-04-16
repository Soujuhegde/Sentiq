import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../utils/cn';

export function FadeIn({ children, className, delay = 0, y = 50, duration = 0.8, ...props }) {
  const ref = useScrollAnimation({ delay, y, duration });

  return (
    <div ref={ref} className={cn('opacity-0', className)} {...props}>
      {children}
    </div>
  );
}
