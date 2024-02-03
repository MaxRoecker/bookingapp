import { describe, expect, it } from 'vitest';
import { render, screen } from '~/commons/utils/test-utils';
import { peninsulaCottage } from '~/properties/mocks/data';
import { peninsulaCottage1 } from '../mocks/data';
import { BookingValueExtended } from './booking-value-extended';

describe('BookingValueExtended tests', () => {
  it('should properly show the extended total value of the booking', async () => {
    render(
      <BookingValueExtended
        booking={peninsulaCottage1}
        property={peninsulaCottage}
      />,
    );
    const element = await screen.findByTestId('booking-value-extended');
    expect(element).toBeDefined();
    expect(element.textContent).toBe('$540.00 × 12 nights');
  });
});
