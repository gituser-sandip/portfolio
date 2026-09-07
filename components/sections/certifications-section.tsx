'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Award, FileText } from 'lucide-react';
import { certifications, site } from '@/content/portfolio';
import { SectionHeading } from '@/components/ui/section-heading';

export function CertificationsSection() {
  const shouldReduceMotion = useReducedMotion();

  if (certifications.length === 0) return null;

  return (
    <section className='section-rule scroll-mt-24 py-24 md:py-32' id='certifications'>
      <div className='section-shell'>
        <SectionHeading
          eyebrow='Certifications'
          title='Learning across web, cloud, and AI.'
          description='Courses and diplomas in web development, cloud computing, machine learning, and everyday computing tools.'
          align='center'
        />
        <ul className='mt-14 grid gap-4 md:grid-cols-2'>
          {certifications.map((certification, index) => {
            const hasCertificate = Boolean(certification.certificateUrl);
            const linkLabel = hasCertificate ? 'View certificate' : 'View in CV';
            const LinkIcon = hasCertificate ? ArrowUpRight : FileText;

            return (
              <motion.li
                className='flex flex-col rounded-lg border border-line bg-surface/55 p-6 transition-colors hover:border-red-500/30 hover:bg-surface sm:p-7'
                key={certification.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: (index % 2) * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className='flex items-start gap-4'>
                  <span className='grid h-10 w-10 shrink-0 place-items-center rounded-md border border-red-500/20 bg-red-500/10 text-red-500 dark:text-red-400'>
                    <Award size={20} strokeWidth={1.7} aria-hidden='true' />
                  </span>
                  <div className='min-w-0'>
                    <h3 className='text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl'>
                      {certification.title}
                    </h3>
                    {certification.issuer ? (
                      <p className='mt-2 text-sm text-muted'>{certification.issuer}</p>
                    ) : null}
                    {certification.issueDate ? (
                      <p className='mt-2 text-sm text-muted'>Issued {certification.issueDate}</p>
                    ) : null}
                    {certification.credentialId ? (
                      <p className='mt-2 break-all text-sm text-muted'>Credential ID: {certification.credentialId}</p>
                    ) : null}
                  </div>
                </div>
                <ul className='mt-6 flex flex-wrap gap-2' aria-label='Related skills'>
                  {certification.skills.map((skill) => (
                    <li className='rounded-md border border-line bg-foreground/[0.025] px-2.5 py-1 text-sm text-muted' key={skill}>
                      {skill}
                    </li>
                  ))}
                </ul>
                <div className='mt-auto pt-6'>
                  <a
                    className='inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-foreground transition-colors hover:text-red-600 dark:hover:text-red-400'
                    href={certification.certificateUrl ?? `${site.resume}#page=3`}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={`${linkLabel}: ${certification.title} (opens in a new tab)`}
                  >
                    {linkLabel}
                    <LinkIcon size={16} aria-hidden='true' />
                  </a>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
