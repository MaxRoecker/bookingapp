import { describe, expect, it } from 'vitest';
import { render, screen } from '~/commons/utils/test-utils';
import { peninsulaCottage } from '~/properties/mocks/data';
import { peninsulaCottage1 } from '../mocks/data';
import { BookingValue } from './booking-value';

describe('BookingValue tests', () => {
  it('should properly show the total value of the booking', async () => {
    render(
      <BookingValue booking={peninsulaCottage1} property={peninsulaCottage} />,
    );
    const element = await screen.findByTestId('booking-value');
    expect(element).toBeDefined();
    expect(element.textContent).toBe('$6,480.00');
  });
});
