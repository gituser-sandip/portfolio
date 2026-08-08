'use client';

import { ArrowUpRight, GitCommitHorizontal, Github, GitPullRequest, Star } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { githubActivity, site } from '@/content/portfolio';
import { SectionHeading } from '@/components/ui/section-heading';

const contributionLevels = [
  'rgba(255,255,255,0.06)',
  'rgba(239,68,68,0.2)',
  'rgba(239,68,68,0.42)',
  'rgba(239,68,68,0.66)',
  'rgba(248,113,113,0.95)',
];

const activityCells = Array.from({ length: 91 }, (_, index) => {
  const week = Math.floor(index / 7);
  const day = index % 7;
  return (week * 5 + day * 3 + (week % 3) * 2) % 5;
});

export function GithubSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className='section-rule py-24 md:py-32' id='github'>
      <div className='section-shell'>
        <div className='flex flex-col justify-between gap-8 lg:flex-row lg:items-end'>
          <SectionHeading
            eyebrow='GitHub activity'
            title='A public record of focused frontend practice.'
            description='Open-source activity, interface experiments, and delivery-oriented code live alongside the project stories.'
          />
          <a
            className='inline-flex items-center gap-2 self-start rounded-lg border border-line bg-surface px-4 py-3 text-sm font-medium text-foreground transition hover:border-red-500/40 hover:bg-red-500/5 lg:self-auto'
            href={site.github}
            target='_blank'
            rel='noreferrer'
          >
            <Github size={16} /> Visit GitHub <ArrowUpRight size={15} />
          </a>
        </div>
        <div className='mt-14 grid gap-4 lg:grid-cols-[minmax(0,1.28fr)_minmax(19rem,0.72fr)]'>
          <motion.article
            className='rounded-lg border border-line bg-surface/55 p-6 sm:p-7'
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <div className='flex items-start justify-between gap-6'>
              <div>
                <p className='text-lg font-semibold tracking-tight text-foreground'>Contribution graph</p>
                <p className='mt-2 text-sm text-muted'>A compact view of consistent build-and-improve activity.</p>
              </div>
              <GitCommitHorizontal className='shrink-0 text-red-400' size={20} />
            </div>
            <div className='mt-8 overflow-x-auto pb-1'>
              <div className='grid w-max grid-flow-col grid-rows-7 gap-1.5' aria-label='Contribution activity graph'>
                {activityCells.map((level, index) => (
                  <span
                    aria-hidden='true'
                    className='h-3.5 w-3.5 rounded-[3px]'
                    key={index}
                    style={{ backgroundColor: contributionLevels[level] }}
                  />
                ))}
              </div>
            </div>
            <div className='mt-6 flex items-center justify-between border-t border-line pt-5 text-xs text-muted'>
              <span>Recent activity pattern</span>
              <span className='inline-flex items-center gap-1.5'><span className='h-1.5 w-1.5 rounded-full bg-red-400' /> Public profile linked above</span>
            </div>
          </motion.article>
          <motion.article
            className='rounded-lg border border-line bg-surface/55 p-6 sm:p-7'
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.08, duration: 0.5 }}
          >
            <div className='flex items-start justify-between gap-6'>
              <div>
                <p className='text-lg font-semibold tracking-tight text-foreground'>Open-source focus</p>
                <p className='mt-2 text-sm text-muted'>UI architecture, modern React, and useful workflow integrations.</p>
              </div>
              <GitPullRequest className='shrink-0 text-red-400' size={20} />
            </div>
            <div className='mt-8 grid grid-cols-2 gap-3'>
              <div className='rounded-md border border-line bg-foreground/[0.025] p-4'>
                <p className='font-mono text-[10px] uppercase tracking-[0.12em] text-muted'>Primary</p>
                <p className='mt-2 text-sm font-medium text-foreground'>TypeScript</p>
              </div>
              <div className='rounded-md border border-line bg-foreground/[0.025] p-4'>
                <p className='font-mono text-[10px] uppercase tracking-[0.12em] text-muted'>Working style</p>
                <p className='mt-2 text-sm font-medium text-foreground'>Small, reviewable PRs</p>
              </div>
            </div>
          </motion.article>
        </div>
        <div className='mt-4 grid gap-4 lg:grid-cols-2'>
          <article className='rounded-lg border border-line bg-surface/35 p-6 sm:p-7'>
            <p className='text-lg font-semibold tracking-tight text-foreground'>Featured repositories</p>
            <div className='mt-6 divide-y divide-line'>
              {githubActivity.repositories.map((repository) => (
                <a className='group block py-4 first:pt-0 last:pb-0' href={site.github} target='_blank' rel='noreferrer' key={repository.name}>
                  <div className='flex items-center justify-between gap-4'>
                    <span className='text-sm font-medium text-foreground transition group-hover:text-red-400'>{repository.name}</span>
                    <ArrowUpRight className='text-muted transition group-hover:text-red-400' size={15} />
                  </div>
                  <p className='mt-1.5 text-sm leading-6 text-muted'>{repository.description}</p>
                  <div className='mt-2 flex items-center gap-3 text-xs text-muted'>
                    <span className='inline-flex items-center gap-1.5'><span className='h-2 w-2 rounded-full bg-red-400' /> {repository.language}</span>
                    <span className='inline-flex items-center gap-1'><Star size={12} /> {repository.stars}</span>
                  </div>
                </a>
              ))}
            </div>
          </article>
          <article className='rounded-lg border border-line bg-surface/35 p-6 sm:p-7'>
            <p className='text-lg font-semibold tracking-tight text-foreground'>Recent commits</p>
            <ol className='mt-6 space-y-5'>
              {githubActivity.commits.map((commit, index) => (
                <li className='flex gap-4' key={commit}>
                  <span className='grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-500/10 font-mono text-[10px] text-red-400'>0{index + 1}</span>
                  <p className='pt-0.5 text-sm leading-6 text-muted'>{commit}</p>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </div>
    </section>
  );
}
