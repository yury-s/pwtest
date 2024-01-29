import { expect, test } from '@playwright/test';
import http from 'http';

const PORT = 3000;
test.beforeAll(async ({ }) => {
  const server = http.createServer(async (req, res) => {
    if (req.url === '/echo') {
      res.writeHead(429, { 'Content-Type': 'text/plain' });
      res.uncork();
      req.socket.destroy();
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello!');
    }
  });  
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
});

test('requestfailed on status 429', async ({ page }) => {
  await new Promise(resolve => setTimeout(resolve, 10000));
  await page.goto(`http://localhost:${PORT}`);
  page.on('requestfailed', request => {
    console.log('requestfailed', request.url());
  });
  page.on('response', request => {
    console.log('response', request.url());
  });
  const responsePromise = page.waitForResponse('**/echo');
  await page.evaluate(async () => {
    const response = await fetch('/echo');
    return await response.text();
  }).catch(e => {});
  const response = await responsePromise;
  expect(response.status()).toBe(429);
});
