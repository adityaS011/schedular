import { Field } from '@/components/field';
import { SettingCard } from '@/components/setting-card';
import { TickSlider } from '@/components/tick-slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  REDIAL_INTERVALS,
  type GuardrailState,
  type RedialInterval,
} from '@/lib/scoring';

export function RedialCard({
  state,
  onChange,
}: {
  state: GuardrailState;
  onChange: (patch: Partial<GuardrailState>) => void;
}) {
  return (
    <SettingCard title='Redial'>
      <div className='flex flex-col gap-8'>
        <Field
          label='Redial count'
          action={
            <span className='text-sm font-medium text-muted-foreground'>
              {state.redialCount} redials
            </span>
          }
        >
          <TickSlider
            min={0}
            max={10}
            step={1}
            value={state.redialCount}
            onValueChange={(v) => onChange({ redialCount: v as number })}
            ticks={[0, 2, 4, 6, 8, 10].map((v) => ({
              value: v,
              label: String(v),
            }))}
          />
        </Field>

        <Field label='Redial interval'>
          <ToggleGroup
            spacing={0}
            value={[String(state.redialInterval)]}

            onValueChange={(vals) => {
              const v = vals[0];
              if (!v) return; // single-select can deselect — keep one chosen
              onChange({ redialInterval: Number(v) as RedialInterval });
            }}
            className='w-full rounded-lg bg-muted p-1'
          >
            {REDIAL_INTERVALS.map((interval) => (
              <ToggleGroupItem
                key={interval}
                value={String(interval)}
                className='flex-1 aria-pressed:rounded-sm aria-pressed:bg-background aria-pressed:shadow-sm'
              >
                {interval} hours
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </Field>
      </div>
    </SettingCard>
  );
}
