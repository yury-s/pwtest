import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({
    headless: false,
    env: {
      PWDEBUG: '1',
    }
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://example.com');
  await page.waitForTimeout(10000);
  // await browser.close();
})();
