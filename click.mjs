import { chromium, devices, expect, test } from '@playwright/test';




(async () => {
  const iphone = devices['iPhone 12 Pro'];
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    ...iphone,
    permissions: ['camera', 'microphone'],
  });
  const page = await context.newPage();
  await page.goto('https://yc-h5-test15.hrfax.cn/ccip/sign/#/?query=eyJ3YXRlck5vIjoiMTc2NTQxMDQ0NDM5Njk5NDU2MCIsInNpZ25Ub2tlbiI6ImJlYXJlciBleUpoYkdjaU9pSlNVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKd2FHOXVaU0k2Ym5Wc2JDd2lkWE5sY2w5dVlXMWxJam9pTVRnek1EQXdNREF3TURFaUxDSnlaWE5sZEZCaGMzTlhiM0prSWpwbVlXeHpaU3dpYzJOdmNHVWlPbHNpWVd4c0lsMHNJbk5wYm1kc1pVeHZaMmx1SWpwdWRXeHNMQ0psZUhBaU9qRTNNVEF3TWpreE1UTXNJblI1Y0dVaU9uc2lkbUZzZFdVaU9pSnViMjVsWDNWelpYSWlMQ0owWlhoMElqb2k2WjJlNTdPNzU3dWY1NVNvNW9pM0lpd2ljbTlzWlZSNWNHVWlPaUlpTENKaWRYTnBibVZ6YzFSNWNHVWlPaUlpZlN3aWRYTmxja2xrSWpveE9ETXdNREF3TURBd01Td2lhblJwSWpvaWRDMTFUM1pyT0RablVGZEliWG96TFZSWlZsOHlVemxqUWt4Vklpd2lkWE5sY2tOdlpHVWlPbTUxYkd3c0ltTnNhV1Z1ZEY5cFpDSTZJbU5qYVhBdFpuSnZiblJsYm1RaUxDSjFjMlZ5Ym1GdFpTSTZJakU0TXpBd01EQXdNREF4SW4wLldnTlFKeVJ1dWRBeXRyOUtFSnBxeEJfelpiay1nRVlnTFgyXzU1ZFQxWldCSmw5V3d6RjFyYXNVQnFxcjU3ZmRKUmpneHdWQTZRcEhqTjNoXzlJczBUdUQydU5fMlhHMDA1a3VQblQySDI0WXdSWHhtcm1CczktUmd0dnZ2cHdaQWthcXN1MXljWVo3Ri16djNIUVRUcU1majIzLWxXU3BGZEJWR05iSGZFTEx4VkhEVlFoR0ZsZFpEczlqdGhKVEszNElKSURvblFYUWNWbmFqMkxXLXR1OGRFTEt1TmxnRk9JOVlGR2tORWFjOFZ4aHliU0Z2UXBrYkwxTHBKX3VyREVMR2ttcXNjUmhFblN0YlZFWGxncFdYaEJVSDhBenpfejRyUlZvTlppTFF4aDh4NmdLYklPRGlTRkRIeHRrNjRQNXpXU3d2QzloMmROX0l1SmVrdyIsImJhY2tVcmwiOiJodHRwczovL3ljLWg1LXRlc3QxNS5ocmZheC5jbi9jY2lwLyMvcGFnZXMvaW5kZXgvaW5kZXg%2FdXVpZD0wZjI0NjQ4ZS01MTkyLTQ3YTEtODAzZi02NWE5ODEwZjIxMDQiLCJzdWNjZXNzVXJsIjoiaHR0cHM6Ly95Yy1oNS10ZXN0MTUuaHJmYXguY24vY2NpcC8jL3BhZ2VzL3NlbGZBcHBseS9yZXN1bHQvaW5kZXg%2FcmVzdWx0PXRydWUmc291cmNlPXNpZ25hdHVyZSIsImZhaWxlZFVybCI6Imh0dHBzOi8veWMtaDUtdGVzdDE1LmhyZmF4LmNuL2NjaXAvIy9wYWdlcy9teU9yZGVyUGFnZS9pbmRleD9mbGFnPWhpc3RvcnlPcmRlciZmcm9tPXNpZ24ifQ%3D%3D');
  await page.click("//uni-view[@class='btns-box']");
  await page.waitForTimeout(3000);
  await page.click("//uni-button");
  const canvas = await page.$("#canvas");
  const canvasBox = await canvas?.boundingBox();
  const centerX = canvasBox?.x + canvasBox?.width / 2;
  const centerY = canvasBox?.y + canvasBox?.height / 2;
  await page.mouse.move(centerX, centerY);
  await page.mouse.down();
  await page.mouse.move(centerX, centerY + 150);
  await page.mouse.up();
  // await page.pause();
})();

