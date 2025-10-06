import { expect, test } from '@playwright/test';

test.describe('Collection facets', () => {
  test.describe.configure({ mode: 'serial' });

  test('limiting search by a collection facet shows results', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Collection' }).click();
    await page
      .locator('div.blacklight-collection_sim')
      .getByRole('link', { name: 'Alfred C. Berol Collection of Lewis Carroll', exact: true })
      .click();

    await expect(page.locator('span.filter-collection_sim span.filter-value')).toHaveText(
      'Alfred C. Berol Collection of Lewis Carroll'
    );

    const firstResult = page.locator('article.document-position-1');
    await expect(firstResult).toBeVisible();
  });

  test('filtering search results by a collection facet shows results', async ({ page }) => {
    await page.goto('/');

    await page.locator('input[name="q"]').fill('berol');
    await page.getByRole('button', { name: /search/i }).click();

    await expect(page.locator('span.filter-value')).toContainText(/berol/i);

    await page.getByRole('button', { name: 'Collection' }).click();
    await page
      .locator('div.blacklight-collection_sim')
      .getByRole('link', { name: 'Alfred C. Berol Collection of Lewis Carroll', exact: true })
      .click();

    await expect(page.locator('span.filter-collection_sim span.filter-value')).toHaveText(
      'Alfred C. Berol Collection of Lewis Carroll'
    );

    const firstResult = page.locator('article.document-position-1');
    await expect(firstResult).toBeVisible();
  });
});
