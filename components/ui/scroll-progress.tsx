'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className='pointer-events-none fixed inset-x-0 top-0 z-[60] h-px origin-left bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.9)]'
      style={{ scaleX }}
      aria-hidden='true'
    />
  );
}
