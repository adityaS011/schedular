import type { ReactNode } from 'react';

import { Label } from '@/components/ui/label';

// A labeled field: a label stacked above its control.
export function Field({
  label,
  action,
  children,
}: {
  label: string;
  // Optional right-aligned content in the label row (e.g. the selected value).
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <Label className='text-sm font-medium'>{label}</Label>
        {action}
      </div>
      {children}
    </div>
  );
}
