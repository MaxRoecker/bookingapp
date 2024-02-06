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
import {
  getWrapper,
  render,
  screen,
  waitFor,
} from '~/commons/utils/test-utils';
import {
  retrieveProperty,
  upcomingPropertyBookings,
} from '../mocks/http-handlers';
import { Property } from './property';

const server = setupServer();
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Properties page tests', () => {
  it('should properly render the bookings page', async () => {
    const retrievePropertyMock = vi.fn().mockImplementation(retrieveProperty);
    const upcomingPropertyBookingsMock = vi
      .fn()
      .mockImplementation(upcomingPropertyBookings);
    server.use(
      http.get(
        `${import.meta.env.VITE_ROOT_URL}/api/properties/:id`,
        retrievePropertyMock,
      ),
      http.get(
        `${import.meta.env.VITE_ROOT_URL}/api/properties/:id/bookings`,
        upcomingPropertyBookingsMock,
      ),
    );
    render(<Property />, {
      wrapper: getWrapper({
        router: {
          path: '/properties/peninsula-cottage',
          route: '/properties/:propertyId',
        },
      }),
    });

    await waitFor(() => expect(retrievePropertyMock).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(upcomingPropertyBookingsMock).toHaveBeenCalledTimes(1),
    );

    const thumbnail = await screen.findByTestId('property-thumbnail');
    expect(thumbnail).toBeDefined();

    const createForm = await screen.findByTestId('booking-form');
    expect(createForm).toBeDefined();
  });

  it('should properly render the error message', async () => {
    const retrievePropertyMock = vi.fn().mockImplementation(() => {
      return HttpResponse.error();
    });
    const upcomingPropertyBookingsMock = vi
      .fn()
      .mockImplementation(upcomingPropertyBookings);
    server.use(
      http.get(
        `${import.meta.env.VITE_ROOT_URL}/api/properties/:id`,
        retrievePropertyMock,
      ),
      http.get(
        `${import.meta.env.VITE_ROOT_URL}/api/properties/:id/bookings`,
        upcomingPropertyBookingsMock,
      ),
    );
    render(<Property />, {
      wrapper: getWrapper({
        router: {
          path: '/properties/peninsula-cottage',
          route: '/properties/:propertyId',
        },
      }),
    });

    await waitFor(() => expect(retrievePropertyMock).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      // if there is an error on the previous API, this endpoint should not be called.
      expect(upcomingPropertyBookingsMock).toHaveBeenCalledTimes(0),
    );

    const message = await screen.findAllByTestId('error-message');
    expect(message).toBeDefined();
  });
});
