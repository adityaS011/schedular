import type { ReactNode } from 'react';

import { Label } from '@/components/ui/label';

// A labeled field: a label stacked above its control.
export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}
