'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  strength?: number;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export function MagneticButton({
  children,
  className,
  strength = 0.2,
  ariaLabel,
  onClick,
  href,
  target,
  rel,
}: MagneticButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  function handlePointerMove(event: React.PointerEvent<HTMLAnchorElement>) {
    if (shouldReduceMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    setOffset({
      x: (event.clientX - bounds.left - bounds.width / 2) * strength,
      y: (event.clientY - bounds.top - bounds.height / 2) * strength,
    });
  }

  function handlePointerLeave(event: React.PointerEvent<HTMLAnchorElement>) {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <motion.a
      className={cn(
        'inline-flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        className,
      )}
      animate={shouldReduceMotion ? undefined : offset}
      transition={{ type: 'spring', stiffness: 280, damping: 16, mass: 0.25 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
    >
      {children}
    </motion.a>
  );
}
