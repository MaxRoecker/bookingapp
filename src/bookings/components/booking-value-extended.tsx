import type { Booking } from '../typings';
import type { HTMLAttributes } from 'react';
import type { Property } from '~/properties/typings';
import { differenceInDays } from 'date-fns';
import { forwardRef } from 'react';
import { FormattedMessage, FormattedNumber, FormattedPlural } from 'react-intl';

type PropertyValueProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'property' | 'children'
> & {
  booking: Booking;
  property: Property;
};

export const BookingValueExtended = forwardRef<
  HTMLSpanElement,
  PropertyValueProps
>((props, ref) => {
  const { booking, property, ...rest } = props;

  const nights = differenceInDays(booking.to, booking.from);

  return (
    <span ref={ref} data-testid="booking-value-extended" {...rest}>
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
    </span>
  );
});

BookingValueExtended.displayName = 'BookingValueExtended';
