import { http } from 'msw';
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
import { render, screen } from '~/commons/utils/test-utils';
import { peninsulaCottage } from '~/properties/mocks/data';
import { upcomingPropertyBookings } from '~/properties/mocks/http-handlers';
import { BookingCreateForm } from './booking-create-form';

const server = setupServer();
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('BookingForm tests', () => {
  it('should properly show the booking form', async () => {
    const mockedHandler = vi.fn().mockImplementation(upcomingPropertyBookings);
    server.use(
      http.get(
        `${import.meta.env.VITE_ROOT_URL}/api/properties/:id/bookings`,
        mockedHandler,
      ),
    );

    render(<BookingCreateForm property={peninsulaCottage} />);

    const form = await screen.findByTestId('booking-create-form');
    expect(form).toBeDefined();

    const datepicker = await screen.findByTestId(
      'booking-create-form-input-date',
    );
    expect(datepicker).toBeDefined();

    const submit = await screen.findByTestId<HTMLButtonElement>(
      'booking-create-form-button-submit',
    );
    expect(submit).toBeDefined();
    expect(submit.disabled).toBeTruthy();
  });
});
