import type { Booking } from '../typings';
import type { HttpResponseResolver } from 'msw';
import { HttpResponse, http } from 'msw';
import { propertyById } from '~/properties/mocks/data';
import { bookingById } from './data';

export const listBookings: HttpResponseResolver = ({ request }) => {
  const bookings = Array.from(bookingById.values());

  const message = 'Ok';
  const url = new URL(request.url);
  const offset = Number.parseInt(url.searchParams.get('offset') ?? '0');
  const limit = Number.parseInt(url.searchParams.get('limit') ?? '5');
  const count = bookings.length;

  const bookingsAndProperties = bookings
    .slice(offset, offset + limit)
    .map((booking) => {
      const property = propertyById.get(booking.propertyId)!;
      return { booking, property };
    });

  return HttpResponse.json(
    { bookings: bookingsAndProperties, message, offset, limit, count },
    { status: 200 },
  );
};

export const createBooking: HttpResponseResolver = async ({ request }) => {
  let message = 'Ok';
  const json = (await request.json()) as {
    propertyId: string;
    from: string;
    to: string;
  };

  const property = propertyById.get(json.propertyId);
  if (property == null) {
    message = `Property not found`;
    return HttpResponse.json({ message }, { status: 404 });
  }

  const booking: Booking = {
    id: `${property.id}-${Math.random().toString(36).slice(2)}`,
    propertyId: property.id,
    from: json.from,
    to: json.to,
    offsetDays: property.offsetDays,
  };

  bookingById.set(booking.id, booking);

  return HttpResponse.json({ booking, message }, { status: 201 });
};

export const retrieveBooking: HttpResponseResolver = ({ params }) => {
  const { id } = params;

  let message = 'Ok';

  if (typeof id !== 'string') {
    message = `Booking not found`;
    return HttpResponse.json({ message }, { status: 404 });
  }

  const booking = bookingById.get(id);

  if (booking == null) {
    message = `Booking not found`;
    return HttpResponse.json({ message }, { status: 404 });
  }

  return HttpResponse.json({ booking, message }, { status: 200 });
};

export const deleteBooking: HttpResponseResolver = ({ params }) => {
  const { id } = params;

  let message = 'Ok';

  if (typeof id !== 'string') {
    message = `Booking not found`;
    return HttpResponse.json({ message }, { status: 404 });
  }

  const deleted = bookingById.delete(id);

  if (!deleted) {
    message = `Booking not found`;
    return HttpResponse.json({ message }, { status: 404 });
  }

  return HttpResponse.json({ message }, { status: 200 });
};

export const updateBooking: HttpResponseResolver = async ({
  params,
  request,
}) => {
  const { id } = params;
  let message = 'Ok';

  if (typeof id !== 'string') {
    message = `Booking not found`;
    return HttpResponse.json({ message }, { status: 404 });
  }

  const booking = bookingById.get(id);

  if (!booking) {
    message = `Booking not found`;
    return HttpResponse.json({ message }, { status: 404 });
  }

  const json = (await request.json()) as {
    from: string;
    to: string;
  };
  const updated = { ...booking, ...json };
  bookingById.set(id, updated);

  return HttpResponse.json({ booking: updated, message }, { status: 200 });
};

export const handlers = [
  http.get('/api/bookings', listBookings),
  http.post('/api/bookings', createBooking),
  http.get('/api/bookings/:id', retrieveBooking),
  http.delete('/api/bookings/:id', deleteBooking),
  http.patch('/api/bookings/:id', updateBooking),
];
