import { expect, test } from '@playwright/test';

const EXPECTED_FACET_ORDER = [
  'Library',
  'Digital Content',
  'Creator',
  'Date Range',
  'Subject',
  'Name',
  'Place',
  'Language',
  'Collection',
  'Level',
];

test.describe('Facets', () => {
  test('displays facets in a specific order', async ({ page }) => {
    await page.goto('/');

    const facetButtons = page.locator('#facet-panel-collapse .facet-field-heading button');

    await expect(facetButtons).toHaveCount(EXPECTED_FACET_ORDER.length);

    const actualOrder = await facetButtons.allTextContents();
    const normalizedOrder = actualOrder.map((text) => text.replace(/\s+/g, ' ').trim());

    expect(normalizedOrder).toEqual(EXPECTED_FACET_ORDER);
  });
});
