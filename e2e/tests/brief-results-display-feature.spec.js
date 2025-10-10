import {
  FACET_FIELDS,
  FACET_HEADINGS,
  FACET_VALUES,
  LABELS,
  ROLES,
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

test.describe('Brief Results Display Feature', () => {
  // Keep this suite serial because tests rely on side effects (e.g., loaded fixtures).
  // Serial preserves setup order to prevent later failures when earlier steps abort.
  test.describe.configure({ mode: 'serial' });

  test('displays appropriate fields at the collection level', async ({ page }) => {
    await searchFromHome(page, SEARCH_TERMS.BLOCH);
    await expect(page.locator(SELECTORS.ACTIVE_FILTER_VALUE)).toContainText(
      new RegExp(SEARCH_TERMS.BLOCH, 'i')
    );

    await applyFacet(page, {
      heading: FACET_HEADINGS.LEVEL,
      field: FACET_FIELDS.FORMAT,
      value: FACET_VALUES.ARCHIVAL_COLLECTION,
    });
    await expectActiveFacetValue(page, {
      field: FACET_FIELDS.FORMAT,
      value: new RegExp(FACET_VALUES.ARCHIVAL_COLLECTION, 'i'),
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

    const resultCard = firstResultCard(page);
    await expect(resultCard).toBeVisible();

    const metadata = resultCard.locator(SELECTORS.RESULT_METADATA);

    await expect(page.locator(SELECTORS.RESULT_METADATA_FORMAT)).toContainText(
      FACET_VALUES.ARCHIVAL_COLLECTION
    );
    await expect(metadata.locator('dd.blacklight-unitdate_ssm')).toContainText(
      'Inclusive, 1978-2009'
    );
    await expect(metadata.locator('dd.blacklight-abstract_ssm')).toContainText(
      'Mark Bloch (born 1956) is an American artist and writer who uses visuals and text to explore ideas of long-distance communication.'
    );
    await expect(metadata.locator('dd.blacklight-repository_ssi')).toContainText(
      'The Fales Library & Special Collections'
    );
    await expect(metadata.locator('dd.blacklight-unitid_ssm')).toContainText('MSS.170');

    const abstractText = await metadata.locator('dd.blacklight-abstract_ssm').innerText();
    expect(abstractText.replace(/\s+/g, ' ').trim().length).toBeLessThanOrEqual(450);
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
      value: new RegExp(FACET_VALUES.ARCHIVAL_COLLECTION, 'i'),
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

    await page
      .getByRole(ROLES.LINK, { name: 'Search all archival materials within this collection' })
      .click();

    await expect(page.locator(SELECTORS.FILTER_FORMAT_SECTION)).toHaveCount(0);
    await expect(page.locator(SELECTORS.FILTER_COLLECTION_SECTION)).toContainText(
      FACET_VALUES.MARK_BLOCH_ARCHIVE
    );
    await expect(page.locator(SELECTORS.RESULT_METADATA_FORMAT)).toContainText(
      FACET_VALUES.ARCHIVAL_COLLECTION
    );
  });

  test("displays 'No Title' when a document doesn't have a title", async ({ page }) => {
    await searchFromHome(page, SEARCH_TERMS.KOPIT);

    await expect(page.locator(SELECTORS.ACTIVE_FILTER_VALUE)).toContainText(
      new RegExp(SEARCH_TERMS.KOPIT, 'i')
    );
    await expect(page.locator(SELECTORS.RESULT_CARD)).toContainText(LABELS.NO_TITLE);
  });
});
