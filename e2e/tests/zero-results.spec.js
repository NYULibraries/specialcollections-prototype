import { expect, test } from '@playwright/test';

const SEARCH_INPUT = 'input[name="q"]';
const SEARCH_BUTTON = { name: /search/i };

const searchFor = async (page, term) => {
  await page.locator(SEARCH_INPUT).fill(term);
  await page.getByRole('button', SEARCH_BUTTON).click();
};

test.describe('Zero search results', () => {
  test.describe.configure({ mode: 'serial' });

  test('provides helpful feedback on improving my search', async ({ page }) => {
    await page.goto('/');

    await searchFor(page, 'foobar');

    await expect(page.locator('span.filter-value')).toContainText('foobar');

    const content = page.locator('section#content');
    await expect(content).toContainText('Sorry, no results matched your search.');
    await expect(content).toContainText('Consider searching with different terms');
    await expect(content).toContainText('NYU clubs');
    await expect(content).toContainText('NYU society');
    await expect(content).toContainText('New York University clubs');
    await expect(content).toContainText('Double check spelling.');
    await expect(content).toContainText(
      'Consider using the facets on the left to browse for related terms.'
    );
  });

  test('links to search all materials within collection launches faceted search', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Level' }).click();
    await page
      .locator('div.blacklight-format_sim')
      .getByRole('link', { name: 'Archival Collection', exact: true })
      .click();

    await expect(page.locator('span.filter-format_sim span.filter-value')).toHaveText(
      'Archival Collection'
    );

    await page.getByRole('button', { name: 'Collection' }).click();
    await page
      .locator('div.blacklight-collection_sim')
      .getByRole('link', { name: 'Mark Bloch Postal Art Network (PAN) Archive', exact: true })
      .click();

    await page.locator('a.search_within[href*="Mark+Bloch+Postal+Art+Network"]').first().click();

    await expect(page.locator('span.filter-format_sim')).toHaveCount(0);
    await expect(page.locator('div.blacklight-collection_sim')).toContainText(
      'Mark Bloch Postal Art Network (PAN) Archive'
    );

    const firstDocumentFormat = page
      .locator('article.document-position-1')
      .locator('dl.document-metadata dd.blacklight-format_ssm');
    await expect(firstDocumentFormat).toContainText('Archival Collection');
  });

  test("displays 'No Title' when a document doesn't have a title", async ({ page }) => {
    await page.goto('/');

    await searchFor(page, 'kopit');

    await expect(page.locator('span.filter-value')).toContainText('kopit');

    await expect(page.locator('article.document-position-1')).toContainText('No Title');
  });
});
