import { expect, test } from '@playwright/test';
import { SEARCH_TERMS, SELECTORS } from './support/catalog-data.js';
import { searchFromHome } from './support/catalog-interactions.js';

test.describe('Zero search results', () => {
  test.describe.configure({ mode: 'serial' });

  test('provides helpful feedback on improving my search', async ({ page }) => {
    await searchFromHome(page, SEARCH_TERMS.FOOBAR);

    await expect(page.locator(SELECTORS.ACTIVE_FILTER_VALUE)).toContainText(SEARCH_TERMS.FOOBAR);

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
});
