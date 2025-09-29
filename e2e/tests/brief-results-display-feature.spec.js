import { expect, test } from '@playwright/test';

test.describe('Brief Results Display Feature', () => {
  test.describe.configure({ mode: 'serial' });

  test('displays appropriate fields at the collection level', async ({ page }) => {

    await page.goto('/');
    await page.locator('input[name="q"]').fill('bloch');

    await page.getByRole('button', { name: /search/i }).click();
    await expect(page.locator('span.filter-value')).toContainText(/bloch/i);

  await page.getByRole('button', { name: 'Level' }).click();
  await page.locator('div.blacklight-format_sim').getByRole('link', { name: 'Archival Collection', exact: true }).click();

    await expect(page.locator('span.filter-format_sim span.filter-value')).toHaveText(/Archival Collection/i);

    await page.getByRole('button', { name: 'Collection' }).click();
    await page
      .locator('div.blacklight-collection_sim')
      .getByRole('link', { name: 'Mark Bloch Postal Art Network (PAN) Archive', exact: true })
      .click();

    await expect(page.locator('span.filter-collection_sim span.filter-value')).toHaveText('Mark Bloch Postal Art Network (PAN) Archive');

    const resultCard = page.locator('article.document-position-1');
    await expect(resultCard).toBeVisible();

    const metadata = resultCard.locator('dl.document-metadata');

    await expect(metadata.locator('dd.blacklight-format_ssm')).toContainText('Archival Collection');
    await expect(metadata.locator('dd.blacklight-unitdate_ssm')).toContainText('Inclusive, 1978-2009');
    await expect(metadata.locator('dd.blacklight-abstract_ssm')).toContainText(
      'Mark Bloch (born 1956) is an American artist and writer who uses visuals and text to explore ideas of long-distance communication.',
    );
    await expect(metadata.locator('dd.blacklight-repository_ssi')).toContainText('The Fales Library & Special Collections');
    await expect(metadata.locator('dd.blacklight-unitid_ssm')).toContainText('MSS.170');

    const abstractText = await metadata.locator('dd.blacklight-abstract_ssm').innerText();
    expect(abstractText.replace(/\s+/g, ' ').trim().length).toBeLessThanOrEqual(450);
  });

  test('links to search all materials within collection launches faceted search', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Level' }).click();
    await page.locator('div.blacklight-format_sim').getByRole('link', { name: 'Archival Collection', exact: true }).click();

    await expect(page.locator('span.filter-format_sim span.filter-value')).toHaveText(/Archival Collection/i);

    await page.getByRole('button', { name: 'Collection' }).click();
    await page
      .locator('div.blacklight-collection_sim')
      .getByRole('link', { name: 'Mark Bloch Postal Art Network (PAN) Archive', exact: true })
      .click();

    await expect(page.locator('span.filter-collection_sim span.filter-value')).toHaveText('Mark Bloch Postal Art Network (PAN) Archive');

    await page.getByRole('link', { name: 'Search all archival materials within this collection' }).click();

  await expect(page.locator('span.filter-format_sim')).toHaveCount(0);
    await expect(page.locator('div.blacklight-collection_sim')).toContainText('Mark Bloch Postal Art Network (PAN) Archive');
    await expect(page.locator('article.document-position-1 dl.document-metadata dd.blacklight-format_ssm')).toContainText('Archival Collection');
  });

  test("displays 'No Title' when a document doesn't have a title", async ({ page }) => {
    await page.goto('/');
    await page.locator('input[name="q"]').fill('kopit');

    await page.getByRole('button', { name: /search/i }).click();

    await expect(page.locator('span.filter-value')).toContainText(/kopit/i);
    await expect(page.locator('article.document-position-1')).toContainText('No Title');
  });
});
