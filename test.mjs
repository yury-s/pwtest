import { webkit } from '@playwright/test';

(async () => {
  // Setup
  const browser = await webkit.launch({ headless: false });
  const context = await browser.newContext();
  await context.tracing.start({ snapshots: true })
  const page = await context.newPage();
  try {
    await page.goto('https://development-webapp-common-flow-auth.eks.csp.scrum-dev.com/login?role=customer');
    await page.getByTestId('customer-login-email').fill('yen.vo+5@c2c-techhub.io');
    await page.getByTestId('customer-login-password').fill('Aa123456@');
    await page.getByTestId('customer-login-button').click()
    await page.waitForTimeout(5000)
  } finally {
    await context.tracing.stop({ path: 'trace.zip' })
  }
  await context.close();
  await browser.close();
})();
