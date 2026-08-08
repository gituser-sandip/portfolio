import { Github, Linkedin, Mail } from 'lucide-react';
import { SiteMark } from '@/components/site-mark';
import { site } from '@/content/portfolio';

export function SiteFooter() {
  return (
    <footer className='section-rule'>
      <div className='section-shell flex flex-col gap-8 py-9 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <SiteMark />
          <p className='mt-3 text-sm text-muted'>Currently focused on fast, accessible React experiences and thoughtful UI systems.</p>
        </div>
        <div className='flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted'>
          <span>Built with Next.js</span>
          <span>Last updated August 2026</span>
          <div className='flex items-center gap-2'>
            <a className='grid h-8 w-8 place-items-center rounded-md transition hover:bg-foreground/5 hover:text-foreground' href={'mailto:' + site.email} aria-label='Email Sandeep Meche'><Mail size={15} /></a>
            <a className='grid h-8 w-8 place-items-center rounded-md transition hover:bg-foreground/5 hover:text-foreground' href={site.github} target='_blank' rel='noreferrer' aria-label='Sandeep Meche on GitHub'><Github size={15} /></a>
            <a className='grid h-8 w-8 place-items-center rounded-md transition hover:bg-foreground/5 hover:text-foreground' href={site.linkedin} target='_blank' rel='noreferrer' aria-label='Sandeep Meche on LinkedIn'><Linkedin size={15} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
