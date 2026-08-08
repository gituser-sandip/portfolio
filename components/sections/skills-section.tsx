'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Boxes, Code2, Gauge, Layers3 } from 'lucide-react';
import { skillGroups } from '@/content/portfolio';
import { SectionHeading } from '@/components/ui/section-heading';

const icons = [Code2, Layers3, Boxes, Gauge];

export function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className='section-rule py-24 md:py-32' id='skills'>
      <div className='section-shell'>
        <SectionHeading
          eyebrow='Engineering toolkit'
          title='A practical stack, with craft built into the process.'
          description='I choose tools for clear product reasons: resilient UI, maintainable systems, accessible interaction, and a fast path from idea to production.'
          align='center'
        />
        <div className='mt-14 grid gap-4 md:grid-cols-2'>
          {skillGroups.map((group, index) => {
            const Icon = icons[index];
            return (
              <motion.article
                className='rounded-lg border border-line bg-surface/55 p-6 transition hover:border-red-500/30 hover:bg-surface sm:p-7'
                key={group.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className='flex items-start justify-between gap-6'>
                  <div>
                    <p className='text-xl font-semibold tracking-tight text-foreground'>{group.title}</p>
                    <p className='mt-3 max-w-md text-sm leading-6 text-muted'>{group.description}</p>
                  </div>
                  <span className='grid h-10 w-10 shrink-0 place-items-center rounded-md border border-red-500/20 bg-red-500/10 text-red-400'>
                    <Icon size={18} strokeWidth={1.7} />
                  </span>
                </div>
                <div className='mt-7 flex flex-wrap gap-2'>
                  {group.skills.map((skill) => (
                    <span className='rounded-md border border-line bg-foreground/[0.025] px-3 py-1.5 text-xs font-medium text-muted' key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
