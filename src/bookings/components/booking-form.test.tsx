import { describe, expect, it, vi } from 'vitest';
import { render, screen, userEvent } from '~/commons/utils/test-utils';
import { peninsulaCottage } from '~/properties/mocks/data';
import { peninsulaCottage1, peninsulaCottage2 } from '../mocks/data';
import { BookingForm } from './booking-form';

describe('BookingForm tests', () => {
  it('should properly show the booking form', async () => {
    render(
      <BookingForm
        property={peninsulaCottage}
        bookings={[peninsulaCottage1, peninsulaCottage2]}
      />,
    );

    const form = await screen.findByTestId('booking-form');
    expect(form).toBeDefined();

    const datepicker = await screen.findByTestId('booking-form-input-date');
    expect(datepicker).toBeDefined();

    const submit = await screen.findByTestId<HTMLButtonElement>(
      'booking-form-button-submit',
    );
    expect(submit).toBeDefined();
    expect(submit.disabled).toBeTruthy();
  });

  it('should call onSubmit when click on submit', async () => {
    const handleSubmit = vi.fn();

    render(
      <BookingForm
        property={peninsulaCottage}
        bookings={[peninsulaCottage2]}
        onSubmit={handleSubmit}
        defaultValue={{
          from: new Date(peninsulaCottage1.from),
          to: new Date(peninsulaCottage1.to),
        }}
      />,
    );

    const form = await screen.findByTestId('booking-form');
    expect(form).toBeDefined();

    const datepicker = await screen.findByTestId('booking-form-input-date');
    expect(datepicker).toBeDefined();

    const submit = await screen.findByTestId<HTMLButtonElement>(
      'booking-form-button-submit',
    );
    expect(submit).toBeDefined();
    expect(submit.disabled).toBeFalsy();

    await userEvent.click(submit);

    expect(handleSubmit).toBeCalled();
  });
});
