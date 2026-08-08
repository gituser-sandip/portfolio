import Link from 'next/link';
import { cn } from '@/lib/utils';

export function SiteMark({ className }: { className?: string }) {
  return (
    <Link
      className={cn('group inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight', className)}
      href='/'
      aria-label='Sandeep Meche home'
    >
      <span className='grid h-8 w-8 place-items-center rounded-md border border-red-500/40 bg-red-500/10 font-mono text-xs text-red-400 transition group-hover:border-red-400 group-hover:bg-red-500 group-hover:text-white'>
        SM
      </span>
      <span className='hidden sm:block'>Sandeep Meche</span>
    </Link>
  );
}
