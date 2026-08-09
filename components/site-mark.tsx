import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function SiteMark({ className }: { className?: string }) {
  return (
    <Link
      className={cn('group inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight', className)}
      href='/'
      aria-label='Sandeep Meche home'
    >
      <span className='relative h-8 w-8 overflow-hidden rounded-md border border-red-500/40 bg-red-500/10 transition group-hover:border-red-400 group-hover:shadow-[0_0_18px_rgba(239,68,68,0.3)]'>
        <Image
          className='object-cover object-center transition duration-300 group-hover:scale-110'
          src='/images/IMG_3846.PNG'
          alt=''
          fill
          sizes='32px'
          priority
        />
      </span>
      <span className='hidden sm:block'>Sandeep Meche</span>
    </Link>
  );
}
