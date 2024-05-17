import { chromium, devices, expect, test, errors } from '@playwright/test';
import { link } from 'fs';


(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://playwright.dev/');
  const allUrls = new Set();
  await visitAllLinks(page, allUrls);
  console.log('All urls: ', [...allUrls].join('\n  '));
  await browser.close();
})();

async function visitAllLinks(page, visited) {
  const url = page.url();
  console.log('visiting:', url);
  if (visited.has(url)) return;
  visited.add(url);
  if (visited.size > 100) {
    console.log('  visited enough urls, stopping');
    return;
  }
  if (!url.startsWith('https://playwright.dev')) {
    console.log('skipping external url:', url);
    return;
  }
  const links = page.locator('a');
  const count = await links.count();
  for (let i = 0; i < count; i++) {
    console.log('link:', await links.nth(i).textContent());
    if (!await links.nth(i).isVisible()) {
      console.log('  link is not visible, skipping');
      continue;
    }
    try {
      await links.nth(i).click({ timeout: 1000 });
    } catch(e) {
      if (e instanceof errors.TimeoutError) {
        console.log('  click timedout');
        continue;
      }
      throw e;
    }
    if (!visited.has(page.url())) {
      visitAllLinks(page, visited);
      await page.goBack();
    }
  }
}

