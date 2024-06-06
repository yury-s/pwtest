import { chromium, expect } from '@playwright/test';

(async () => {
  // Setup
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ ignoreHTTPSErrors: true, userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36","sec-ch-ua":"\"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"" });
  const page = await context.newPage();
  const url = "https://www.eet-china.com/mp/a319436.html";
  const reponse = await page.goto(url, { referer: url, waitUntil: 'load' });
  expect(reponse.status()).toBe(200);
  await context.close();
  await browser.close();
})();
