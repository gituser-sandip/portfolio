'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, ExternalLink, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ResumePreviewProps = {
  children: React.ReactNode;
  className?: string;
  resumeUrl: string;
};

export function ResumePreview({ children, className, resumeUrl }: ResumePreviewProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  const close = React.useCallback(() => setIsOpen(false), []);

  React.useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close();
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [close, isOpen]);

  return (
    <>
      <button
        className={cn(className)}
        type='button'
        onClick={() => setIsOpen(true)}
        aria-haspopup='dialog'
        aria-expanded={isOpen}
        aria-label='Preview resume before downloading'
        ref={triggerRef}
      >
        {children}
      </button>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className='fixed inset-0 z-[80] flex items-center justify-center bg-black/75 px-3 py-4 backdrop-blur-sm sm:px-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <motion.section
              className='flex h-[min(90vh,58rem)] w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-white/10 bg-[#111214] shadow-[0_24px_80px_rgba(0,0,0,0.55)]'
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              role='dialog'
              aria-modal='true'
              aria-labelledby='resume-preview-title'
            >
              <header className='flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5'>
                <div className='min-w-0'>
                  <p className='flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-red-400'>
                    <FileText size={13} /> Resume preview
                  </p>
                  <h2 className='mt-1 truncate text-sm font-semibold text-white sm:text-base' id='resume-preview-title'>
                    Sandeep Meche - Resume
                  </h2>
                </div>
                <button
                  className='grid h-9 w-9 shrink-0 place-items-center rounded-md text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400'
                  onClick={close}
                  type='button'
                  aria-label='Close resume preview'
                  ref={closeButtonRef}
                >
                  <X size={18} />
                </button>
              </header>
              <div className='min-h-0 flex-1 bg-[#2a2a2a] p-2 sm:p-3'>
                <iframe
                  className='h-full w-full rounded-sm bg-white'
                  src={resumeUrl + '#view=FitH'}
                  title='Sandeep Meche resume preview'
                />
              </div>
              <footer className='flex flex-col gap-3 border-t border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5'>
                <p className='text-xs text-white/55'>Review the PDF, then download a copy when you are ready.</p>
                <div className='flex flex-wrap items-center gap-2'>
                  <a
                    className='inline-flex min-h-9 items-center gap-2 rounded-md bg-red-500 px-3 text-xs font-medium text-white transition hover:bg-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300'
                    href={resumeUrl}
                    download
                  >
                    <Download size={14} /> Download PDF
                  </a>
                  <a
                    className='inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 px-3 text-xs font-medium text-white/80 transition hover:border-white/25 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400'
                    href={resumeUrl}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <ExternalLink size={14} /> Open separately
                  </a>
                </div>
              </footer>
            </motion.section>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
