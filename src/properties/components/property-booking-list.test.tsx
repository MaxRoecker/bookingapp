import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { render, screen, waitFor } from '~/commons/utils/test-utils';
import { peninsulaCottage } from '../mocks/data';
import { upcomingPropertyBookings } from '../mocks/http-handlers';
import { PropertyBookingList } from './property-booking-list';

const server = setupServer();
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('PropertyBookingList page tests', () => {
  it('should properly render the list of bookings of a property', async () => {
    const mockedHandler = vi.fn().mockImplementation(upcomingPropertyBookings);
    server.use(
      http.get(
        `${import.meta.env.VITE_ROOT_URL}/api/properties/:id/bookings`,
        mockedHandler,
      ),
    );
    render(<PropertyBookingList property={peninsulaCottage} />);

    await waitFor(() => expect(mockedHandler).toHaveBeenCalledTimes(1));

    const items = await screen.findAllByTestId('booking-item');
    expect(items.length).toBe(2);
  });

  it('should properly render the error message', async () => {
    const mockedHandler = vi.fn().mockImplementation(() => {
      return HttpResponse.error();
    });
    server.use(
      http.get(
        `${import.meta.env.VITE_ROOT_URL}/api/properties/:id/bookings`,
        mockedHandler,
      ),
    );
    render(<PropertyBookingList property={peninsulaCottage} />);

    await waitFor(() => expect(mockedHandler).toHaveBeenCalledTimes(1));

    const message = await screen.findAllByTestId('error-message');
    expect(message).toBeDefined();
  });
});
