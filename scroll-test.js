const playwright = require('playwright-core');
(async() => {
    const browser = await playwright.chromium.launch({
        // channel: 'msedge',
        headless: false,
        ignoreDefaultArgs: ['--hide-scrollbars']
    });
    const context = await browser.newContext({ viewport: null });
    const page = await context.newPage();
    // page.on('domcontentloaded', async(p) => {
    //     const screenshotAction = 'screenshotAction';
    //     await page.exposeFunction(screenshotAction, async() => {
    //         await page.screenshot({ path: `scroll-bug-screenshot.png`, fullPage: true });
    //     });
    //     await page.evaluate(`(() => {
    //         const screenshotButton = document.querySelector('#screenshot');
    //         screenshotButton.addEventListener('click', async()=> {
    //             await window.${screenshotAction}();
    //         });
    //     })()`);
    // });
    await page.goto('file:///home/yurys/sandbox/pwtest/page.html');
    await page.screenshot({ path: `scroll-bug-screenshot.png` });
    await browser.close();
})();
