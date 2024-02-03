import type { Booking } from '../typings';
import type { ReactNode } from 'react';
import type { Property } from '~/properties/typings';
import { BookingCard } from './booking-card';

export type BookingGridProps = {
  bookings: Array<{ booking: Booking; property: Property }>;
};

export function BookingGrid(props: BookingGridProps): ReactNode {
  const { bookings } = props;
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6" data-testid="booking-grid">
      {bookings.map(({ booking, property }) => (
        <BookingCard key={booking.id} booking={booking} property={property} />
      ))}
    </div>
  );
}
