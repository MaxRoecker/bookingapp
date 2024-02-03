import type { Booking } from './typings';
import type { Property } from '~/properties/typings';
import {
  add,
  areIntervalsOverlapping,
  endOfDay,
  startOfDay,
  sub,
} from 'date-fns';

export function isDateOverlappingBooking(
  property: Property,
  booking: Booking,
  date: Date,
): boolean {
  const offsetStart = sub(booking.from, { days: property.offsetDays });
  const offsetEnd = add(booking.to, { days: booking.offsetDays });
  const bookingInterval = { start: offsetStart, end: offsetEnd };
  const dateInterval = { start: startOfDay(date), end: endOfDay(date) };
  return areIntervalsOverlapping(bookingInterval, dateInterval);
}

export function isRangeOverlappingBooking(
  booking: Booking,
  from: Date,
  to: Date,
): boolean {
  const bookingInterval = {
    start: new Date(booking.from),
    end: add(new Date(booking.to), { days: booking.offsetDays }),
  };
  const rangeInterval = { start: from, end: to };
  return areIntervalsOverlapping(bookingInterval, rangeInterval);
}
