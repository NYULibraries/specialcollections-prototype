import { expect, test } from '@playwright/test';

test.describe('Breadcrumbs', () => {
  test('landing page links to NYU Libraries and the Library Catalog', async ({ page }) => {
    await page.goto('/');

    const breadcrumb = page.locator('ol.breadcrumb');
    await expect(breadcrumb.getByRole('link', { name: 'NYU Libraries' })).toHaveAttribute(
      'href',
      'https://library.nyu.edu'
    );
    await expect(breadcrumb.getByRole('link', { name: 'Library Catalog' })).toHaveAttribute(
      'href',
      'http://bobcat.library.nyu.edu/nyu'
    );
    await expect(breadcrumb).toContainText('Archival Collections');
  });

  test('brief results page links to Archival Collections and appends Search', async ({ page }) => {
    await page.goto('/');

    await page.locator('input[name="q"]').fill('foo');
    await page.getByRole('button', { name: /search/i }).click();
    await expect(page).toHaveURL(/q=foo/i);

    const breadcrumb = page.locator('ol.breadcrumb');
    await expect(breadcrumb.getByRole('link', { name: 'NYU Libraries' })).toHaveAttribute(
      'href',
      'https://library.nyu.edu'
    );
    await expect(breadcrumb.getByRole('link', { name: 'Library Catalog' })).toHaveAttribute(
      'href',
      'http://bobcat.library.nyu.edu/nyu'
    );
    await expect(breadcrumb.getByRole('link', { name: 'Archival Collections' })).toHaveAttribute(
      'href',
      '/'
    );
    await expect(breadcrumb).toContainText('Search');
  });

  test('repository page breadcrumb includes repository link', async ({ page }) => {
    await page.goto('/fales');

    const breadcrumb = page.locator('ol.breadcrumb');
    await expect(breadcrumb.getByRole('link', { name: 'NYU Libraries' })).toHaveAttribute(
      'href',
      'https://library.nyu.edu'
    );
    await expect(breadcrumb.getByRole('link', { name: 'Library Catalog' })).toHaveAttribute(
      'href',
      'http://bobcat.library.nyu.edu/nyu'
    );
    await expect(breadcrumb.getByRole('link', { name: 'Archival Collections' })).toHaveAttribute(
      'href',
      '/'
    );
    await expect(
      breadcrumb.getByRole('link', { name: 'The Fales Library & Special Collections' })
    ).toHaveAttribute('href', '/fales');
    await expect(breadcrumb).toContainText('Search');
  });
});
