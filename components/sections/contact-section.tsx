'use client';

import { ArrowUpRight, CheckCircle2, Clock3, Github, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { site } from '@/content/portfolio';

const contactLinks = [
  { label: 'Email', value: site.email, href: 'mailto:' + site.email, icon: Mail },
  { label: 'WhatsApp', value: site.phone, href: 'https://wa.me/9779807944252', icon: MessageCircle },
  { label: 'LinkedIn', value: 'Connect professionally', href: site.linkedin, icon: Linkedin },
  { label: 'GitHub', value: '@gituser-sandip', href: site.github, icon: Github },
];

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className='section-rule py-24 md:py-32' id='contact'>
      <div className='section-shell'>
        <motion.div
          className='relative overflow-hidden rounded-lg border border-red-500/25 bg-surface px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16'
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_16%,rgba(239,68,68,0.18),transparent_26rem)]' />
          <div className='pointer-events-none absolute -right-16 top-10 h-48 w-48 rounded-full border border-red-500/20' />
          <div className='pointer-events-none absolute -right-4 top-22 h-28 w-28 rounded-full border border-red-500/15' />
          <div className='relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(21rem,0.7fr)] lg:items-end'>
            <div>
              <div className='inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500'>
                <span className='h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]' /> Available for the right remote project
              </div>
              <h2 className='mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl'>
                Let's build something exceptional.
              </h2>
              <p className='mt-6 max-w-xl text-pretty text-base leading-7 text-muted sm:text-lg'>
                Need a frontend partner who can care about the details and keep the delivery moving? Send a little context about the product, the outcome, and the timeline.
              </p>
              <div className='mt-8 flex flex-wrap gap-3'>
                <MagneticButton
                  className='min-h-12 rounded-lg bg-red-500 px-5 text-sm font-medium text-white shadow-[0_12px_32px_rgba(239,68,68,0.24)] transition hover:bg-red-400'
                  href={'mailto:' + site.email}
                >
                  Start a conversation <ArrowUpRight size={17} />
                </MagneticButton>
                <a className='inline-flex min-h-12 items-center gap-2 rounded-lg border border-line bg-surface/65 px-5 text-sm font-medium text-foreground transition hover:border-red-500/40 hover:bg-red-500/5' href='https://wa.me/9779807944252' target='_blank' rel='noreferrer'>
                  WhatsApp <MessageCircle size={16} />
                </a>
              </div>
              <div className='mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted'>
                <span className='inline-flex items-center gap-2'><Clock3 size={15} className='text-red-400' /> Typical response: within 24 hours</span>
                <span className='inline-flex items-center gap-2'><MapPin size={15} className='text-red-400' /> Working remotely from Nepal</span>
              </div>
            </div>
            <div className='rounded-lg border border-line bg-black/20 p-2 backdrop-blur-sm'>
              <div className='rounded-md border border-line bg-surface/80 p-5'>
                <div className='flex items-center gap-3 border-b border-line pb-5'>
                  <span className='grid h-9 w-9 place-items-center rounded-md bg-red-500/10 text-red-400'><CheckCircle2 size={18} /></span>
                  <div>
                    <p className='text-sm font-medium text-foreground'>Open to focused engagements</p>
                    <p className='mt-0.5 text-xs text-muted'>Remote frontend, UI engineering, and product builds</p>
                  </div>
                </div>
                <div className='divide-y divide-line'>
                  {contactLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a className='group flex items-center gap-3 py-4 first:pt-5 last:pb-0' href={item.href} target={item.href.startsWith('mailto:') ? undefined : '_blank'} rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'} key={item.label}>
                        <span className='grid h-8 w-8 place-items-center rounded-md bg-foreground/[0.045] text-muted transition group-hover:bg-red-500/10 group-hover:text-red-400'><Icon size={15} /></span>
                        <span className='min-w-0 flex-1'>
                          <span className='block text-xs text-muted'>{item.label}</span>
                          <span className='mt-0.5 block truncate text-sm font-medium text-foreground'>{item.value}</span>
                        </span>
                        <ArrowUpRight className='text-muted transition group-hover:text-red-400' size={15} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
