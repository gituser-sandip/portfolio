import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' && 'mx-auto max-w-3xl text-center', className)}>
      <p className={cn('eyebrow', align === 'center' && 'justify-center')}>{eyebrow}</p>
      <h2 className='mt-5 max-w-4xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
        {title}
      </h2>
      {description ? (
        <p className='mt-5 max-w-2xl text-pretty text-base leading-7 text-muted md:text-lg'>
          {description}
        </p>
      ) : null}
    </div>
  );
}
