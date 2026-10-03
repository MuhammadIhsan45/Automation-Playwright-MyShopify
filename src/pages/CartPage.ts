import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly lineItems: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.getByRole('button', { name: /check\s*out/i }).or(page.locator('input[name="checkout"], #checkout')).first();
    this.lineItems = page.locator('a[href*="/cart/change"], form [action="/cart"] [href*="/products/"]');
    this.emptyCartMessage = page.locator('text=It appears that your cart is currently empty, p.empty:has-text("empty")');
  }

  async open(): Promise<void> {
    await this.goto('/cart');
    await this.waitForPageLoaded();
  }

  async getLineItemCount(): Promise<number> {
    return await this.lineItems.count();
  }

  async hasProduct(productTitle: string): Promise<boolean> {
    const matching = this.page.getByRole('link', { name: new RegExp(productTitle, 'i') });
    return (await matching.count()) > 0;
  }

  async isCheckoutButtonVisible(): Promise<boolean> {
    return await this.checkoutButton.isVisible();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.scrollIntoViewIfNeeded();
    await this.checkoutButton.click();
    await this.page.waitForURL(/checkout|checkouts/);
  }
}
