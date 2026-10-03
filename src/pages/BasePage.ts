import { Page, expect } from '@playwright/test';
import { HeaderNav } from '../components/HeaderNav.js';

export abstract class BasePage {
  readonly page: Page;
  readonly headerNav: HeaderNav;

  constructor(page: Page) {
    this.page = page;
    this.headerNav = new HeaderNav(page);
  }

  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async waitForPageLoaded(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async verifyUrlContains(substring: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(substring));
  }
}
