'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const base =
  'inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wellness-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white';

const variants: Record<'default' | 'outline' | 'ghost', string> = {
  default: 'bg-wellness-gold text-white hover:bg-wellness-gold/90',
  outline:
    'border border-wellness-green text-wellness-green bg-transparent hover:bg-wellness-light',
  ghost: 'bg-transparent text-wellness-green hover:bg-wellness-light/60',
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export function Button({
  variant = 'default',
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        base,
        variants[variant],
        fullWidth && 'w-full',
        className ?? '',
      )}
    />
  );
}

