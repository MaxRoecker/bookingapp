import type { Booking } from '../typings';
import type { ReactNode } from 'react';
import type { Property } from '~/properties/typings';
import { FormattedDateTimeRange } from 'react-intl';
import { Card, CardDescription, CardHeader } from '~/commons/components/card';
import { BookingDeleteButton } from './booking-delete-button';
import { BookingUpdateButton } from './booking-update-button';
import { BookingValue } from './booking-value';
import { BookingValueExtended } from './booking-value-extended';

export type BookingItemProps = {
  booking: Booking;
  property: Property;
};

export function BookingItem(props: BookingItemProps): ReactNode {
  const { booking, property } = props;
  return (
    <Card data-testid="booking-item">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardDescription
          className="truncate"
          data-testid="booking-item-description"
        >
          <FormattedDateTimeRange
            from={new Date(booking.from)}
            to={new Date(booking.to)}
            year="numeric"
            month="long"
            day="numeric"
          />
          <br />
          <BookingValue booking={booking} property={property} /> (
          <BookingValueExtended booking={booking} property={property} />)
        </CardDescription>
        <div className="flex shrink-0 flex-row gap-2">
          <BookingUpdateButton
            booking={booking}
            property={property}
            variant="outline"
            size="sm"
            icon
          />
          <BookingDeleteButton
            booking={booking}
            variant="destructive"
            size="sm"
            icon
          />
        </div>
      </CardHeader>
    </Card>
  );
}
