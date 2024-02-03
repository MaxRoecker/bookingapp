import type { ReactNode } from 'react';
import type { Property } from '~/properties/typings';
import { startOfTomorrow } from 'date-fns';
import { FormattedMessage } from 'react-intl';
import { BookingItem } from '~/bookings/components/booking-item';
import { Button } from '~/commons/components/button';
import { usePropertyBookings } from '../hooks/user-property-bookings';

export type PropertyBookingListProps = {
  property: Property;
};

export function PropertyBookingList(
  props: PropertyBookingListProps,
): ReactNode {
  const { property } = props;

  const bookingRes = usePropertyBookings({
    id: property.id,
    to: startOfTomorrow(),
  });

  if (bookingRes.error != null) {
    return (
      <div className="flex flex-col items-center gap-4 md:gap-6">
        <p
          className="text-center text-sm text-muted-foreground"
          data-testid="error-message"
        >
          <FormattedMessage
            id="loadBookingsFailure"
            defaultMessage="There was an error while loading the bookings."
          />
        </p>
        <Button data-testid="reload-button" onClick={() => bookingRes.mutate()}>
          <FormattedMessage id="Reload" defaultMessage="Reload" />
        </Button>
      </div>
    );
  }

  const bookings = bookingRes.data?.bookings;

  if (bookings == null) return null;

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {bookings.map((booking) => (
        <BookingItem key={booking.id} booking={booking} property={property} />
      ))}
      {bookings.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          <FormattedMessage
            id="emptyPropertyBookings"
            defaultMessage="No upcoming bookings."
          />
        </p>
      )}
    </div>
  );
}
