'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BotMessageSquare, Send, Sparkles, X } from 'lucide-react';

type ChatMessage = {
  role: 'assistant' | 'user';
  text: string;
};

const starterMessages: ChatMessage[] = [
  {
    role: 'assistant',
    text: 'Hi, I am Sandeep AI. Ask me about Sandeep\'s frontend work, approach, or availability.',
  },
];

export function SandeepAi() {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<ChatMessage[]>(starterMessages);
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function openAssistant() {
      setIsOpen(true);
    }

    window.addEventListener('open-sandeep-ai', openAssistant);
    return () => window.removeEventListener('open-sandeep-ai', openAssistant);
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
  }, [isOpen]);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  }, [messages, isLoading, shouldReduceMotion]);

  React.useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = input.trim();
    if (!question || isLoading) return;

    const nextMessages = [...messages, { role: 'user' as const, text: question }];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'SandeepAI',
        },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'The assistant is unavailable right now.');
      }

      setMessages((current) => [
        ...current,
        { role: 'assistant', text: data.reply || 'I could not generate a response just now.' },
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'The assistant is unavailable right now.';
      setMessages((current) => [...current, { role: 'assistant', text: message }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='fixed bottom-5 right-5 z-[60] sm:bottom-7 sm:right-7'>
      <AnimatePresence>
        {isOpen ? (
          <motion.section
            className='mb-3 w-[calc(100vw-2.5rem)] overflow-hidden rounded-lg border border-white/15 bg-[#101010]/90 shadow-[0_24px_68px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:w-[24rem]'
            role='dialog'
            aria-modal='false'
            aria-labelledby='sandeep-ai-title'
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className='flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-4 py-3'>
              <div className='flex items-center gap-3'>
                <span className='grid h-9 w-9 place-items-center rounded-md border border-red-500/25 bg-red-500/10 text-red-400'>
                  <Sparkles size={16} />
                </span>
                <div>
                  <p className='text-sm font-semibold text-white' id='sandeep-ai-title'>Sandeep AI</p>
                  <p className='mt-0.5 flex items-center gap-1.5 text-[11px] text-white/50'><span className='h-1.5 w-1.5 rounded-full bg-emerald-400' /> Portfolio assistant</p>
                </div>
              </div>
              <button
                className='grid h-8 w-8 place-items-center rounded-md text-white/55 transition hover:bg-white/10 hover:text-white'
                onClick={() => setIsOpen(false)}
                aria-label='Close Sandeep AI'
                type='button'
              >
                <X size={16} />
              </button>
            </div>
            <div className='h-72 overflow-y-auto px-4 py-4 [scrollbar-width:thin]' ref={scrollRef} aria-live='polite'>
              {messages.map((message, index) => (
                <div className={'mb-3 flex ' + (message.role === 'user' ? 'justify-end' : 'justify-start')} key={index}>
                  <p
                    className={
                      'max-w-[86%] rounded-lg px-3 py-2 text-sm leading-6 ' +
                      (message.role === 'user'
                        ? 'rounded-br-sm bg-red-500 text-white'
                        : 'rounded-bl-sm border border-white/10 bg-white/[0.075] text-white/82')
                    }
                  >
                    {message.text}
                  </p>
                </div>
              ))}
              {isLoading ? (
                <div className='flex justify-start'>
                  <p className='rounded-lg rounded-bl-sm border border-white/10 bg-white/[0.075] px-3 py-2 text-sm text-white/55'>Thinking...</p>
                </div>
              ) : null}
            </div>
            <form className='border-t border-white/10 bg-black/15 p-3' onSubmit={handleSubmit}>
              <label className='sr-only' htmlFor='sandeep-ai-input'>Ask Sandeep AI a question</label>
              <div className='flex items-center gap-2'>
                <input
                  className='min-w-0 flex-1 rounded-md border border-white/12 bg-white/[0.055] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-red-500/70'
                  disabled={isLoading}
                  id='sandeep-ai-input'
                  onChange={(event) => setInput(event.target.value)}
                  placeholder='Ask about skills or projects'
                  ref={inputRef}
                  value={input}
                />
                <button
                  className='grid h-10 w-10 shrink-0 place-items-center rounded-md bg-red-500 text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-45'
                  disabled={isLoading || !input.trim()}
                  aria-label='Send message'
                  type='submit'
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>
      <button
        className='group flex min-h-12 items-center gap-2 rounded-lg border border-red-500/35 bg-[#151515]/85 px-3.5 text-sm font-medium text-white shadow-[0_14px_38px_rgba(0,0,0,0.32)] backdrop-blur-xl transition hover:border-red-400 hover:bg-red-500'
        onClick={() => setIsOpen(true)}
        aria-label='Open Sandeep AI'
        type='button'
      >
        <BotMessageSquare size={17} />
        <span>Sandeep AI</span>
      </button>
    </div>
  );
}
