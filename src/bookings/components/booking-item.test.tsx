import { describe, expect, it } from 'vitest';
import { render, screen } from '~/commons/utils/test-utils';
import { peninsulaCottage } from '~/properties/mocks/data';
import { peninsulaCottage1 } from '../mocks/data';
import { BookingItem } from './booking-item';

describe('BookingItem tests', () => {
  it('should properly show the booking item', async () => {
    render(
      <BookingItem booking={peninsulaCottage1} property={peninsulaCottage} />,
    );
    const item = await screen.findByTestId('booking-item');
    expect(item).toBeDefined();

    const description = await screen.findByTestId('booking-item-description');
    expect(item.contains(description)).toBeTruthy();

    const value = await screen.findByTestId('booking-value');
    expect(item.contains(value)).toBeTruthy();

    const valueExt = await screen.findByTestId('booking-value-extended');
    expect(item.contains(valueExt)).toBeTruthy();

    const deleteButton = await screen.findByTestId('booking-delete-button');
    expect(item.contains(deleteButton)).toBeTruthy();
  });
});
