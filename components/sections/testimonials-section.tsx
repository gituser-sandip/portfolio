'use client';

import { Linkedin, Quote } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { testimonials } from '@/content/portfolio';
import { SectionHeading } from '@/components/ui/section-heading';

export function TestimonialsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className='section-rule py-24 md:py-32' id='testimonials'>
      <div className='section-shell'>
        <div className='flex flex-col justify-between gap-6 md:flex-row md:items-end'>
          <SectionHeading
            eyebrow='Client voice'
            title='Proof from people who care about the outcome.'
            description='A dedicated area for concise, outcome-led recommendations from collaborators and clients.'
          />
          <p className='max-w-xs text-sm leading-6 text-muted'>Testimonial placeholders are intentionally ready for verified client feedback.</p>
        </div>
        <div className='mt-12 grid gap-4 md:grid-cols-2'>
          {testimonials.map((testimonial, index) => (
            <motion.article
              className='relative overflow-hidden rounded-lg border border-line bg-surface/55 p-6 sm:p-8'
              key={testimonial.company}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.07, duration: 0.5 }}
            >
              <Quote className='absolute right-6 top-6 text-red-500/20' size={42} strokeWidth={1.25} />
              <p className='max-w-xl text-lg leading-8 text-foreground/90'>"{testimonial.quote}"</p>
              <div className='mt-8 flex items-center justify-between gap-4'>
                <div className='flex items-center gap-3'>
                  <span className='grid h-10 w-10 place-items-center rounded-full border border-red-500/25 bg-red-500/10 text-xs font-semibold text-red-400'>
                    {testimonial.initials}
                  </span>
                  <div>
                    <p className='text-sm font-medium text-foreground'>{testimonial.name}</p>
                    <p className='mt-0.5 text-xs text-muted'>{testimonial.company}</p>
                  </div>
                </div>
                <a className='grid h-9 w-9 place-items-center rounded-md border border-line text-muted transition hover:border-red-500/40 hover:text-red-400' href={testimonial.linkedin} aria-label={'LinkedIn placeholder for ' + testimonial.company}>
                  <Linkedin size={15} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
