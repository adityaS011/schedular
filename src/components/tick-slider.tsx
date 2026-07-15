import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

// A slider with a row of tick labels beneath it.
// Works for both single-thumb (value: number) and range (value: number[]).
export function TickSlider({
  value,
  onValueChange,
  min,
  max,
  step = 1,
  ticks,
  className,
}: {
  value: number | number[];
  onValueChange: (value: number | readonly number[]) => void;
  min: number;
  max: number;
  step?: number;
  ticks: string[];
  className?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={onValueChange}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        {ticks.map((tick, i) => (
          <span key={i}>{tick}</span>
        ))}
      </div>
    </div>
  );
}
