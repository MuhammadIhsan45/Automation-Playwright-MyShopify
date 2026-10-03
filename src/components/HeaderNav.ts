import { Page, Locator } from '@playwright/test';

export class HeaderNav {
  readonly page: Page;
  readonly logo: Locator;
  readonly catalogLink: Locator;
  readonly searchLink: Locator;
  readonly loginLink: Locator;
  readonly registerLink: Locator;
  readonly cartCounterDesktop: Locator;
  readonly cartCounterMobile: Locator;
  readonly mobileMenuToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('#logo a, h1#logo');
    this.catalogLink = page.locator('nav a[href="/collections/all"]').first();
    this.searchLink = page.locator('nav a[href="/search"]').first();
    this.loginLink = page.locator('#customer_login_link, a[href="/account/login"]').first();
    this.registerLink = page.locator('#customer_register_link, a[href="/account/register"]').first();
    this.cartCounterDesktop = page.locator('#cart-target-desktop');
    this.cartCounterMobile = page.locator('#cart-target-mobile');
    this.mobileMenuToggle = page.locator('#toggle-menu');
  }

  async getCartCount(): Promise<number> {
    const isMobile = await this.cartCounterMobile.isVisible().catch(() => false);
    const counter = isMobile ? this.cartCounterMobile : this.cartCounterDesktop;
    const raw = await counter.textContent().catch(() => '0');
    if (!raw) return 0;
    const match = raw.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  private async openMobileMenuIfActive(): Promise<void> {
    if (await this.mobileMenuToggle.isVisible().catch(() => false)) {
      await this.mobileMenuToggle.click();
      await this.page.waitForTimeout(300);
    }
  }

  async navigateToCatalog(): Promise<void> {
    await this.openMobileMenuIfActive();
    await this.catalogLink.click();
    await this.page.waitForURL('**/collections/**');
  }

  async navigateToSearch(): Promise<void> {
    await this.searchLink.click();
    await this.page.waitForURL('**/search');
  }

  async navigateToLogin(): Promise<void> {
    await this.openMobileMenuIfActive();
    await this.loginLink.click();
    await this.page.waitForURL('**/account/login');
  }

  async navigateToCart(): Promise<void> {
    await this.page.goto('/cart');
    await this.page.waitForURL('**/cart');
  }
}
