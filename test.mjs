import { chromium } from "@playwright/test";

const context = await chromium.launchPersistentContext('/tmp/playwright', {headless: false});
const page = await context.newPage();

await page.goto("https://playwright.dev");


await new Promise(f => setTimeout(f, 10000));

console.log('pages: ', context.pages().length);

await context.close();

