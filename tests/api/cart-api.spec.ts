import { test, expect } from '@playwright/test';

test.describe('API: Shopify Storefront Cart Endpoints', () => {
  test('GET /cart.js returns valid JSON schema and cart metadata', async ({ request }) => {
    const response = await request.get('/cart.js');
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('token');
    expect(data).toHaveProperty('item_count');
    expect(data).toHaveProperty('items');
    expect(Array.isArray(data.items)).toBeTruthy();
  });

  test('POST /cart/add.js successfully adds line item by variant ID', async ({ request }) => {
    const variantId = '611945025'; // Grey jacket variant ID on demo store
    const response = await request.post('/cart/add.js', {
      form: {
        id: variantId,
        quantity: 1
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    expect(response.status()).toBe(200);
    const item = await response.json();
    expect(item.id.toString()).toBe(variantId);
    expect(item.title).toContain('Grey jacket');
  });
});
