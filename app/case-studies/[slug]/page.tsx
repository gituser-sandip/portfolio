import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink, Github, Timer } from 'lucide-react';
import { PageReveal } from '@/components/page-reveal';
import { SiteFooter } from '@/components/sections/site-footer';
import { SiteHeader } from '@/components/sections/site-header';
import { projects, site } from '@/content/portfolio';

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: 'Case study not found' };
  }

  return {
    title: project.title,
    description: project.valueProposition,
    alternates: { canonical: '/case-studies/' + project.slug },
    openGraph: {
      title: project.title + ' | Sandeep Meche',
      description: project.valueProposition,
      url: '/case-studies/' + project.slug,
      images: [{ url: project.image, alt: project.imageAlt }],
    },
  };
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className='section-rule scroll-mt-28 py-12 first:pt-0 md:py-16' id={title.toLowerCase().replaceAll(' ', '-')}>
      <div className='grid gap-7 lg:grid-cols-[minmax(12rem,0.4fr)_minmax(0,1fr)] lg:gap-16'>
        <h2 className='text-2xl font-semibold tracking-tight text-foreground sm:text-3xl'>{title}</h2>
        <ul className='space-y-4'>
          {items.map((item) => (
            <li className='flex gap-3 text-base leading-7 text-muted' key={item}>
              <CheckCircle2 className='mt-1 shrink-0 text-red-400' size={16} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    author: {
      '@type': 'Person',
      name: site.name,
      url: site.url,
    },
    url: site.url + '/case-studies/' + project.slug,
    image: site.url + project.image,
    keywords: project.stack.join(', '),
  };

  return (
    <div className='relative overflow-x-clip'>
      <SiteHeader />
      <main className='pt-28 sm:pt-32'>
        <PageReveal>
          <section className='section-shell pb-14 sm:pb-20'>
            <Link className='inline-flex items-center gap-2 text-sm text-muted transition hover:text-foreground' href='/#work'>
              <ArrowLeft size={16} /> Back to selected work
            </Link>
            <div className='mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.36fr)] lg:items-end'>
              <div>
                <p className='eyebrow'>{project.eyebrow}</p>
                <h1 className='mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl'>
                  {project.title}
                </h1>
                <p className='mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted'>{project.valueProposition}</p>
              </div>
              <div className='flex flex-wrap gap-3 lg:justify-end'>
                <a className='inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium text-foreground transition hover:border-red-500/40 hover:bg-red-500/5' href={project.liveUrl} target='_blank' rel='noreferrer'>
                  Live demo <ExternalLink size={15} />
                </a>
                <a className='inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium text-foreground transition hover:border-red-500/40 hover:bg-red-500/5' href={project.githubUrl} target='_blank' rel='noreferrer'>
                  GitHub <Github size={15} />
                </a>
              </div>
            </div>
          </section>
          <section className='section-shell'>
            <div className='relative aspect-[16/8] overflow-hidden rounded-lg border border-line bg-surface sm:aspect-[16/7]'>
              <Image
                className='object-cover'
                src={project.image}
                alt={project.imageAlt}
                fill
                priority
                sizes='(min-width: 1280px) 1152px, calc(100vw - 3rem)'
              />
              <div className='absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.32))]' />
            </div>
          </section>
          <section className='section-shell py-16 md:py-24'>
            <div className='grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(25rem,1.28fr)] lg:gap-20'>
              <div>
                <p className='eyebrow'>Overview</p>
                <h2 className='mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl'>A deliberate approach to a better interface.</h2>
              </div>
              <dl className='grid gap-x-10 gap-y-8 sm:grid-cols-2'>
                {[
                  ['Problem', project.overview.problem],
                  ['Solution', project.overview.solution],
                  ['My role', project.overview.role],
                  ['Timeline', project.overview.timeline],
                  ['Team', project.overview.team],
                  ['Tech stack', project.stack.join(', ')],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className='font-mono text-[10px] uppercase tracking-[0.14em] text-red-400'>{label}</dt>
                    <dd className='mt-2 text-sm leading-6 text-muted'>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
          <section className='section-shell'>
            <div className='rounded-lg border border-line bg-surface/55 px-5 py-6 sm:px-7 sm:py-8'>
              <div className='flex flex-wrap items-center justify-between gap-4'>
                <div className='flex items-center gap-3'>
                  <span className='grid h-9 w-9 place-items-center rounded-md bg-red-500/10 text-red-400'><Timer size={17} /></span>
                  <div>
                    <p className='text-sm font-medium text-foreground'>Performance and quality snapshot</p>
                    <p className='text-xs text-muted'>Targets established for a fast, accessible delivery</p>
                  </div>
                </div>
                <a className='inline-flex items-center gap-1.5 text-sm font-medium text-red-400 transition hover:text-red-300' href='#results'>
                  Read results <ArrowUpRight size={14} />
                </a>
              </div>
              <dl className='mt-7 grid gap-3 sm:grid-cols-4'>
                {project.results.map((metric) => (
                  <div className='rounded-md border border-line bg-foreground/[0.025] p-4' key={metric.label}>
                    <dt className='font-mono text-[10px] uppercase tracking-[0.12em] text-muted'>{metric.label}</dt>
                    <dd className='mt-2 text-2xl font-semibold tracking-tight text-foreground'>{metric.value}</dd>
                    <p className='mt-1 text-xs text-muted'>{metric.detail}</p>
                  </div>
                ))}
              </dl>
            </div>
          </section>
          <section className='section-shell pb-24 pt-16 md:pb-32 md:pt-24'>
            <DetailList title='Design process' items={project.designProcess} />
            <DetailList title='Architecture' items={project.architecture} />
            <DetailList title='Performance optimization' items={project.performance} />
            <DetailList title='Accessibility' items={project.accessibility} />
            <DetailList title='SEO' items={project.seo} />
            <DetailList title='Challenges' items={project.challenges} />
            <DetailList title='Results' items={project.results.map((item) => item.label + ': ' + item.value + ' (' + item.detail + ')')} />
          </section>
          <section className='section-rule'>
            <div className='section-shell flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <p className='text-xl font-semibold tracking-tight text-foreground'>Have a similar product challenge?</p>
                <p className='mt-2 text-sm text-muted'>Let's turn the requirements into a resilient, high-performing interface.</p>
              </div>
              <Link className='inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-500 px-5 text-sm font-medium text-white transition hover:bg-red-400' href='/#contact'>
                Start a conversation <ArrowUpRight size={16} />
              </Link>
            </div>
          </section>
        </PageReveal>
      </main>
      <SiteFooter />
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }} />
    </div>
  );
}
