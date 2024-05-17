import {expect, test} from '@playwright/test';

test.use({
    launchOptions: {
        slowMo: 300
    }
})

test('overlay', async ({page}) => {
    await page.setContent(`
    <div style="position: absolute; top: 0; left: 0; width: 100px; height: 100px; background: red;">
    <div style="position: absolute; top: 10; left: 10; width: 100px; height: 100px; background: green;">
    `)
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(1).click();
    await page.locator('div').nth(2).click();
});
