import {
  FACET_FIELDS,
  FACET_HEADINGS,
  FACET_VALUES,
  LABELS,
  SEARCH_TERMS,
  SELECTORS,
} from './support/catalog-data.js';
import {
  applyFacet,
  expectActiveFacetValue,
  firstResultCard,
  openHomepage,
  searchFromHome,
} from './support/catalog-interactions.js';
import { expect, test } from '@playwright/test';

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

  test('links to search all materials within collection launches faceted search', async ({
    page,
  }) => {
    await openHomepage(page);

    await applyFacet(page, {
      heading: FACET_HEADINGS.LEVEL,
      field: FACET_FIELDS.FORMAT,
      value: FACET_VALUES.ARCHIVAL_COLLECTION,
    });
    await expectActiveFacetValue(page, {
      field: FACET_FIELDS.FORMAT,
      value: FACET_VALUES.ARCHIVAL_COLLECTION,
    });

    await applyFacet(page, {
      heading: FACET_HEADINGS.COLLECTION,
      field: FACET_FIELDS.COLLECTION,
      value: FACET_VALUES.MARK_BLOCH_ARCHIVE,
    });
    await expectActiveFacetValue(page, {
      field: FACET_FIELDS.COLLECTION,
      value: FACET_VALUES.MARK_BLOCH_ARCHIVE,
    });

    await page.locator('a.search_within[href*="Mark+Bloch+Postal+Art+Network"]').first().click();

    await expect(page.locator(SELECTORS.FILTER_FORMAT_SECTION)).toHaveCount(0);
    await expect(page.locator(SELECTORS.FILTER_COLLECTION_SECTION)).toContainText(
      FACET_VALUES.MARK_BLOCH_ARCHIVE
    );

    const firstDocumentFormat = firstResultCard(page).locator(SELECTORS.RESULT_METADATA_FORMAT);
    await expect(firstDocumentFormat).toContainText('Archival Collection');
  });

  test("displays 'No Title' when a document doesn't have a title", async ({ page }) => {
    await searchFromHome(page, SEARCH_TERMS.KOPIT);

    await expect(page.locator(SELECTORS.ACTIVE_FILTER_VALUE)).toContainText(SEARCH_TERMS.KOPIT);

    await expect(page.locator(SELECTORS.RESULT_CARD)).toContainText(LABELS.NO_TITLE);
  });
});
