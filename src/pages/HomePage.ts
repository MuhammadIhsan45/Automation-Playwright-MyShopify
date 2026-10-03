import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  readonly featuredProducts: Locator;
  readonly bannerSection: Locator;

  constructor(page: Page) {
    super(page);
    this.featuredProducts = page.locator('#product-loop a, a[id^="product-"]');
    this.bannerSection = page.locator('#logo, header');
  }

  async open(): Promise<void> {
    await this.goto('/');
    await this.waitForPageLoaded();
  }

  async getFeaturedProductCount(): Promise<number> {
    return await this.featuredProducts.count();
  }

  async clickFeaturedProduct(index: number = 0): Promise<void> {
    const product = this.featuredProducts.nth(index);
    await product.scrollIntoViewIfNeeded();
    await product.click();
    await this.page.waitForURL('**/products/**');
  }

  async getFeaturedProductTitles(): Promise<string[]> {
    const count = await this.featuredProducts.count();
    const titles: string[] = [];
    for (let i = 0; i < count; i++) {
      const heading = this.featuredProducts.nth(i).locator('h3, .title');
      const text = await heading.textContent();
      if (text) titles.push(text.trim());
    }
    return titles;
  }
}
