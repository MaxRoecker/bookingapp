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
  useIntl,
} from 'react-intl';
import { Button } from '~/commons/components/button';
import { Calendar } from '~/commons/components/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/commons/components/popover';
import { toast } from '~/commons/hooks/use-toast';
import { cn } from '~/commons/utils/classnames';
import { usePropertyBookings } from '~/properties/hooks/user-property-bookings';
import { useCreateBooking } from '../hooks/use-create-booking';
import { isDateOverlappingBooking, isRangeOverlappingBooking } from '../utils';

type BookingCreateFormProps = {
  property: Property;
};

export function BookingCreateForm(props: BookingCreateFormProps): ReactNode {
  const { property } = props;

  const tomorrowStart = startOfTomorrow();

  const intl = useIntl();

  const [range, setRange] = useState<DateRange | undefined>();

  const isSmallScreen = useMediaQuery(`(max-width: 768px)`);

  const createRes = useCreateBooking();

  const bookingsRes = usePropertyBookings({
    id: property.id,
    to: tomorrowStart,
  });

  const bookings = bookingsRes.data?.bookings;
  const loading = bookingsRes.data?.bookings == null || createRes.isMutating;

  const isDateDisabled = (date: Date): boolean => {
    if (bookings == null) return false;
    if (isBefore(date, tomorrowStart)) return true;
    const offset = add(tomorrowStart, { days: property.offsetDays });
    if (isBefore(date, offset)) return true;
    return bookings.some((booking) => {
      return isDateOverlappingBooking(property, booking, date);
    });
  };

  const handleSelectChange: SelectRangeEventHandler = (nextRange) => {
    if (!isRangeDefined(nextRange)) {
      setRange(nextRange);
      return;
    }
    const isOverlapping = bookings!.some((booking) => {
      return isRangeOverlappingBooking(booking, nextRange.from, nextRange.to);
    });
    if (isOverlapping) return;
    setRange(nextRange);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isRangeDefined(range)) return;
    const json = {
      propertyId: property.id,
      from: range.from.toISOString(),
      to: range.to.toISOString(),
    };
    createRes
      .trigger(json)
      .then(() => {
        setRange(undefined);
        toast({
          title: intl.formatMessage({
            id: 'Success',
            defaultMessage: 'Success',
          }),
          description: intl.formatMessage({
            id: 'createSuccessDescription',
            defaultMessage: 'Your booking was created',
          }),
        });
        return;
      })
      .catch(() => {
        toast({
          title: intl.formatMessage({
            id: 'Oops',
            defaultMessage: 'Oops…',
          }),
          description: intl.formatMessage({
            id: 'createFailureDescription',
            defaultMessage: 'Your booking was not created',
          }),
        });
        return;
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
            disabled={loading}
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
            onSelect={handleSelectChange}
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
        disabled={loading || !isRangeDefined(range)}
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
