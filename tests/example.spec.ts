import { test, expect } from '@playwright/test';

test.use({
  headless: false,
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
});

test("test", async ({page}) => {;
  await page.route('**/*', async route => {
    route.continue();
    const headers = await route.request().allHeaders();
    console.log(headers);
  });
  const reqPromise = page.waitForRequest('https://www.bing.com/');
  await page.goto('https://www.bing.com/');
  const req = await reqPromise;
  const headers = await req.allHeaders();
  // console.log(headers);

  const respHeaders = await (await req.response())!.allHeaders();
  console.log(respHeaders);

  // await new Promise(() => {});
});
