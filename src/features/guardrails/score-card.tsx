import Image from 'next/image';

import { SparkleIcon } from '@/components/icons/sparkle-icon';
import { cn } from '@/lib/utils';
import { LEVEL_IMAGE, type ScoreResult } from '@/lib/scoring';

export function ScoreCard({ result }: { result: ScoreResult }) {
  const rows = [
    { label: 'Calling days penalty', value: result.daysPenalty },
    { label: 'Calling window penalty', value: result.windowPenalty },
    { label: 'Redial count penalty', value: result.redialPenalty },
    { label: 'Redial interval penalty', value: result.intervalPenalty },
  ];

  return (
    <div className='w-full max-w-[500px] flex flex-col self-start overflow-hidden rounded-3xl bg-card ring-1 ring-border'>
      <div className='relative aspect-650/364 w-full'>
        <Image
          src={LEVEL_IMAGE[result.weatherLevel]}
          alt={`Weather level ${result.weatherLevel}`}
          fill
          priority
          sizes='(max-width: 1024px) 100vw, 500px'
          className='object-cover object-bottom'
        />
        <div className='absolute inset-x-0 top-0 flex flex-col items-center px-8 pt-9 text-white'>
          <div className='text-6xl font-bold leading-none'>{result.score}</div>
          <div className='mt-2 text-sm font-semibold'>Campaign score</div>
        </div>
      </div>

      {/* Warning banner — only when settings are sub-optimal (level 3 or 4) */}
      {result.weatherLevel >= 3 && (
        <div className='flex items-start gap-2.5 border-t bg-blue-50 px-6 py-4'>
          <SparkleIcon className='mt-0.5 shrink-0 text-[#12367E]' />
          <div className='space-y-1'>
            <p className='text-sm font-semibold text-[#12367E]'>
              Your settings are not optimized!
            </p>
            <p className='text-sm'>
              Your settings may slow down your calling operations and campaign
              completion. We recommend fixing your settings.
            </p>
          </div>
        </div>
      )}

      {/* Penalty breakdown */}
      <div className='shrink-0 '>
        {rows.map((row) => (
          <div
            key={row.label}
            className='flex items-center justify-between px-8 py-3 border-t'
          >
            <span className='text-sm font-medium text-muted-foreground'>
              {row.label}
            </span>
            <span
              className={cn(
                'text-sm font-semibold',
                row.value < 0 ? 'text-destructive' : 'text-emerald-600',
              )}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
