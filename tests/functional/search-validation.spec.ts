import { test, expect } from '../../src/fixtures/test.fixture.js';
import { SEARCH_SCENARIOS } from '../../src/data/testData.js';

test.describe('Functional: Store Search Mechanism', () => {
  test('Search with keyword "jacket" yields relevant items', async ({
    searchPage
  }) => {
    const scenario = SEARCH_SCENARIOS[0];
    await searchPage.open();
    await searchPage.search(scenario.keyword);

    const count = await searchPage.getResultCount();
    expect(count).toBeGreaterThanOrEqual(scenario.expectedMinResults);

    const match = await searchPage.hasResultWithText('jacket');
    expect(match).toBeTruthy();
  });

  test('Search with non-existent keyword yields 0 results gracefully', async ({
    searchPage
  }) => {
    const scenario = SEARCH_SCENARIOS[2];
    await searchPage.open();
    await searchPage.search(scenario.keyword);

    const count = await searchPage.getResultCount();
    expect(count).toBe(0);
  });
});
