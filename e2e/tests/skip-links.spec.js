import { ATTRIBUTES, SEARCH_TERMS } from './support/catalog-data.js';
import { expect, test } from '@playwright/test';
import { openHomepage, searchFromHome } from './support/catalog-interactions.js';

test.describe('Skip links', () => {
  test('homepage exposes skip links for main, search, and facets', async ({ page }) => {
    await openHomepage(page);

    const skipNav = page.locator('nav#skip-link');
    const links = skipNav.locator('a');

    await expect(links).toHaveCount(3);

    const hrefs = await links.evaluateAll(
      (anchors, attribute) => anchors.map((a) => a.getAttribute(attribute)),
      ATTRIBUTES.HREF
    );
    expect(hrefs).toEqual(['#main-container', '#search_field', '#facets']);
  });

  test('brief results page adds a fourth skip link for documents', async ({ page }) => {
    await searchFromHome(page, SEARCH_TERMS.FOO);

    const skipNav = page.locator('nav#skip-link');
    const links = skipNav.locator('a');

    await expect(links).toHaveCount(4);

    const hrefs = await links.evaluateAll(
      (anchors, attribute) => anchors.map((a) => a.getAttribute(attribute)),
      ATTRIBUTES.HREF
    );
    expect(hrefs).toEqual(['#main-container', '#search_field', '#facets', '#documents']);
  });
});
