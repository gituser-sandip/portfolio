'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { experience } from '@/content/portfolio';
import { SectionHeading } from '@/components/ui/section-heading';

export function ExperienceSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className='section-rule py-24 md:py-32' id='experience'>
      <div className='section-shell'>
        <div className='grid gap-12 lg:grid-cols-[minmax(0,0.66fr)_minmax(30rem,1.34fr)] lg:gap-20'>
          <SectionHeading
            eyebrow='Experience'
            title='Growing through real interfaces and focused delivery.'
            description='A steady foundation in computing, paired with hands-on frontend work and an ongoing practice of building better user-facing systems.'
          />
          <ol className='relative space-y-0 border-l border-line'>
            {experience.map((item, index) => (
              <motion.li
                className='relative pb-11 pl-8 last:pb-0'
                key={item.title}
                initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className='absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-canvas bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.12)]' />
                <p className='font-mono text-[11px] uppercase tracking-[0.13em] text-red-400'>{item.period}</p>
                <div className='mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1'>
                  <h3 className='text-lg font-semibold tracking-tight text-foreground'>{item.title}</h3>
                  <span className='text-sm text-muted'>{item.organization}</span>
                </div>
                <p className='mt-3 max-w-2xl text-sm leading-6 text-muted'>{item.description}</p>
                <div className='mt-4 flex flex-wrap gap-2'>
                  {item.tags.map((tag) => (
                    <span className='rounded-md bg-foreground/[0.045] px-2.5 py-1 text-xs text-muted' key={tag}>{tag}</span>
                  ))}
                </div>
                {index === 0 ? (
                  <a className='mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition hover:text-red-400' href='#contact'>
                    Discuss a project <ArrowUpRight size={14} />
                  </a>
                ) : null}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
