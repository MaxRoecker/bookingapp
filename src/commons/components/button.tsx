import type { VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';
import { cn } from '~/commons/utils/classnames';
import { buttonVariants } from '../utils/variants';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, variant, size, icon, asChild = false, ...rest } = props;
    const Component = asChild ? Slot : 'button';
    return (
      <Component
        ref={ref}
        className={cn(buttonVariants({ variant, size, icon, className }))}
        {...rest}
      />
    );
  },
);
Button.displayName = 'Button';
