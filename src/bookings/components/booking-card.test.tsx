import { describe, expect, it } from 'vitest';
import { render, screen } from '~/commons/utils/test-utils';
import { peninsulaCottage } from '~/properties/mocks/data';
import { peninsulaCottage1 } from '../mocks/data';
import { BookingCard } from './booking-card';

describe('BookingCard tests', () => {
  it('should properly show the booking card', async () => {
    render(
      <BookingCard booking={peninsulaCottage1} property={peninsulaCottage} />,
    );
    const card = await screen.findByTestId('booking-card');
    expect(card).toBeDefined();

    const title = await screen.findByTestId('booking-card-title');
    expect(card.contains(title)).toBeTruthy();
    expect(title.textContent?.trim()).toBe('Peninsula Cottage');
    expect(title.firstChild).toBeInstanceOf(HTMLAnchorElement);

    const thumbnail = await screen.findByTestId('property-thumbnail');
    expect(card.contains(thumbnail)).toBeTruthy();

    const value = await screen.findByTestId('booking-value');
    expect(card.contains(value)).toBeTruthy();

    const valueExt = await screen.findByTestId('booking-value-extended');
    expect(card.contains(valueExt)).toBeTruthy();

    const deleteButtons = await screen.findAllByTestId('booking-delete-button');
    expect(deleteButtons.some((btn) => card.contains(btn))).toBeTruthy();
  });
});
