import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { parsePrice } from '../utils/helpers.js';

export class ProductDetailPage extends BasePage {
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly variantDropdown: Locator;

  constructor(page: Page) {
    super(page);
    // Exclude brand logo in header, target product name heading
    this.productTitle = page.locator('h1:not(#logo)').first();
    this.productPrice = page.locator('h2#product-price, .price').first();
    this.addToCartButton = page.locator('#add, input[value="Add to Cart"], button[name="add"]').first();
    this.variantDropdown = page.locator('#product-select, #product-select-option-0').first();
  }

  async openByHandle(handle: string): Promise<void> {
    await this.goto(`/products/${handle}`);
    await this.waitForPageLoaded();
  }

  async getTitle(): Promise<string> {
    const text = await this.productTitle.textContent();
    return text ? text.trim() : '';
  }

  async getPrice(): Promise<number> {
    const raw = await this.productPrice.textContent();
    return raw ? parsePrice(raw) : 0;
  }

  async selectVariantIfAvailable(index: number = 0): Promise<void> {
    if (await this.variantDropdown.isVisible()) {
      await this.variantDropdown.selectOption({ index });
    }
  }

  /**
   * Adds product to cart and waits for Shopify cart network synchronization
   */
  async addToCart(): Promise<void> {
    await this.addToCartButton.scrollIntoViewIfNeeded();

    const [response] = await Promise.all([
      this.page.waitForResponse(res => res.url().includes('/cart/add'), { timeout: 10_000 }),
      this.addToCartButton.click()
    ]);

    if (response.status() !== 200) {
      throw new Error(`Failed to add item to cart. HTTP status: ${response.status()}`);
    }

    // Brief settling delay for theme drawer DOM updates
    await this.page.waitForTimeout(600);
  }
}
