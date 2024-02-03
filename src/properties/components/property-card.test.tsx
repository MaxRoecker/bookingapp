import { describe, expect, it } from 'vitest';
import { render, screen } from '~/commons/utils/test-utils';
import { peninsulaCottage } from '../mocks/data';
import { PropertyCard } from './property-card';

describe('PropertyCard tests', () => {
  it('should properly show the property card', async () => {
    render(<PropertyCard property={peninsulaCottage} />);
    const card = await screen.findByTestId('property-card');
    expect(card).toBeDefined();

    const title = await screen.findByTestId('property-card-title');
    expect(title.textContent?.trim()).toBe('Peninsula Cottage');
    expect(card.contains(title)).toBeTruthy();

    const description = await screen.findByTestId('property-card-description');
    expect(description.textContent?.trim()).toBe(
      `Relax in this unique and peaceful place. A huge plot of land surrounded by water, excellent for walks, picnics, reading in a hammock and connecting with nature. Nearby you will find waterfalls, restaurants, boat trips, kayaking, pedal boats and a path suitable for cycling.`,
    );
    expect(card.contains(description)).toBeTruthy();

    const thumbnail = await screen.findByTestId('property-thumbnail');
    expect(card.contains(thumbnail)).toBeTruthy();

    const value = await screen.findByTestId('property-value');
    expect(card.contains(value)).toBeTruthy();
  });
});
