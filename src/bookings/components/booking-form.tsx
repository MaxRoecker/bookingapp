import type { Booking } from '../typings';
import type { FormEvent, ReactNode } from 'react';
import type { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import type { Property } from '~/properties/typings';
import { CalendarIcon } from '@radix-ui/react-icons';
import { useMediaQuery } from '@uidotdev/usehooks';
import { add, differenceInDays, isBefore, startOfTomorrow } from 'date-fns';
import { useState } from 'react';
import {
  FormattedDateTimeRange,
  FormattedMessage,
  FormattedNumber,
  FormattedPlural,
} from 'react-intl';
import { Button } from '~/commons/components/button';
import { Calendar } from '~/commons/components/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/commons/components/popover';
import { cn } from '~/commons/utils/classnames';
import { isDateOverlappingBooking, isRangeOverlappingBooking } from '../utils';

type BookingFormProps = {
  property: Property;
  bookings: Array<Booking>;
  defaultValue?: { from: Date; to: Date };
  busy?: boolean;
  onSubmit?: (value: { from: Date; to: Date }) => void;
};

export function BookingForm(props: BookingFormProps): ReactNode {
  const { property, bookings, defaultValue, onSubmit, busy } = props;

  const dispatchRange =
    (current: DateRange | undefined) => (previous?: DateRange | undefined) => {
      if (isEqual(current, previous)) return previous;
      if (!isRangeDefined(current)) return current;
      const overlaps = bookings!.some((booking) => {
        return isRangeOverlappingBooking(booking, current.from, current.to);
      });
      if (overlaps) return previous;
      return current;
    };

  const [range, setRange] = useState<DateRange | undefined>(
    dispatchRange(defaultValue),
  );

  const isSmallScreen = useMediaQuery(`(max-width: 768px)`);

  const handleChange: SelectRangeEventHandler = (nextRange) => {
    setRange(dispatchRange(nextRange));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (onSubmit == null) return;
    if (!isRangeDefined(range)) return;
    onSubmit(range);
  };

  const isDateDisabled = (date: Date): boolean => {
    if (bookings == null) return false;
    const tomorrowStart = startOfTomorrow();
    if (isBefore(date, tomorrowStart)) return true;
    const offset = add(tomorrowStart, { days: property.offsetDays });
    if (isBefore(date, offset)) return true;
    return bookings.some((booking) => {
      return isDateOverlappingBooking(property, booking, date);
    });
  };

  const nights = isRangeDefined(range)
    ? differenceInDays(range.to, range.from)
    : 0;

  const value = nights * property.value;

  return (
    <form
      className="flex flex-col gap-4 md:gap-6"
      onSubmit={handleSubmit}
      data-testid="booking-create-form"
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={busy}
            data-testid="booking-create-form-input-date"
            className={cn(
              'w-full pl-3 text-left font-normal',
              range != null && 'text-muted-foreground',
            )}
          >
            {isRangeDefined(range) ? (
              <FormattedDateTimeRange
                from={range.from}
                to={range.to}
                year="numeric"
                month="long"
                day="numeric"
              />
            ) : (
              <span>
                <FormattedMessage
                  id="Pick a date"
                  defaultMessage="Pick a date"
                />
              </span>
            )}
            <CalendarIcon className="ml-auto size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="range"
            showOutsideDays
            fixedWeeks
            min={2}
            numberOfMonths={isSmallScreen ? 1 : 2}
            selected={range}
            onSelect={handleChange}
            disabled={isDateDisabled}
          />
        </PopoverContent>
      </Popover>
      {nights === 0 ? null : (
        <output name="total" className="text-sm">
          <strong>
            <FormattedNumber
              value={value / 100}
              style="currency"
              currency="USD"
              minimumFractionDigits={2}
              maximumFractionDigits={2}
            />
          </strong>{' '}
          (
          <FormattedNumber
            value={property.value / 100}
            style="currency"
            currency="USD"
            minimumFractionDigits={2}
            maximumFractionDigits={2}
          />{' '}
          &times;{' '}
          <FormattedNumber
            value={nights}
            style="decimal"
            maximumFractionDigits={0}
          />{' '}
          <FormattedPlural
            value={nights}
            one={<FormattedMessage id="night" defaultMessage="night" />}
            other={<FormattedMessage id="nights" defaultMessage="nights" />}
          />
          )
        </output>
      )}

      <Button
        type="submit"
        disabled={busy || !isRangeDefined(range)}
        data-testid="booking-create-form-button-submit"
      >
        <FormattedMessage id="Book Now!" defaultMessage="Book Now!" />
      </Button>
    </form>
  );
}

function isRangeDefined(range?: DateRange): range is { from: Date; to: Date } {
  return range != null && range.from != null && range.to != null;
}

function isEqual(a?: DateRange, b?: DateRange): boolean {
  if (a === b || (a == null && b == null)) return true;
  if (a == null || b == null) return false;
  const fromEquals = a.from?.valueOf() === b.from?.valueOf();
  const toEquals = a.to?.valueOf() === b.to?.valueOf();
  return fromEquals && toEquals;
}
