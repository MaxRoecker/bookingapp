import type { ButtonProps } from './button';
import type { ComponentProps } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';
import { forwardRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { cn } from '../utils/classnames';
import { buttonVariants } from '../utils/variants';
import { Button } from './button';

const Pagination = ({ className, ...props }: ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props} />
  ),
);
PaginationItem.displayName = 'PaginationItem';

type PaginationButton = ButtonProps & {
  isActive?: boolean;
};

const PaginationButton = (props: PaginationButton) => {
  const {
    className,
    isActive,
    size = 'default',
    icon = false,
    ...rest
  } = props;
  return (
    <Button
      aria-current={isActive ? 'page' : undefined}
      disabled={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'default',
          size,
          icon,
        }),
        className,
      )}
      {...rest}
    />
  );
};
PaginationButton.displayName = 'PaginationButton';

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to previous page"
    size="default"
    className={cn('gap-1 pl-2.5', className)}
    {...props}
  >
    <ChevronLeftIcon className="size-4" />
    <span>
      <FormattedMessage id="Previous" defaultMessage="Previous" />
    </span>
  </PaginationButton>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to next page"
    size="default"
    className={cn('gap-1 pr-2.5', className)}
    {...props}
  >
    <span>
      <FormattedMessage id="Next" defaultMessage="Next" />
    </span>
    <ChevronRightIcon className="size-4" />
  </PaginationButton>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <DotsHorizontalIcon className="size-4" />
    <span className="sr-only">
      <FormattedMessage id="More Pages" defaultMessage="More Pages" />
    </span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationButton,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
