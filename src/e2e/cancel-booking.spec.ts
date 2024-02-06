import { expect, test } from '@playwright/test';

test('go to bookings page to cancel a book', async ({ page }) => {
  await page.goto('./');

  await page.getByTestId('nav-bookings').click();
  await page.getByLabel('Go to next page').click();

  const cancelBtn = page.getByRole('button', { name: 'Cancel Booking' });
  await expect(cancelBtn).toBeVisible();
  await cancelBtn.click();

  await expect(page.getByTestId('booking-delete-dialog')).toBeVisible();
  await page.getByTestId('booking-delete-dialog-confirm').click();

  await expect(page.getByTestId('toast')).toBeVisible();

  await expect(page.getByTestId('toast-title')).toContainText('Success');
});
