import { chromium, webkit, firefox  } from "@playwright/test";

(async () => {
  const browser = await firefox.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('request', request => {
    console.log('on request start', request.url());
  });
  // Route handler
  await page.route('**/*', async (route) => {
    console.log('on route start', route.request().url());
    const response = await route.fetch();
    console.log('on response start', response.url());
    await route.fulfill({response});
  });

  await page.goto('https://hmaker.github.io/selenium-detector/');
  await page.waitForTimeout(1000);

  await browser.close();
})();