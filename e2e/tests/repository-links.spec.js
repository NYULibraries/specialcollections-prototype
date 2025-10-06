import { expect, test } from '@playwright/test';

const BROOKLYN_HISTORY_DESCRIPTION =
  "The Center for Brooklyn History collects, preserves, and provides access to the most expansive collection of Brooklyn history and life in the world. The combined collections that comprise the new Center for Brooklyn History's holdings include over 250,000 photographs, 37,000 books, 1,800 archival collections, 2,500 maps and atlases, 5,700 artifacts, 300 paintings, 1,400 oral history interviews, and more. The collections foster new and cutting-edge scholarship, support public learning and research, and enrich CBH's exhibitions, educational activities, and public programming.";

const FALES_DESCRIPTION =
  'The Fales Library & Special Collections, comprising 350,000 volumes of book and print items, over 11,000 linear feet of archive and manuscript materials, and about 90,000 audiovisual elements, houses the Fales Collection of rare books and manuscripts in English and American literature, the Downtown Collection, the Food and Cookery Collection, the Riot Grrrl Collection, and the general Special Collections of the NYU Libraries.';

const RISM_DESCRIPTION =
  'The RISM Research Collections and Archives have been transferred to the New York University Archives.';

const TAMIMENT_DESCRIPTION =
  'The Tamiment Library and Robert F. Wagner Labor Archives collects material in all formats documenting the history of labor, the Left, political radicalism, and social movements in the United States, with particular strengths in communism, anarchism, and socialism. It is also the repository for the Archives of Irish America and the Abraham Lincoln Brigade Archives.';

const UNIVERSITY_ARCHIVES_DESCRIPTION =
  "The New York University Archives serves as the final repository for the historical records of NYU. Its primary purpose is to document the history of the University and to provide source material for administrators, faculty, students, alumni, and other members of the University community, as well as scholars, authors, and other interested persons who seek to evaluate the impact of the University's activities on the history of American social, cultural, and intellectual development.";

test.describe('Stable repository links', () => {
  test('Fales homepage displays informational text and link', async ({ page }) => {
    await page.goto('/fales');

    await expect(page.locator('div#facet-repository_sim')).toContainText(
      'The Fales Library & Special Collections'
    );

    const content = page.locator('section#content');
    await expect(content).toContainText(FALES_DESCRIPTION);
    await expect(content.getByRole('link', { name: 'Website' })).toHaveAttribute(
      'href',
      'https://library.nyu.edu/locations/special-collections-center/'
    );
    await expect(content.locator('article.document').first()).toBeVisible();
  });

  test('Tamiment homepage displays informational text and link', async ({ page }) => {
    await page.goto('/tamiment');

    await expect(page.locator('div#facet-repository_sim')).toContainText(
      'Tamiment Library & Wagner Labor Archives'
    );

    const content = page.locator('section#content');
    await expect(content).toContainText(TAMIMENT_DESCRIPTION);
    await expect(content.getByRole('link', { name: 'Website' })).toHaveAttribute(
      'href',
      'https://library.nyu.edu/locations/special-collections-center/'
    );
    await expect(content.locator('article.document').first()).toBeVisible();
  });

  test('University Archives homepage displays informational text and link', async ({ page }) => {
    await page.goto('/universityarchives');

    const content = page.locator('section#content');
    await expect(content).toContainText(UNIVERSITY_ARCHIVES_DESCRIPTION);
    await expect(content.getByRole('link', { name: 'Website' })).toHaveAttribute(
      'href',
      'https://library.nyu.edu/locations/special-collections-center/'
    );
  });

  test('The New York Historical homepage displays informational text and link', async ({
    page,
  }) => {
    await page.goto('/nyhistory');

    await expect(
      page.locator('section#content').getByRole('link', { name: 'Website' })
    ).toHaveAttribute('href', 'https://www.nyhistory.org/library');
  });

  test('Center for Brooklyn History homepage displays informational text and link', async ({
    page,
  }) => {
    await page.goto('/brooklynhistory');

    const content = page.locator('section#content');
    await expect(content).toContainText(BROOKLYN_HISTORY_DESCRIPTION);
    await expect(content.getByRole('link', { name: 'Website' })).toHaveAttribute(
      'href',
      'https://www.bklynlibrary.org/center-for-brooklyn-history'
    );
  });

  test('Poly Archives homepage displays informational text and link', async ({ page }) => {
    await page.goto('/poly');

    await expect(
      page.locator('section#content').getByRole('link', { name: 'Website' })
    ).toHaveAttribute(
      'href',
      'https://library.nyu.edu/locations/poly-archives-special-collections/'
    );
  });

  test('RISM homepage displays informational text and link', async ({ page }) => {
    await page.goto('/rism');

    const content = page.locator('section#content');
    await expect(content).toContainText(RISM_DESCRIPTION);
    await expect(content.getByRole('link', { name: 'Website' })).toHaveAttribute(
      'href',
      'https://library.nyu.edu/locations/special-collections-center/'
    );
  });
});
