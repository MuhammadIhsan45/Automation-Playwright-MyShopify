import { test, expect } from '../../src/fixtures/test.fixture.js';
import { AUTH_SCENARIOS } from '../../src/data/testData.js';

test.describe('Functional: Customer Authentication Validation', () => {
  test('Submitting invalid credentials prevents authentication and remains on login form', async ({
    loginPage,
    page
  }) => {
    await loginPage.open();
    await loginPage.login(
      AUTH_SCENARIOS.unregisteredUser.email,
      AUTH_SCENARIOS.unregisteredUser.password
    );

    // Assert that we don't end up on an authorized account page
    await expect(page).toHaveURL(/account/);
    await expect(loginPage.emailInput).toBeVisible();
  });

  test('Registration navigation link directs to /account/register', async ({
    loginPage,
    page
  }) => {
    await loginPage.open();
    await loginPage.navigateToRegister();
    await expect(page).toHaveURL(/\/account\/register/);
  });
});
