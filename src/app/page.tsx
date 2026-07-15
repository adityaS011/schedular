'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Field } from '@/components/field';
import { SettingCard } from '@/components/setting-card';
import { TickSlider } from '@/components/tick-slider';
import {
  CallingDay,
  OPTIMAL,
  REDIAL_INTERVALS,
  scoreGuardrails,
  type GuardrailState,
  type RedialInterval,
} from '@/lib/scoring';

export default function Home() {
  // Single source of truth: the four inputs. Everything else is derived.
  const [state, setState] = useState<GuardrailState>(OPTIMAL);
  const result = scoreGuardrails(state);

  return (
    <main className='flex min-h-dvh flex-col'>
      <header className='flex h-[82px] items-center px-10 text-[28px] font-semibold'>
        Redial and Guardrails
      </header>

      <div id='body' className='flex-1 px-10 py-6'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 '>
          {/* Left column: the controls */}
          <div className='space-y-6 '>
            <SettingCard title='Guardrails'>
              <Field label='Calling days'>
                <ToggleGroup
                  multiple
                  value={state.callingDays}
                  onValueChange={(days) => {
                    // "at least one day" rule — ignore an empty selection
                    if (days.length === 0) return;
                    setState({ ...state, callingDays: days as CallingDay[] });
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

              <Field label='Calling window'>
                <TickSlider
                  min={8}
                  max={21}
                  step={1}
                  value={[state.callingWindow.start, state.callingWindow.end]}
                  onValueChange={(v) => {
                    const [start, end] = v as [number, number];
                    setState({ ...state, callingWindow: { start, end } });
                  }}
                  ticks={['8 AM', '11 AM', '2 PM', '5 PM', '9 PM']}
                />
              </Field>
            </SettingCard>

            <SettingCard title='Redial' className=''>
              <Field label='Redial count'>
                <TickSlider
                  min={0}
                  max={10}
                  step={1}
                  value={state.redialCount}
                  onValueChange={(v) =>
                    setState({ ...state, redialCount: v as number })
                  }
                  ticks={['0', '2', '4', '6', '8', '10']}
                />
              </Field>

              <Field label='Redial interval'>
                <ToggleGroup
                  spacing={0}
                  value={[String(state.redialInterval)]}
                  onValueChange={(vals) => {
                    const v = vals[0];
                    if (!v) return; // single-select can deselect — keep one chosen
                    setState({
                      ...state,
                      redialInterval: Number(v) as RedialInterval,
                    });
                  }}
                  className='w-full rounded-lg bg-muted p-1'
                >
                  {REDIAL_INTERVALS.map((interval) => (
                    <ToggleGroupItem
                      key={interval}
                      value={String(interval)}
                      className='flex-1 aria-pressed:bg-background aria-pressed:shadow-sm'
                    >
                      {interval} hours
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </Field>
            </SettingCard>
          </div>

          {/* Right column: score card — placeholder, built next */}
          <div className='rounded-xl border p-4'>
            Score card
            {/* Live derived values — proves the spine works */}
            <pre className='mt-2 text-xs'>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      <footer className='flex justify-end border-t-2 px-10 py-6'>
        <Button size='lg'>Submit</Button>
      </footer>
    </main>
  );
}
