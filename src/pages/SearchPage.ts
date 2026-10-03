import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class SearchPage extends BasePage {
  readonly searchInput: Locator;
  readonly searchSubmitButton: Locator;
  readonly resultItems: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('#search-field, input[name="q"]').first();
    this.searchSubmitButton = page.locator('#search-submit, input[type="submit"][value="Search"]').first();
    this.resultItems = page.locator('a[href*="/products/"][href*="_pos="]');
  }

  async open(): Promise<void> {
    await this.goto('/search');
    await this.waitForPageLoaded();
  }

  async search(keyword: string): Promise<void> {
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
    await this.waitForPageLoaded();
  }

  async getResultCount(): Promise<number> {
    return await this.resultItems.count();
  }

  async hasResultWithText(text: string): Promise<boolean> {
    const matching = this.resultItems.filter({ hasText: new RegExp(text, 'i') });
    return (await matching.count()) > 0;
  }
}
