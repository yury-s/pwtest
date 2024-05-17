import { test, expect, type Page } from '@playwright/test';

test.use({
  locale: 'de-DE',
  timezoneId: 'Europe/Berlin',
});

test('test', async ({ page }) => {
  await page.goto('https://www.adidas.com', { timeout: 45000 });
});