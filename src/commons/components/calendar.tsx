import type { ComponentProps } from 'react';
import type { DayProps, StyledComponent } from 'react-day-picker';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useRef } from 'react';
import { DayPicker, useDayRender } from 'react-day-picker';
import { cn } from '../utils/classnames';
import { buttonVariants } from '../utils/variants';

export type CalendarProps = ComponentProps<typeof DayPicker>;

export function Calendar(props: CalendarProps) {
  const { className, classNames, showOutsideDays = true, ...rest } = props;

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      data-testid="calendar"
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md',
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100',
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft,
        IconRight,
        Day,
      }}
      {...rest}
    />
  );
}
Calendar.displayName = 'Calendar';

function IconLeft(props: StyledComponent) {
  const { className, style } = props;
  return <ChevronLeftIcon className={cn('size-4', className)} style={style} />;
}

function IconRight(props: StyledComponent) {
  const { className, style } = props;
  return <ChevronRightIcon className={cn('size-4', className)} style={style} />;
}

function Day(props: DayProps) {
  const { date, displayMonth } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const render = useDayRender(date, displayMonth, buttonRef);

  if (render.isHidden) return <></>;

  if (render.isButton) {
    return (
      <button
        type="button"
        data-testid="calendar-day-button"
        value={date.toISOString()}
        {...render.buttonProps}
      ></button>
    );
  }

  return <div {...render.divProps}></div>;
}
