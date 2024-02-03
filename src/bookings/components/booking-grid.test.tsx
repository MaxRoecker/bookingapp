import { describe, expect, it } from 'vitest';
import { render, screen } from '~/commons/utils/test-utils';
import { oceanHouse, peninsulaCottage } from '~/properties/mocks/data';
import {
  oceanHouse1,
  peninsulaCottage1,
  peninsulaCottage2,
} from '../mocks/data';
import { BookingGrid } from './booking-grid';

describe('BookingGrid tests', () => {
  it('should properly show the booking grid', async () => {
    const bookings = [
      { booking: oceanHouse1, property: oceanHouse },
      { booking: peninsulaCottage1, property: peninsulaCottage },
      { booking: peninsulaCottage2, property: peninsulaCottage },
    ];

    render(<BookingGrid bookings={bookings} />);
    const grid = await screen.findByTestId('booking-grid');
    expect(grid).toBeDefined();

    const cards = await screen.findAllByTestId('booking-card');

    expect(cards).toHaveLength(bookings.length);

    for (const card of cards) {
      expect(grid.contains(card)).toBeTruthy();
    }
  });
});
