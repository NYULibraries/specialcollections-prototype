import {
  ATTRIBUTES,
  EXTERNAL_LINKS,
  LABELS,
  ROLES,
  ROUTES,
  SEARCH_TERMS,
} from './support/catalog-data.js';
import { expect, test } from '@playwright/test';
import { openHomepage, searchFromHome } from './support/catalog-interactions.js';

test.describe('Breadcrumbs', () => {
  test('landing page links to NYU Libraries and the Library Catalog', async ({ page }) => {
    await openHomepage(page);

    const breadcrumb = page.locator('ol.breadcrumb');
    await expect(breadcrumb.getByRole(ROLES.LINK, { name: LABELS.NYU_LIBRARIES })).toHaveAttribute(
      ATTRIBUTES.HREF,
      EXTERNAL_LINKS.NYU_LIBRARIES
    );
    await expect(
      breadcrumb.getByRole(ROLES.LINK, { name: LABELS.LIBRARY_CATALOG })
    ).toHaveAttribute(ATTRIBUTES.HREF, EXTERNAL_LINKS.LIBRARY_CATALOG);
    await expect(breadcrumb).toContainText(LABELS.ARCHIVAL_COLLECTIONS);
  });

  test('brief results page links to Archival Collections and appends Search', async ({ page }) => {
    await searchFromHome(page, SEARCH_TERMS.FOO);
    await expect(page).toHaveURL(new RegExp(`q=${SEARCH_TERMS.FOO}`, 'i'));

    const breadcrumb = page.locator('ol.breadcrumb');
    await expect(breadcrumb.getByRole(ROLES.LINK, { name: LABELS.NYU_LIBRARIES })).toHaveAttribute(
      ATTRIBUTES.HREF,
      EXTERNAL_LINKS.NYU_LIBRARIES
    );
    await expect(
      breadcrumb.getByRole(ROLES.LINK, { name: LABELS.LIBRARY_CATALOG })
    ).toHaveAttribute(ATTRIBUTES.HREF, EXTERNAL_LINKS.LIBRARY_CATALOG);
    await expect(
      breadcrumb.getByRole(ROLES.LINK, { name: LABELS.ARCHIVAL_COLLECTIONS })
    ).toHaveAttribute(ATTRIBUTES.HREF, ROUTES.HOME);
    await expect(breadcrumb).toContainText('Search');
  });

  test('repository page breadcrumb includes repository link', async ({ page }) => {
    await page.goto(ROUTES.FALES);

    const breadcrumb = page.locator('ol.breadcrumb');
    await expect(breadcrumb.getByRole(ROLES.LINK, { name: LABELS.NYU_LIBRARIES })).toHaveAttribute(
      ATTRIBUTES.HREF,
      EXTERNAL_LINKS.NYU_LIBRARIES
    );
    await expect(
      breadcrumb.getByRole(ROLES.LINK, { name: LABELS.LIBRARY_CATALOG })
    ).toHaveAttribute(ATTRIBUTES.HREF, EXTERNAL_LINKS.LIBRARY_CATALOG);
    await expect(
      breadcrumb.getByRole(ROLES.LINK, { name: LABELS.ARCHIVAL_COLLECTIONS })
    ).toHaveAttribute(ATTRIBUTES.HREF, ROUTES.HOME);
    await expect(breadcrumb.getByRole(ROLES.LINK, { name: LABELS.FALES_LIBRARY })).toHaveAttribute(
      ATTRIBUTES.HREF,
      ROUTES.FALES
    );
    await expect(breadcrumb).toContainText('Search');
  });
});
