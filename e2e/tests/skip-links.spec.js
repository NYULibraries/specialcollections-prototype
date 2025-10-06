import { expect, test } from '@playwright/test';

test.describe('Skip links', () => {
  test('homepage exposes skip links for main, search, and facets', async ({ page }) => {
    await page.goto('/');

    const skipNav = page.locator('nav#skip-link');
    const links = skipNav.locator('a');

    await expect(links).toHaveCount(3);

    const hrefs = await links.evaluateAll((anchors) => anchors.map((a) => a.getAttribute('href')));
    expect(hrefs).toEqual(['#main-container', '#search_field', '#facets']);
  });

  test('brief results page adds a fourth skip link for documents', async ({ page }) => {
    await page.goto('/');

    await page.fill('input[name="q"]', 'foo');
    await page.click('button[type="submit"]');

    const skipNav = page.locator('nav#skip-link');
    const links = skipNav.locator('a');

    await expect(links).toHaveCount(4);

    const hrefs = await links.evaluateAll((anchors) => anchors.map((a) => a.getAttribute('href')));
    expect(hrefs).toEqual(['#main-container', '#search_field', '#facets', '#documents']);
  });
});
