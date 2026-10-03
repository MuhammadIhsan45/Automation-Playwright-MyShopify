import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { CatalogPage } from '../pages/CatalogPage.js';
import { ProductDetailPage } from '../pages/ProductDetailPage.js';
import { CartPage } from '../pages/CartPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { SearchPage } from '../pages/SearchPage.js';

interface AutomationFixtures {
  homePage: HomePage;
  catalogPage: CatalogPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  loginPage: LoginPage;
  searchPage: SearchPage;
}

/**
 * Custom test fixture extending base Playwright test with pre-instantiated Page Objects.
 * Promotes DRY principle and eliminates boilerplate instantiations across spec files.
 */
export const test = base.extend<AutomationFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },

  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  }
});

export { expect };
