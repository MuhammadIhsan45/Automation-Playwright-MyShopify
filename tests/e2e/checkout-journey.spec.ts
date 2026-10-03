import { test, expect } from '../../src/fixtures/test.fixture.js';
import { TEST_PRODUCTS } from '../../src/data/testData.js';

test.describe('E2E: Customer Purchase Journey', () => {
  test('Complete flow: Browse Catalog -> Select Product -> Add to Cart -> Verify Cart & Checkout', async ({
    homePage,
    catalogPage,
    productDetailPage,
    cartPage,
    page
  }) => {
    // 1. Visit homepage
    await homePage.open();
    await expect(page).toHaveTitle(/Sauce Demo/i);

    // 2. Navigate to Catalog
    await homePage.headerNav.navigateToCatalog();
    const productCount = await catalogPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    // 3. Open target product details
    const targetProduct = TEST_PRODUCTS.greyJacket;
    await catalogPage.openProductByTitle(targetProduct.name);

    // 4. Validate product pricing & detail presence
    const title = await productDetailPage.getTitle();
    expect(title).toContain(targetProduct.name);

    const price = await productDetailPage.getPrice();
    expect(price).toBe(targetProduct.priceNumeric);

    // 5. Add to Cart
    const initialCartCount = await productDetailPage.headerNav.getCartCount();
    await productDetailPage.addToCart();

    // Verify cart badge updated
    const updatedCartCount = await productDetailPage.headerNav.getCartCount();
    expect(updatedCartCount).toBeGreaterThan(initialCartCount);

    // 6. View Cart Page
    await productDetailPage.headerNav.navigateToCart();
    const hasItem = await cartPage.hasProduct(targetProduct.name);
    expect(hasItem).toBeTruthy();

    // 7. Verify Checkout button is ready and actionable
    const checkoutReady = await cartPage.isCheckoutButtonVisible();
    expect(checkoutReady).toBeTruthy();
  });
});
