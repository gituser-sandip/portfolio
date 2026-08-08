import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'accent' | 'neutral';
}

export function Badge({ className, tone = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium',
        tone === 'accent'
          ? 'border-red-500/30 bg-red-500/10 text-red-400'
          : 'border-line bg-surface/70 text-muted',
        className,
      )}
      {...props}
    />
  );
}
