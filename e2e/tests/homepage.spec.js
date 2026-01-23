import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
  test('displays the welcome message', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('main')).toContainText('What Are Special Collections?');
  });
});
