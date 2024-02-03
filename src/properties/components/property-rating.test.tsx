import { describe, expect, it } from 'vitest';
import { render, screen } from '~/commons/utils/test-utils';
import { peninsulaCottage } from '../mocks/data';
import { PropertyRating } from './property-rating';

describe('PropertyRating tests', () => {
  it('should properly show the property rating', async () => {
    render(<PropertyRating property={peninsulaCottage} />);
    const element = await screen.findByTestId('property-rating');
    expect(element).toBeDefined();
    expect(element.textContent?.trim()).toBe('5.00');
  });
});
