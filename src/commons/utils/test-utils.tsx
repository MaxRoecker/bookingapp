import type { FC, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SWRConfig } from 'swr';
import messages from '~/commons/assets/intl-en.json';

export type WrapperOptions = {
  router?: { route: string; path: string };
};

export type WrapperProps = { children: ReactNode };

export function getWrapper(options?: WrapperOptions): FC<WrapperProps> {
  const { route = '/', path = '/' } = options?.router ?? {};
  return function Providers({ children }): ReactNode {
    return (
      // Resets the SWR cache between test cases
      <SWRConfig value={{ provider: () => new Map() }}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <MemoryRouter initialEntries={[path]}>
            <Routes>
              <Route path={route} element={children} />
            </Routes>
          </MemoryRouter>
        </IntlProvider>
      </SWRConfig>
    );
  };
}

function customRender(...args: Parameters<typeof render>) {
  const [ui, options] = args;
  const wrapper = options?.wrapper ?? getWrapper();
  return render(ui, { wrapper, ...options });
}

// eslint-disable-next-line import/export, react-refresh/only-export-components
export * from '@testing-library/react';

export { default as userEvent } from '@testing-library/user-event';

// override render export
// eslint-disable-next-line import/export
export { customRender as render };
