import { ROLES, ROUTES, SELECTORS } from './catalog-data.js';

import { expect } from '@playwright/test';

/**
 * @param {import('@playwright/test').Page} page
 */
export async function openHomepage(page) {
  await page.goto(ROUTES.HOME);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} query
 */
export async function submitSearch(page, query) {
  await page.locator('input[name="q"]').fill(query);
  await page.getByRole('button', { name: /search/i }).click();
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} query
 */
export async function searchFromHome(page, query) {
  await openHomepage(page);
  await submitSearch(page, query);
}

/**
 * @typedef {Object} FacetSelection
 * @property {string} heading
 * @property {string} field
 * @property {string | RegExp} value
 * @property {boolean} [exact]
 */

/**
 * @param {import('@playwright/test').Page} page
 * @param {FacetSelection} options
 */
export async function applyFacet(page, { heading, field, value, exact = true }) {
  await page.getByRole('button', { name: heading }).click();
  const facetList = page.locator(`div.blacklight-${field}`);

  await facetList.getByRole(ROLES.LINK, { name: value, exact }).click();
}

/**
 * @typedef {Object} FacetExpectation
 * @property {string} field
 * @property {string | RegExp} value
 */

/**
 * @param {import('@playwright/test').Page} page
 * @param {FacetExpectation} expectation
 */
export async function expectActiveFacetValue(page, { field, value }) {
  const facetLocator = page.locator(`span.filter-${field} span.filter-value`);

  await expect(facetLocator).toHaveText(value);
}

/**
 * @param {import('@playwright/test').Page} page
 * @returns {import('@playwright/test').Locator}
 */
export function firstResultCard(page) {
  return page.locator(SELECTORS.RESULT_CARD);
}
