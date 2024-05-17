import { chromium, devices, expect, test } from '@playwright/test';

const browser = await chromium.launch({
  logger: {
    isEnabled: name => name === 'api',
    log: (name, severity, message) => console.log(message)
  }
});

const context = await browser.newContext();
const page = await context.newPage();
await page.goto('https://playwright.dev/');
await page.getByRole('link', { name: 'Docs' }).click();
await page.getByRole('link', { name: 'How to install Playwright' }).click();
await browser.close();