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
import { Toaster } from '~/commons/components/toaster';
import { render, screen, userEvent, waitFor } from '~/commons/utils/test-utils';
import { peninsulaCottage1 } from '../mocks/data';
import { deleteBooking } from '../mocks/http-handlers';
import { BookingDeleteButton } from './booking-delete-button';

const server = setupServer();
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('BookingDeleteButton tests', () => {
  it('should show/hide the delete dialog', async () => {
    render(<BookingDeleteButton booking={peninsulaCottage1} />);

    const deleteBtn = await screen.findByTestId('booking-delete-button');
    expect(deleteBtn).toBeDefined();

    // Dialog should not be visible
    expect(screen.queryByTestId('booking-delete-dialog')).toBeNull();

    await userEvent.click(deleteBtn);

    // Dialog is open, it should not be visible
    expect(screen.queryByTestId('booking-delete-dialog')).toBeDefined();

    const cancel = await screen.findByTestId('booking-delete-dialog-cancel');

    await userEvent.click(cancel);

    // Dialog should not be visible
    expect(screen.queryByTestId('booking-delete-dialog')).toBeNull();
  });

  it('should delete the booking when the user confirms', async () => {
    const deleteBookingMock = vi.fn().mockImplementation(deleteBooking);

    server.use(
      http.delete(
        `${import.meta.env.VITE_ROOT_URL}/api/bookings/:id`,
        deleteBookingMock,
      ),
    );

    render(
      <>
        <BookingDeleteButton booking={peninsulaCottage1} />
        <Toaster />
      </>,
    );
    const deleteBtn = await screen.findByTestId('booking-delete-button');
    expect(deleteBtn).toBeDefined();

    await userEvent.click(deleteBtn);

    const confirm = await screen.findByTestId('booking-delete-dialog-confirm');
    expect(confirm).toBeDefined();

    await userEvent.click(confirm);

    await waitFor(() => expect(deleteBookingMock).toHaveBeenCalledTimes(1));

    const toastTitle = await screen.findByTestId('toast-title');
    expect(toastTitle.textContent).toBe('Success');
  });

  it('should show error toast when a failure happens', async () => {
    const deleteBookingMock = vi.fn().mockImplementation(() => {
      return HttpResponse.error();
    });

    server.use(
      http.delete(
        `${import.meta.env.VITE_ROOT_URL}/api/bookings/:id`,
        deleteBookingMock,
      ),
    );

    render(
      <>
        <BookingDeleteButton booking={peninsulaCottage1} />
        <Toaster />
      </>,
    );
    const deleteBtn = await screen.findByTestId('booking-delete-button');
    expect(deleteBtn).toBeDefined();

    await userEvent.click(deleteBtn);

    const confirm = await screen.findByTestId('booking-delete-dialog-confirm');
    expect(confirm).toBeDefined();

    await userEvent.click(confirm);

    await waitFor(() => expect(deleteBookingMock).toHaveBeenCalledTimes(1));

    const toastTitle = await screen.findByTestId('toast-title');
    expect(toastTitle.textContent).toBe('Oops…');
  });
});
