import { describe, expect, it } from 'vitest';
import { render, screen } from '~/commons/utils/test-utils';
import { propertyById } from '../mocks/data';
import { PropertyGrid } from './property-grid';

describe('PropertyGrid tests', () => {
  it('should properly show the property grid', async () => {
    const properties = Array.from(propertyById.values());

    render(<PropertyGrid properties={properties} />);
    const grid = await screen.findByTestId('property-grid');
    expect(grid).toBeDefined();

    const cards = await screen.findAllByTestId('property-card');
    expect(cards).toHaveLength(properties.length);

    for (const card of cards) {
      expect(grid.contains(card)).toBeTruthy();
      expect(card.parentElement).toBeInstanceOf(HTMLAnchorElement);
    }
  });
});
