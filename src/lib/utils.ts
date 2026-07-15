import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format a 24-hour value (0–23) as a 12-hour label, e.g. 8 → "8 AM", 13 → "1 PM".
export function formatHour(hour: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h} ${period}`;
}
