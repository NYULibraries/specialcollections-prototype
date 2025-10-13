import { expect, test } from '@playwright/test';
import {
  FACET_FIELDS,
  FACET_HEADINGS,
  FACET_VALUES,
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

test.describe('Collection facets', () => {
  test.describe.configure({ mode: 'serial' });

  test('limiting search by a collection facet shows results', async ({ page }) => {
    await openHomepage(page);

    await applyFacet(page, {
      heading: FACET_HEADINGS.COLLECTION,
      field: FACET_FIELDS.COLLECTION,
      value: FACET_VALUES.ALFRED_C_BEROL_COLLECTION,
    });

    await expectActiveFacetValue(page, {
      field: FACET_FIELDS.COLLECTION,
      value: FACET_VALUES.ALFRED_C_BEROL_COLLECTION,
    });

    const firstResult = firstResultCard(page);
    await expect(firstResult).toBeVisible();
  });

  test('filtering search results by a collection facet shows results', async ({ page }) => {
    await searchFromHome(page, SEARCH_TERMS.BEROL);

    await expect(page.locator(SELECTORS.ACTIVE_FILTER_VALUE)).toContainText(
      new RegExp(SEARCH_TERMS.BEROL, 'i')
    );

    await applyFacet(page, {
      heading: FACET_HEADINGS.COLLECTION,
      field: FACET_FIELDS.COLLECTION,
      value: FACET_VALUES.ALFRED_C_BEROL_COLLECTION,
    });

    await expectActiveFacetValue(page, {
      field: FACET_FIELDS.COLLECTION,
      value: FACET_VALUES.ALFRED_C_BEROL_COLLECTION,
    });

    const firstResult = firstResultCard(page);
    await expect(firstResult).toBeVisible();
  });
});
