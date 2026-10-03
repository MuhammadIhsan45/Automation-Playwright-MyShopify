import { test, expect } from '../../src/fixtures/test.fixture.js';
import { TEST_PRODUCTS } from '../../src/data/testData.js';

test.describe('Functional: Product Details & Variant Validation', () => {
  test('Product detail page displays accurate price and description', async ({
    productDetailPage,
    page
  }) => {
    const item = TEST_PRODUCTS.noirJacket;
    await productDetailPage.openByHandle(item.handle);

    await expect(page).toHaveURL(new RegExp(item.handle));
    const title = await productDetailPage.getTitle();
    expect(title.toLowerCase()).toContain('noir jacket');

    const price = await productDetailPage.getPrice();
    expect(price).toBe(item.priceNumeric);
  });

  test('Adding item updates cart badge count without page redirect', async ({
    productDetailPage,
    page
  }) => {
    await productDetailPage.openByHandle(TEST_PRODUCTS.stripedTop.handle);

    const initialBadge = await productDetailPage.headerNav.getCartCount();
    await productDetailPage.addToCart();

    // Remain on the same product page
    await expect(page).toHaveURL(/striped-top/);

    const updatedBadge = await productDetailPage.headerNav.getCartCount();
    expect(updatedBadge).toBe(initialBadge + 1);
  });
});
