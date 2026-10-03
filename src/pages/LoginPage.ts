import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  readonly loginForm: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorNotification: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    super(page);
    this.loginForm = page.locator('form#customer_login');
    this.emailInput = page.locator('#customer_email');
    this.passwordInput = page.locator('#customer_password');
    this.submitButton = page.locator('form#customer_login input[type="submit"]');
    this.errorNotification = page.locator('.errors, .error_message, form#customer_login ul');
    this.registerLink = page.locator('a[href*="/account/register"]');
  }

  async open(): Promise<void> {
    await this.goto('/account/login');
    await this.waitForPageLoaded();
  }

  async login(email: string, pass: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.submitButton.click();
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorNotification.isVisible();
  }

  async navigateToRegister(): Promise<void> {
    // Finds visible register link (mobile or desktop)
    const count = await this.registerLink.count();
    for (let i = 0; i < count; i++) {
      const link = this.registerLink.nth(i);
      if (await link.isVisible().catch(() => false)) {
        await link.click();
        await this.page.waitForURL('**/account/register');
        return;
      }
    }
    // Fallback direct navigation
    await this.goto('/account/register');
  }
}
