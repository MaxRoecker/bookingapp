import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './index.css';

async function setupWorkerMockServer() {
  const { setupWorker } = await import('msw/browser');
  const properties = await import('./properties/mocks/http-handlers');
  const bookings = await import('./bookings/mocks/http-handlers');

  const handlers = [...properties.handlers, ...bookings.handlers];

  const worker = setupWorker(...handlers);

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

setupWorkerMockServer()
  .then(() => {
    return createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  })
  .catch((error) => console.error(error));
