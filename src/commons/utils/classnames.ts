import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Wraps the `clsx` function and `twMerge` function to handle Tailwind class
 * names.
 * @param inputs
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
