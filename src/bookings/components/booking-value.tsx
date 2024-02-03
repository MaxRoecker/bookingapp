import type { Booking } from '../typings';
import type { HTMLAttributes } from 'react';
import type { Property } from '~/properties/typings';
import { differenceInDays } from 'date-fns';
import { forwardRef } from 'react';
import { FormattedNumber } from 'react-intl';
import { cn } from '~/commons/utils/classnames';

type PropertyValueProps = Omit<
  HTMLAttributes<HTMLElement>,
  'property' | 'children'
> & {
  booking: Booking;
  property: Property;
};

export const BookingValue = forwardRef<HTMLElement, PropertyValueProps>(
  (props, ref) => {
    const { booking, property, className, ...rest } = props;

    const nights = differenceInDays(booking.to, booking.from);

    const value = nights * property.value;

    return (
      <strong
        ref={ref}
        className={cn('font-semibold', className)}
        data-testid="booking-value"
        {...rest}
      >
        <FormattedNumber
          value={value / 100}
          style="currency"
          currency="USD"
          minimumFractionDigits={2}
          maximumFractionDigits={2}
        />
      </strong>
    );
  },
);

BookingValue.displayName = 'PropertyValue';
