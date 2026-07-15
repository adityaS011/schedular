import type { ReactNode } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// A titled settings card: gray title strip on top, controls below.
export function SettingCard({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Card className={cn('gap-0 py-0 ', className)}>
      <CardHeader className=' bg-muted/40 px-6 py-2.5'>
        <CardTitle className='text-sm font-medium  '>{title}</CardTitle>
      </CardHeader>
      <CardContent className='border bg-card px-6 py-5 rounded-xl'>
        {children}
      </CardContent>
    </Card>
  );
}
