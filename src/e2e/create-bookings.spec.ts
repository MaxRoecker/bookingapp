import { expect, test } from '@playwright/test';

test('create two bookings', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page
    .getByRole('link', { name: 'Tree Nook 5.00 $640.00 night' })
    .click();
  await page.getByTestId('booking-create-form-input-date').click();

  // Try to select an disabled date.
  await page
    .getByLabel('February')
    .getByRole('gridcell', { name: '6', exact: true })
    .first()
    .click();

  // Selects a date range between April 9-16 and make a reservation
  await page.getByLabel('Go to next month').click();
  await page.getByText('9', { exact: true }).nth(1).click();
  await page.getByLabel('April').getByText('16').click();
  await page.getByTestId('booking-create-form-input-date').click();
  await page.getByTestId('booking-create-form-button-submit').click();
  await expect(page.getByTestId('toast')).toBeVisible();
  await expect(page.getByTestId('toast-title')).toContainText('Success');

  // Tries to select a date range between April 2-24, but the calendar don't allow it
  await page.getByTestId('booking-create-form-input-date').click();
  await page.getByLabel('Go to next month').click();
  await page.getByText('2', { exact: true }).nth(2).click();
  await page.getByLabel('April').getByText('24').click();

  // Selects a date range between April 2-3 and make a reservation
  await page.getByText('3', { exact: true }).nth(2).click();
  await page.getByTestId('booking-create-form-input-date').click();
  await page.getByTestId('booking-create-form-button-submit').click();
  await expect(page.getByTestId('toast')).toBeVisible();
  await expect(page.getByTestId('toast-title')).toContainText('Success');

  // Checks the bookings on bookings page
  await page.getByTestId('nav-bookings').click();
  await page.getByLabel('Go to next page').click();
  await expect(page.getByTestId('booking-card').nth(1)).toBeVisible();
  await expect(page.getByTestId('booking-grid')).toContainText(
    'April 2 – 3, 2024$640.00 ($640.00 × 1 night)',
  );
  await expect(page.getByTestId('booking-grid')).toContainText(
    'April 9 – 16, 2024$4,480.00 ($640.00 × 7 nights)',
  );
});
