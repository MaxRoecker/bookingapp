import { describe, expect, it } from 'vitest';
import { render, screen } from '~/commons/utils/test-utils';
import { peninsulaCottage } from '../mocks/data';
import { PropertyValue } from './property-value';

describe('PropertyValue tests', () => {
  it('should properly show the value of a night in the property', async () => {
    render(<PropertyValue property={peninsulaCottage} />);
    const element = await screen.findByTestId('property-value');
    expect(element).toBeDefined();
    expect(element.textContent).toBe('$540.00');
  });
});
