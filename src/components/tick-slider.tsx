import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

// A slider with tick labels beneath it.
// Works for both single-thumb (value: number) and range (value: number[]).
// Each tick is placed at its TRUE position on the min–max scale, so labels
// stay aligned with the thumb even when tick values aren't evenly spaced
// (e.g. hours 8, 11, 14, 17, 21).
export function TickSlider({
  value,
  onValueChange,
  min,
  max,
  step = 1,
  minStepsBetweenValues,
  ticks,
  className,
}: {
  value: number | number[];
  onValueChange: (value: number | readonly number[]) => void;
  min: number;
  max: number;
  step?: number;
  // Minimum gap enforced between range thumbs (ignored for single-thumb).
  minStepsBetweenValues?: number;
  ticks: { value: number; label: string }[];
  className?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      <Slider
        min={min}
        max={max}
        step={step}
        minStepsBetweenValues={minStepsBetweenValues}
        value={value}
        onValueChange={onValueChange}
      />
      <div className='relative h-4 text-xs text-muted-foreground'>
        {ticks.map((tick, i) => (
          <span
            key={tick.value}
            className={cn(
              'absolute top-0 whitespace-nowrap',
              // Center each label on its point; keep the first/last inside the edges.
              i === 0
                ? ''
                : i === ticks.length - 1
                  ? '-translate-x-full'
                  : '-translate-x-1/2',
            )}
            style={{ left: `${((tick.value - min) / (max - min)) * 100}%` }}
          >
            {tick.label}
          </span>
        ))}
      </div>
    </div>
  );
}
