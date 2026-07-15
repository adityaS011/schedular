import { Field } from '@/components/field';
import { SettingCard } from '@/components/setting-card';
import { TickSlider } from '@/components/tick-slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { CallingDay, type GuardrailState } from '@/lib/scoring';
import { formatHour } from '@/lib/utils';

export function GuardrailsCard({
  state,
  onChange,
}: {
  state: GuardrailState;
  onChange: (patch: Partial<GuardrailState>) => void;
}) {
  return (
    <SettingCard title='Guardrails'>
      <div className='flex flex-col gap-10'>
        <Field label='Calling days'>
          <ToggleGroup
            multiple
            value={state.callingDays}
            onValueChange={(days) => {
              // "at least one day" rule — ignore an empty selection
              if (days.length === 0) return;
              onChange({ callingDays: days as CallingDay[] });
            }}
            className='w-full'
          >
            {Object.values(CallingDay).map((day) => (
              <ToggleGroupItem
                key={day}
                value={day}
                variant='outline'
                className='flex-1 rounded-sm aria-pressed:border-transparent aria-pressed:bg-primary aria-pressed:text-primary-foreground'
              >
                {day}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </Field>

        <Field
          label='Calling window'
          action={
            <span className='text-sm font-medium text-muted-foreground'>
              {formatHour(state.callingWindow.start)} –{' '}
              {formatHour(state.callingWindow.end)}
            </span>
          }
        >
          <TickSlider
            min={8}
            max={21}
            step={1}
            minStepsBetweenValues={3} // window must be at least 3 hours
            value={[state.callingWindow.start, state.callingWindow.end]}
            onValueChange={(v) => {
              const [start, end] = v as [number, number];
              onChange({ callingWindow: { start, end } });
            }}
            ticks={[
              { value: 8, label: '8 AM' },
              { value: 11, label: '11 AM' },
              { value: 14, label: '2 PM' },
              { value: 17, label: '5 PM' },
              { value: 21, label: '9 PM' },
            ]}
          />
        </Field>
      </div>
    </SettingCard>
  );
}
