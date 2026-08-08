import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className='section-shell grid min-h-screen place-items-center py-24'>
      <div className='max-w-lg text-center'>
        <p className='eyebrow justify-center'>404</p>
        <h1 className='mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl'>That page is not part of this build.</h1>
        <p className='mt-5 text-base leading-7 text-muted'>The case study may have moved, or the link needs a quick update.</p>
        <Link className='mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg bg-red-500 px-5 text-sm font-medium text-white transition hover:bg-red-400' href='/'>
          <ArrowLeft size={16} /> Back home
        </Link>
      </div>
    </main>
  );
}
