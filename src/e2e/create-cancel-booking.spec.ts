import { expect, test } from '@playwright/test';

test('go to a property, make a reservation and cancel it', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Sierra Cabin 4.95 $450.00' }).click();
  await page.getByTestId('booking-create-form-input-date').click();
  await expect(page.getByTestId('calendar')).toBeVisible();
  await page.getByLabel('Go to next month').click();

  // Selects a date range between April 16-23 and make a reservation
  await page.getByLabel('April').getByText('16').click();
  await page.getByLabel('April').getByText('23', { exact: true }).click();
  await page.getByTestId('booking-create-form-input-date').click();
  await page.getByTestId('booking-create-form-button-submit').click();
  await expect(page.getByTestId('toast')).toBeVisible();
  await expect(page.getByTestId('toast-title')).toContainText('Success');

  // Cancel the booking on property page
  await expect(page.getByTestId('booking-item').locator('div')).toBeVisible();
  await expect(page.getByTestId('booking-item-description')).toContainText(
    'April 16 – 23, 2024$3,150.00 ($450.00 × 7 nights)',
  );
  await page.getByTestId('booking-delete-button').click();
  await expect(page.getByTestId('booking-delete-dialog')).toBeVisible();
  await page.getByTestId('booking-delete-dialog-confirm').click();
  await expect(page.getByTestId('toast')).toBeVisible();
  await expect(page.getByTestId('toast-title')).toContainText('Success');

  // Check that there are no bookings for the property
  await expect(page.getByRole('main')).toContainText(
    'There are no upcoming bookings for this property in your records.',
  );
});
