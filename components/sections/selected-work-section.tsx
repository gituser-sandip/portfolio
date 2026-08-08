'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { projects } from '@/content/portfolio';
import { SectionHeading } from '@/components/ui/section-heading';

export function SelectedWorkSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className='section-rule py-24 md:py-32' id='work'>
      <div className='section-shell'>
        <SectionHeading
          eyebrow='Selected work'
          title='Interfaces built to make quality, speed, and clarity felt.'
          description='A selection of product-minded frontend work. Each story focuses on the decisions behind the pixels, not just the final screen.'
        />
        <div className='mt-14 space-y-6' id='case-studies'>
          {projects.map((project, index) => (
            <motion.article
              className='group relative overflow-hidden rounded-lg border border-line bg-surface/65 transition-colors hover:border-red-500/40'
              key={project.slug}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
            >
              <div className='grid lg:grid-cols-[minmax(0,1.02fr)_minmax(22rem,0.98fr)]'>
                <div className='relative min-h-72 overflow-hidden border-b border-line lg:min-h-[31rem] lg:border-b-0 lg:border-r'>
                  <Image
                    className='object-cover transition duration-700 ease-out group-hover:scale-[1.045]'
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes='(min-width: 1024px) 52vw, 100vw'
                  />
                  <div className='absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,0.16),rgba(0,0,0,0.62))] transition-opacity duration-500 group-hover:opacity-70' />
                  <div className='absolute inset-x-5 top-5 flex items-center justify-between'>
                    <span className='rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md'>
                      {project.eyebrow}
                    </span>
                    <span className='grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md'>
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
                <div className='flex flex-col p-6 sm:p-8 lg:p-10'>
                  <p className='font-mono text-[11px] uppercase tracking-[0.14em] text-red-400'>0{index + 1}</p>
                  <h3 className='mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl'>{project.title}</h3>
                  <p className='mt-4 text-pretty text-base leading-7 text-muted'>{project.valueProposition}</p>
                  <div className='mt-7 flex flex-wrap gap-2'>
                    {project.stack.map((item) => (
                      <span className='rounded-md border border-line bg-foreground/[0.025] px-2.5 py-1 text-xs text-muted' key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <dl className='mt-8 grid grid-cols-3 gap-3 border-y border-line py-5'>
                    {project.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt className='font-mono text-[10px] uppercase tracking-[0.1em] text-muted'>{metric.label}</dt>
                        <dd className='mt-1 text-base font-semibold tracking-tight text-foreground'>{metric.value}</dd>
                        <p className='mt-0.5 text-[11px] text-muted'>{metric.detail}</p>
                      </div>
                    ))}
                  </dl>
                  <div className='mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium'>
                    <a className='inline-flex items-center gap-1.5 text-muted transition hover:text-foreground' href={project.liveUrl} target='_blank' rel='noreferrer'>
                      Live demo <ExternalLink size={14} />
                    </a>
                    <a className='inline-flex items-center gap-1.5 text-muted transition hover:text-foreground' href={project.githubUrl} target='_blank' rel='noreferrer'>
                      GitHub <Github size={14} />
                    </a>
                    <Link className='inline-flex items-center gap-1.5 text-red-400 transition hover:text-red-300' href={'/case-studies/' + project.slug}>
                      Read case study <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
