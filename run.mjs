// @ts-check
import http from 'http';
import playwright from 'playwright';
const root = await startLocalServer();

const browser = await playwright.chromium.launch({headless: false});

const context = await browser.newContext();
const page = await context.newPage();

async function handler(response) {
  console.log('on response start', response.url());
  // console.log('on response status text:', response.statusText());
  // console.log('on response headers:', await response.headersArray());
  console.log('on response text:', await response.text()); // <<-- this triggers a remote fetch, regardless. Does not happen when commented out.
  // console.log('on response headers2:', await response.headersArray()); // Same as before
  // console.log('on response finish');
}
page.on('response', response => {
  handler(response).then(() => console.log('handler completed...'), e => console.log('handler crashed:', e));
});

await page.route('**', async route => {
  const request = route.request();
  const url = request.url();

  if (url === `${root}/main`) {
    console.log('Root (remote) response:');
    const response = await route.fetch();
    return await route.fulfill({ response });
  }

  console.log('Fail (mock) response:', [url], request.method());
  return route.fulfill({
    status: 400,
    contentType: 'text/plain',
    body: 'Not Found! (mocked)',
  });
});

await page.goto(`${root}/main`);

await page.waitForLoadState('networkidle');

console.log('Closing page');
await new Promise(resolve => setTimeout(resolve, 1000));
await browser.close();

async function startLocalServer() {
  const PORT = 3022;
  const HOST = 'localhost';

  // Serve local website
  const server = http.createServer((req, res) => {
    console.log('----->>>  server hit:', req.method, req.url);

    if (req.url === '/main') {
      res.statusCode = 200;
      res.setHeader('x-custom', 'stuff');
      res.setHeader('Content-Type', 'text/html');
      res.end('<body>main response <script src="/fail"></script>');
      return;
    }

    res.statusCode = 404; // Can return any status code here, doesn't matter really
    res.setHeader('Content-Type', 'text/html'); // Content type doesn't appear to matter either
    res.setHeader('x-custom', 'stuff');
    res.end('This response text should not be fetched and/or displayed'); // At least this doesn't show up?
  });

  await new Promise(resolve => {
    server.listen(PORT, HOST, () => {
      resolve(undefined);
    });
  });

  return `http://${HOST}:${PORT}`;
}