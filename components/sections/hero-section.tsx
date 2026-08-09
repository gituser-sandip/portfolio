'use client';

import * as React from 'react';
import Image from 'next/image';
import { ArrowDownRight, ArrowUpRight, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { site } from '@/content/portfolio';
import { HeroConstellation } from '@/components/sections/hero-constellation';

const heroLines = [
  'Frontend engineer building fast,',
  'accessible, and conversion-focused',
  'digital experiences.',
];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [pointer, setPointer] = React.useState({ x: 50, y: 32, active: false });
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 900], [0, -42]);
  const portraitRotate = useTransform(scrollY, [0, 900], [0, 1.8]);

  function trackPointer(event: React.PointerEvent<HTMLElement>) {
    if (shouldReduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
      active: true,
    });
  }

  function resetPointer() {
    setPointer({ x: 50, y: 32, active: false });
  }

  return (
    <section
      className='relative isolate min-h-[48rem] overflow-hidden pt-32 sm:pt-36'
      id='top'
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
    >
      <div className='canvas-grid pointer-events-none absolute inset-0 -z-20 opacity-80' />
      <HeroConstellation pointer={{ x: pointer.x / 100, y: pointer.y / 100, active: pointer.active }} reducedMotion={Boolean(shouldReduceMotion)} />
      <div className='hero-signal-line pointer-events-none left-[-7rem] top-[19rem] -z-10 hidden lg:block' />
      <div className='hero-signal-line hero-signal-line-delay pointer-events-none right-[-7rem] top-[30rem] -z-10 hidden lg:block' />
      <motion.div
        className='pointer-events-none absolute -z-10 h-[32rem] w-[32rem] rounded-full blur-3xl'
        animate={
          shouldReduceMotion
            ? undefined
            : {
                left: 'calc(' + pointer.x + '% - 16rem)',
                top: 'calc(' + pointer.y + '% - 16rem)',
              }
        }
        transition={{ type: 'spring', stiffness: 45, damping: 18 }}
        style={{
          background:
            'radial-gradient(circle, rgba(239,68,68,0.18) 0%, rgba(185,28,28,0.07) 34%, transparent 69%)',
        }}
      />
      <motion.div
        className='pointer-events-none absolute right-10 top-24 z-20 w-14 origin-top sm:right-4 sm:top-20 sm:w-20 min-[900px]:right-4 min-[900px]:top-10 min-[900px]:w-24 lg:right-[5%] lg:w-32'
        animate={shouldReduceMotion ? undefined : { rotate: [-2, 2, -2], y: [0, 4, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden='true'
      >
        <span className='absolute bottom-[78%] left-1/2 h-28 w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(248,250,252,0.04),rgba(248,250,252,0.9)_18%,rgba(248,250,252,0.62)_86%,rgba(248,250,252,0.2))] shadow-[0_0_10px_rgba(248,250,252,0.42)] sm:h-44' />
        <span className='absolute bottom-[77%] left-[47%] h-24 w-px -translate-x-1/2 rotate-[7deg] bg-[linear-gradient(to_bottom,transparent,rgba(248,250,252,0.34),transparent)] sm:h-32' />
        <span className='absolute bottom-[77%] left-[53%] h-24 w-px -translate-x-1/2 -rotate-[7deg] bg-[linear-gradient(to_bottom,transparent,rgba(248,250,252,0.34),transparent)] sm:h-32' />
        <Image
          className='relative h-auto w-full drop-shadow-[0_18px_28px_rgba(0,0,0,0.45)]'
          src='/images/lil-spidey-transparent.png'
          alt=''
          width={168}
          height={222}
          priority
        />
      </motion.div>
      <div className='section-shell relative'>
        <div className='grid items-center gap-14 pb-24 lg:grid-cols-[minmax(0,1.16fr)_minmax(22rem,0.66fr)] lg:gap-16 lg:pb-32'>
          <div>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <Badge tone='accent'>
                <span className='h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_0_4px_rgba(248,113,113,0.14)]' />
                Available for remote work
              </Badge>
            </motion.div>
            <motion.p
              className='mt-8 text-xs font-medium uppercase tracking-[0.18em] text-muted'
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              Sandeep Meche / Frontend engineer
            </motion.p>
            <motion.h1
              className='mt-5 max-w-5xl text-balance text-4xl font-semibold leading-[1.04] tracking-tight text-foreground min-[900px]:max-w-[calc(100%-8rem)] sm:text-5xl md:text-6xl lg:max-w-5xl lg:text-7xl'
            >
              {heroLines.map((line, index) => (
                <span className='block overflow-hidden' key={line}>
                  <motion.span
                    className='block'
                    initial={shouldReduceMotion ? false : { opacity: 0, y: '110%' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.12 + index * 0.09,
                      duration: 0.72,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h1>
            <motion.p
              className='mt-7 max-w-2xl text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8'
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.19, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              I design and develop modern web applications using React, Next.js, TypeScript, and Tailwind CSS, focusing on performance, accessibility, and scalable UI systems.
            </motion.p>
            <motion.div
              className='mt-9 flex flex-wrap gap-3'
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton
                className='min-h-12 rounded-lg bg-red-500 px-5 text-sm font-medium text-white shadow-[0_12px_32px_rgba(239,68,68,0.24)] transition-colors hover:bg-red-400'
                href='#case-studies'
              >
                View case studies <ArrowDownRight size={17} />
              </MagneticButton>
              <MagneticButton
                className='min-h-12 rounded-lg border border-line bg-surface/80 px-5 text-sm font-medium text-foreground transition-colors hover:border-red-500/50 hover:bg-red-500/5'
                href='#contact'
              >
                Hire me <ArrowUpRight size={17} />
              </MagneticButton>
            </motion.div>
            <motion.div
              className='mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted'
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.34, duration: 0.5 }}
            >
              <span className='inline-flex items-center gap-2'><MapPin size={15} className='text-red-400' /> Nepal</span>
              <a className='inline-flex items-center gap-2 transition hover:text-foreground' href={'mailto:' + site.email}>
                <Mail size={15} className='text-red-400' /> Email
              </a>
              <a className='inline-flex items-center gap-2 transition hover:text-foreground' href={site.github} target='_blank' rel='noreferrer'>
                <Github size={15} className='text-red-400' /> GitHub
              </a>
              <a className='inline-flex items-center gap-2 transition hover:text-foreground' href={site.linkedin} target='_blank' rel='noreferrer'>
                <Linkedin size={15} className='text-red-400' /> LinkedIn
              </a>
              <a className='inline-flex items-center gap-2 transition hover:text-foreground' href={site.resume} target='_blank' rel='noreferrer'>
                <Download size={15} className='text-red-400' /> Resume
              </a>
            </motion.div>
          </div>
          <motion.div
            className='relative mx-auto w-full max-w-md lg:max-w-none'
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={shouldReduceMotion ? undefined : { y: portraitY, rotate: portraitRotate }}
          >
            <div className='absolute -inset-6 -z-10 rounded-full bg-red-500/10 blur-3xl' />
            <div className='relative aspect-[4/4.7] overflow-hidden rounded-lg border border-line bg-surface shadow-lift'>
              <Image
                className='object-cover object-center opacity-75 mix-blend-luminosity'
                src='/images/IMG_3846.PNG'
                alt='Sandeep Meche'
                fill
                priority
                sizes='(min-width: 1024px) 34vw, (min-width: 640px) 28rem, calc(100vw - 3rem)'
              />
              <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.84))]' />
              <div className='absolute inset-x-5 top-5 flex items-center justify-between rounded-md border border-white/10 bg-black/30 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/70 backdrop-blur-md'>
                <span>Interface quality</span>
                <span className='text-red-400'>98 / 100</span>
              </div>
              <div className='absolute inset-x-5 bottom-5 grid grid-cols-2 gap-3'>
                <div className='rounded-md border border-white/10 bg-black/45 p-3 backdrop-blur-md'>
                  <p className='font-mono text-[10px] uppercase tracking-[0.12em] text-white/45'>Focus</p>
                  <p className='mt-2 text-sm font-medium text-white'>Fast by design</p>
                </div>
                <div className='rounded-md border border-white/10 bg-black/45 p-3 backdrop-blur-md'>
                  <p className='font-mono text-[10px] uppercase tracking-[0.12em] text-white/45'>Practice</p>
                  <p className='mt-2 text-sm font-medium text-white'>Accessible UI</p>
                </div>
              </div>
            </div>
            <motion.div
              className='absolute -bottom-5 -left-5 hidden rounded-md border border-line bg-surface px-4 py-3 shadow-lift sm:block'
              animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className='font-mono text-[10px] uppercase tracking-[0.14em] text-muted'>Core Web Vitals</p>
              <p className='mt-1 text-sm font-medium text-foreground'>LCP target: 1.4s</p>
            </motion.div>
            <motion.div
              className='absolute -right-5 top-1/3 hidden rounded-md border border-line bg-surface px-4 py-3 shadow-lift lg:block'
              animate={shouldReduceMotion ? undefined : { y: [0, 7, 0] }}
              transition={{ duration: 5.4, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className='font-mono text-[10px] uppercase tracking-[0.14em] text-muted'>Delivery signal</p>
              <p className='mt-1 inline-flex items-center gap-2 text-sm font-medium text-foreground'><span className='h-1.5 w-1.5 rounded-full bg-emerald-500' /> Build ready</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
