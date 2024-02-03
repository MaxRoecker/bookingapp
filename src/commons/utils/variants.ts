import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  `
  inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm
  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1
  focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        default: `
          bg-primary text-primary-foreground shadow hover:bg-primary/90
        `,
        destructive: `
          bg-destructive text-destructive-foreground shadow-sm
          hover:bg-destructive/90
        `,
        outline: `
          border border-input bg-background text-primary shadow-sm hover:bg-accent
          hover:text-accent-foreground
        `,
        secondary: `
          bg-secondary text-secondary-foreground shadow-sm
          hover:bg-secondary/80
        `,
        ghost: `
          hover:bg-accent hover:text-accent-foreground
        `,
        link: `
          text-primary underline-offset-4 hover:underline
        `,
      },
      size: {
        default: 'h-10 rounded-md px-4 py-2',
        xs: 'h-6 rounded-sm px-1.5 text-xs',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        xl: 'h-14 rounded-lg px-11 text-base',
      },
      icon: {
        true: 'p-0',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
    compoundVariants: [
      {
        icon: true,
        size: 'default',
        class: 'w-10',
      },
      {
        icon: true,
        size: 'xl',
        class: 'w-14',
      },
      {
        icon: true,
        size: 'lg',
        class: 'w-11',
      },
      {
        icon: true,
        size: 'sm',
        class: 'w-9',
      },
      {
        icon: true,
        size: 'xs',
        class: 'w-6',
      },
    ],
  },
);

export const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);
