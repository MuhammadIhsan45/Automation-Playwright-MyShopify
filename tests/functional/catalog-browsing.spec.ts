import { test, expect } from '../../src/fixtures/test.fixture.js';

test.describe('Functional: Catalog & Collection Browsing', () => {
  test('Catalog should display all active store products with clickable cards', async ({
    catalogPage,
    page
  }) => {
    await catalogPage.open();

    const count = await catalogPage.getProductCount();
    expect(count).toBeGreaterThanOrEqual(7);

    // Verify navigating to first item
    await catalogPage.openProductByIndex(0);
    await expect(page).toHaveURL(/\/products\//);
  });

  test('Homepage should show featured items banner section', async ({
    homePage
  }) => {
    await homePage.open();
    const featuredCount = await homePage.getFeaturedProductCount();
    expect(featuredCount).toBeGreaterThanOrEqual(3);

    const titles = await homePage.getFeaturedProductTitles();
    expect(titles.length).toBeGreaterThan(0);
  });
});
