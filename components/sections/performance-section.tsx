'use client';

import { Activity, CheckCircle2, CircleGauge, ShieldCheck, Zap } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { performanceMetrics } from '@/content/portfolio';
import { SectionHeading } from '@/components/ui/section-heading';

const metricIcons = [CircleGauge, ShieldCheck, Activity, Zap];

export function PerformanceSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className='section-rule py-24 md:py-32' id='performance'>
      <div className='section-shell'>
        <div className='grid gap-12 lg:grid-cols-[minmax(0,0.68fr)_minmax(34rem,1.32fr)] lg:items-end'>
          <SectionHeading
            eyebrow='Quality dashboard'
            title='Performance is part of the product experience.'
            description='I treat load speed, interaction feedback, semantic structure, and visual stability as product requirements, not end-of-project clean-up.'
          />
          <motion.div
            className='overflow-hidden rounded-lg border border-line bg-surface/65'
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className='flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6'>
              <div className='flex items-center gap-3'>
                <span className='grid h-8 w-8 place-items-center rounded-md bg-red-500/10 text-red-400'><Activity size={16} /></span>
                <div>
                  <p className='text-sm font-medium text-foreground'>Delivery quality targets</p>
                  <p className='text-xs text-muted'>Defined before the final polish pass</p>
                </div>
              </div>
              <span className='inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-500'>
                <CheckCircle2 size={13} /> Vercel ready
              </span>
            </div>
            <dl className='grid grid-cols-2 divide-x divide-y divide-line sm:grid-cols-4 sm:divide-y-0'>
              {performanceMetrics.map((metric, index) => {
                const Icon = metricIcons[index];
                return (
                  <div className='p-5 sm:p-6' key={metric.label}>
                    <dt className='flex items-center gap-2 text-xs text-muted'><Icon size={14} className='text-red-400' /> {metric.label}</dt>
                    <dd className='mt-4 text-3xl font-semibold tracking-tight text-foreground'>
                      <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                    </dd>
                    <p className='mt-1 text-xs text-muted'>{metric.description}</p>
                  </div>
                );
              })}
            </dl>
            <div className='grid gap-px border-t border-line bg-line sm:grid-cols-3'>
              {[
                ['LCP', '< 2.0s', 'Largest Contentful Paint'],
                ['CLS', '< 0.05', 'Layout stability'],
                ['INP', '< 150ms', 'Interaction responsiveness'],
              ].map(([label, value, detail]) => (
                <div className='bg-surface/85 px-5 py-4' key={label}>
                  <p className='font-mono text-[10px] uppercase tracking-[0.12em] text-muted'>{label}</p>
                  <p className='mt-1 text-lg font-semibold tracking-tight text-foreground'>{value}</p>
                  <p className='mt-0.5 text-xs text-muted'>{detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
