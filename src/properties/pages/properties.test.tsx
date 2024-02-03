import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { render, screen, waitFor } from '~/commons/utils/test-utils';
import { listProperties } from '../mocks/http-handlers';
import { Properties } from './properties';

const server = setupServer();
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Properties page tests', () => {
  it('should properly render the bookings page', async () => {
    const mockedHandler = vi.fn().mockImplementation(listProperties);
    server.use(
      http.get(
        `${import.meta.env.VITE_ROOT_URL}/api/properties`,
        mockedHandler,
      ),
    );
    render(<Properties />);

    await waitFor(() => expect(mockedHandler).toHaveBeenCalledTimes(1));

    const cards = await screen.findAllByTestId('property-card');
    expect(cards.length).toBe(5);
  });

  it('should properly render the error message', async () => {
    const mockedHandler = vi.fn().mockImplementation(() => {
      return HttpResponse.error();
    });
    server.use(
      http.get(
        `${import.meta.env.VITE_ROOT_URL}/api/properties`,
        mockedHandler,
      ),
    );
    render(<Properties />);

    await waitFor(() => expect(mockedHandler).toHaveBeenCalledTimes(1));

    const message = await screen.findAllByTestId('error-message');
    expect(message).toBeDefined();
  });
});
