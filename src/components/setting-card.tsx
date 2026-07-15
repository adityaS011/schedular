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
    <Card className={cn('gap-0 py-0', className)}>
      <CardHeader className="border-b bg-muted/40 py-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 py-5">{children}</CardContent>
    </Card>
  );
}
