/**
 * Utility helpers for test assertions, data formatting, and DOM parsing.
 */

export function parsePrice(priceText: string): number {
  // Handles values like "£55.00", "55.00", "$40.00"
  const cleaned = priceText.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function generateRandomEmail(prefix: string = 'qa.test'): string {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 10000);
  return `${prefix}.${timestamp}.${randomSuffix}@example.com`;
}
