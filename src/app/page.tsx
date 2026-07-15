'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { GuardrailsCard, RedialCard, ScoreCard } from '@/features/guardrails';
import { OPTIMAL, scoreGuardrails, type GuardrailState } from '@/lib/scoring';

export default function Home() {
  const [state, setState] = useState<GuardrailState>(OPTIMAL);

  const update = (patch: Partial<GuardrailState>) =>
    setState((s) => ({ ...s, ...patch }));

  const result = scoreGuardrails(state);

  const handleSubmit = () => {
    console.log('Guardrail config:', { ...state, score: result });
  };

  return (
    <main className='flex h-dvh flex-col overflow-hidden'>
      <header className='flex h-16 shrink-0 items-center border-b px-8 text-[28px] font-bold'>
        Redial &amp; Guardrails
      </header>

      <div className='min-h-0 flex-1 overflow-y-auto px-8 py-6'>
        <div className='mx-auto grid max-w-[1240px] grid-cols-1 gap-8 lg:h-full lg:grid-cols-[1.05fr_1fr] xl:gap-20'>
          {/* Left column: the controls */}
          <div className='flex flex-col gap-10'>
            <GuardrailsCard state={state} onChange={update} />
            <RedialCard state={state} onChange={update} />
          </div>

          {/* Right column: live score + penalty breakdown */}
          <ScoreCard result={result} />
        </div>
      </div>

      <footer className='flex shrink-0 justify-end border-t px-8 py-3'>
        <Button size='lg' onClick={handleSubmit}>
          Submit
        </Button>
      </footer>
    </main>
  );
}
