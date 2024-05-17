import { test, expect } from '@playwright/test';

test("context wait for response", async ({ page, context }) => {
  await page.goto("https://playwright.dev");
  
});