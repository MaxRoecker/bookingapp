import { IntlProvider } from 'react-intl';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Bookings } from '~/bookings/pages/bookings';
import messages from '~/commons/assets/intl-en.json';
import { Index } from '~/commons/pages/index';
import { Properties } from '~/properties/pages/properties';
import { Property } from '~/properties/pages/property';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    children: [
      {
        index: true,
        element: <Properties />,
      },
      {
        path: 'properties/:propertyId',
        element: <Property />,
      },
      {
        path: 'bookings',
        element: <Bookings />,
      },
    ],
  },
]);

function App() {
  return (
    <IntlProvider messages={messages} locale="en" defaultLocale="en">
      <RouterProvider router={router}></RouterProvider>
    </IntlProvider>
  );
}

export default App;
