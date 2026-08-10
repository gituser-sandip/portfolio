'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, ExternalLink, FileText, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

type ResumePreviewProps = {
  children: React.ReactNode;
  className?: string;
  resumeUrl: string;
};

export function ResumePreview({ children, className, resumeUrl }: ResumePreviewProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  const close = React.useCallback(() => setIsOpen(false), []);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

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
      {isMounted
        ? createPortal(
            <AnimatePresence>
              {isOpen ? (
          <motion.div
            className='fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-2 py-2 pt-[calc(0.5rem+env(safe-area-inset-top))] pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-sm sm:px-6 sm:py-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <motion.section
              className='flex h-[calc(100dvh-1rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))] max-h-[58rem] w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-white/10 bg-[#111214] shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:h-[min(90vh,58rem)]'
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              role='dialog'
              aria-modal='true'
              aria-labelledby='resume-preview-title'
            >
              <header className='flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5'>
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
                <div className='h-full overflow-y-auto overscroll-contain rounded-sm bg-white sm:hidden'>
                  <div className='space-y-2 p-1'>
                    {[1, 2, 3].map((page) => (
                      <img
                        alt={'Resume page ' + page + ' of 3'}
                        className='block h-auto w-full border border-black/5 shadow-sm'
                        decoding='async'
                        key={page}
                        loading={page === 1 ? 'eager' : 'lazy'}
                        src={'/assets/resume-preview-' + page + '.jpg'}
                      />
                    ))}
                  </div>
                </div>
                <iframe
                  className='hidden h-full w-full rounded-sm bg-white sm:block'
                  src={resumeUrl + '#view=FitH'}
                  title='Sandeep Meche resume preview'
                />
              </div>
              <footer className='shrink-0 border-t border-white/10 px-3 py-3 sm:flex sm:items-center sm:justify-between sm:px-5'>
                <p className='hidden text-xs text-white/55 sm:block'>Review the PDF, then download a copy when you are ready.</p>
                <div className='grid grid-cols-2 gap-2 sm:flex sm:items-center'>
                  <a
                    className='inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-red-500 px-3 text-xs font-medium text-white transition hover:bg-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 sm:min-h-9 sm:justify-start'
                    href={resumeUrl}
                    download
                  >
                    <Download size={14} /> <span className='sm:hidden'>Download</span><span className='hidden sm:inline'>Download PDF</span>
                  </a>
                  <a
                    className='inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/10 px-3 text-xs font-medium text-white/80 transition hover:border-white/25 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 sm:min-h-9 sm:justify-start'
                    href={resumeUrl}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <ExternalLink size={14} /> <span className='sm:hidden'>Open PDF</span><span className='hidden sm:inline'>Open separately</span>
                  </a>
                </div>
              </footer>
            </motion.section>
          </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
