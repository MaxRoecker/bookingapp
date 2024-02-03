import { describe, expect, it } from 'vitest';
import { render, screen } from '~/commons/utils/test-utils';
import { peninsulaCottage } from '../mocks/data';
import { PropertyThumbnail } from './property-thumbnail';

describe('PropertyThumbnail tests', () => {
  it('should properly show the thumbnail as an image', async () => {
    render(<PropertyThumbnail property={peninsulaCottage} />);
    const element =
      await screen.findByTestId<HTMLImageElement>('property-thumbnail');
    expect(element).toBeDefined();
    expect(element).toBeInstanceOf(HTMLImageElement);
    expect(element.src).toBe('https://picsum.photos/id/49/800/600');
  });
});
