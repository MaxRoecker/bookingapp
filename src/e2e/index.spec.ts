import { expect, test } from '@playwright/test';

test('has the app title', async ({ page }) => {
  await page.goto('./');

  await expect(page).toHaveTitle(/BookingApp/);
});

test('has the properties navigation anchor', async ({ page }) => {
  await page.goto('./');

  const anchor = page.getByTestId('nav-properties');

  expect(anchor.first()).toBeVisible();

  await anchor.click();

  await expect(page).toHaveURL('./');
});

test('has the bookings navigation anchor', async ({ page }) => {
  await page.goto('./');

  const anchor = page.getByTestId('nav-bookings');

  expect(anchor.first()).toBeVisible();

  await anchor.click();

  await expect(page).toHaveURL('./bookings');
});
