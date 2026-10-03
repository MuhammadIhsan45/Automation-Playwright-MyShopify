import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class CatalogPage extends BasePage {
  readonly pageHeading: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('h1, h2').first();
    this.productCards = page.locator('#product-loop a, a[id^="product-"]');
  }

  async open(): Promise<void> {
    await this.goto('/collections/all');
    await this.waitForPageLoaded();
  }

  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  async openProductByTitle(title: string): Promise<void> {
    const product = this.page.locator(`a[id^="product-"]:has-text("${title}"), #product-loop a:has-text("${title}")`).first();
    await product.scrollIntoViewIfNeeded();
    await product.click();
    await this.page.waitForURL('**/products/**');
  }

  async openProductByIndex(index: number = 0): Promise<void> {
    const product = this.productCards.nth(index);
    await product.scrollIntoViewIfNeeded();
    await product.click();
    await this.page.waitForURL('**/products/**');
  }
}
