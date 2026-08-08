'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { navigation } from '@/content/portfolio';
import { SiteMark } from '@/components/site-mark';

export function SiteHeader() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('work');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const sections = navigation
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection('#' + visible.target.id);
      },
      { rootMargin: '-32% 0px -58%', threshold: [0.05, 0.3, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className='fixed inset-x-0 top-0 z-50'>
      <div className='section-shell pt-4'>
        <div className='glass flex h-14 items-center justify-between rounded-lg px-3 sm:px-4'>
          <SiteMark />
          <nav className='hidden h-full items-center gap-1 lg:flex' aria-label='Primary navigation'>
            {navigation.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  className='relative rounded-md px-3 py-2 text-xs font-medium text-muted transition-colors hover:text-foreground'
                  href={item.href}
                  key={item.href}
                >
                  {isActive ? (
                    <motion.span
                      className='absolute inset-0 -z-10 rounded-md bg-white/8'
                      layoutId='active-nav'
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                  <span className={isActive ? 'text-foreground' : undefined}>{item.label}</span>
                </a>
              );
            })}
          </nav>
          <div className='flex items-center gap-1'>
            <button
              className='grid h-9 w-9 place-items-center rounded-md text-muted transition hover:bg-white/8 hover:text-foreground'
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              aria-label='Toggle color theme'
              type='button'
            >
              {mounted && resolvedTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className='grid h-9 w-9 place-items-center rounded-md text-muted transition hover:bg-white/8 hover:text-foreground lg:hidden'
              onClick={() => setIsOpen((current) => !current)}
              aria-expanded={isOpen}
              aria-controls='mobile-navigation'
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              type='button'
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isOpen ? (
            <motion.nav
              className='glass mt-2 rounded-lg p-2 lg:hidden'
              id='mobile-navigation'
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              aria-label='Mobile navigation'
            >
              {navigation.map((item) => (
                <a
                  className='flex min-h-11 items-center rounded-md px-3 text-sm text-muted transition hover:bg-white/8 hover:text-foreground'
                  href={item.href}
                  key={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
