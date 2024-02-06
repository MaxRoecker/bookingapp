# BookingApp

A simple booking app made with React, Typescript, Vite, and TailwindCSS.
Tested with Vitest and Playwright.

## Development

Use the `npm` package manager to install dependencies. Make sure you are using
the latest stable version of Node.js (v20.11).

```bash
npm install
```

### Testing and linting

You can use the `test` script to run all the tests.

```bash
npm run test
```

You can use the `e2e` script to run all available E2E tests with Playwright.

```bash
npm run e2e
```

You can lint your code with the `lint` script, only `typecheck` the code with
the `types` script, or check the formatting with the `format` script.

```bash
npm run lint
npm run types
npm run format
```

### Structure

Inside the `src/` directory, you will find the following files:

- `app.tsx`: the root component.
- `index.css`: the CSS entry point for TailwindCSS;
- `main.tsx`: the main entry-point of the application;
- `vite-env.d.ts`: typing definition for environment variables;

This project follows a "domain" structuring, i.e., all the directories inside
the `src/`, apart from the `e2e`, group resources and code related to a
"domain". Currently, there are two business domains: `bookings` and
`properties`. There is also the `commons` domain, which is used to group
resources and code that can be used anywhere in the application.

Inside a domain directory, there are other directories: `components`, `hooks`, `assets`, `mocks`, and `pages`, which are self-explanatory in their contents.

Tests are placed right next to the code they are testing. If there is a
component file `component.tsx`, its test should be placed in the same directory
as `component.test.tsx`.

### Mocking

All the data required in network requests can be mocked. We use
[MSW](https://mswjs.io/) to mock the HTTP requests/responses. You can see
examples of mocking inside the `[domain]/mock/http-handlers.ts`.

All the client-side network requests are made using the
[SWR](https://swr.vercel.app/) hooks to efficiently use available resources, prevent duplication of requests, and utilize the cache.

### Routing

We use [React Router v6](https://reactrouter.com/en/main) as the routing
library. All the routes are defined in `app.tsx`. All the pages are defined in
the `[domain]/pages` directory.

### Data model

The `property` domain, in the context of this application, models a physical
real estate property that can receive bookings from users. A property has a
name, a description, a thumbnail image, a rating, and a price per night.

The `booking` domain models the abstract reservation of a property within a
time interval. A booking is associated with a property and has a starting date
and an ending date. The value of the booking is calculated by multiplying the
number of nights between the starting and ending dates by the price per night
of the associated property. Bookings are exclusive to properties; the same
property cannot receive two different overlapping bookings.

Additionally, a property has an integer value called `offsetDays` that is
required, usually by the property host, for cleaning between bookings. If there
is a booking within a set of days, a number of `offsetDays` before and after
are unavailable for booking.
