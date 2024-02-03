import type { HttpResponseResolver } from 'msw';
import { isBefore } from 'date-fns';
import { HttpResponse, http } from 'msw';
import { bookingById } from '~/bookings/mocks/data';
import { propertyById } from './data';

export const listProperties: HttpResponseResolver = ({ request }) => {
  let message = 'Ok';
  const url = new URL(request.url);

  const ids = url.searchParams.getAll('id');

  if (ids.length === 0) {
    const properties = Array.from(propertyById.values());
    return HttpResponse.json({ properties, message }, { status: 200 });
  }

  const properties = ids.map((id) => propertyById.get(id));

  if (properties.some((property) => property == null)) {
    message = `Property not found`;
    return HttpResponse.json({ message }, { status: 404 });
  }

  return HttpResponse.json({ properties, message }, { status: 200 });
};

export const retrieveProperty: HttpResponseResolver = ({ params }) => {
  const { id } = params;

  let message = 'Ok';

  if (typeof id !== 'string') {
    message = `Property not found`;
    return HttpResponse.json({ message }, { status: 404 });
  }

  const property = propertyById.get(id);

  if (property == null) {
    message = `Property not found`;
    return HttpResponse.json({ message }, { status: 404 });
  }

  return HttpResponse.json({ property, message }, { status: 200 });
};

export const upcomingPropertyBookings: HttpResponseResolver = ({
  params,
  request,
}) => {
  const { id } = params;

  let message = 'Ok';

  if (typeof id !== 'string') {
    message = `Property not found`;
    return HttpResponse.json({ message }, { status: 404 });
  }

  const property = propertyById.get(id);

  if (property == null) {
    message = `Property not found`;
    return HttpResponse.json({ message }, { status: 404 });
  }

  const url = new URL(request.url);
  const toParam = url.searchParams.get('to');
  const to = toParam != null ? new Date(toParam) : new Date(-8640000000000000);

  const bookings = Array.from(bookingById.values()).filter((booking) => {
    return booking.propertyId === property.id && isBefore(to, booking.to);
  });

  return HttpResponse.json({ bookings, message }, { status: 200 });
};

export const handlers = [
  http.get('/api/properties', listProperties),
  http.get('/api/properties/:id', retrieveProperty),
  http.get('/api/properties/:id/bookings', upcomingPropertyBookings),
];
