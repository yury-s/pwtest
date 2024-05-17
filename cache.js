// @ts-check
const playwright = require('playwright');

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const host = `http://${hostname}:${port}/`;

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
  } else if (req.url === '/api/static-content/v1/tags/ubuntu') {
    console.log('api request', JSON.stringify(req.headers, null, 2));
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('cache-control', 'public, max-age=360000');
    res.end('Api response\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at ${host}`);
});


(async () => {
    const browser = await playwright.firefox.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Route everything to disable the cache (this doesn't work)
    // "Enabling routing disables http cache." per https://playwright.dev/docs/api/class-page#page-route
    await page.route('**/*', route => route.continue());

    page.on('response', response => console.log('response', response.url(), response.status()));

    // Go to the homepage
    await page.goto(host);

    // Set a fast timeout, as we're expecting timeouts for this issue reproduction
    page.setDefaultTimeout(1500);

    for (let i = 0; i < 5; i++) {
        const [resp] = await Promise.all([
            page.waitForResponse(resp => {
                // Look for the API request we're about to make
                if (!resp.url().includes('/api/static-content/v1/tags/ubuntu')) return;

                // Log the response we got, including the status that Playwright sees
                console.log(i, 'playwright', resp.status());

                // We want to wait for a successful response
                return resp.ok();
            }).catch(e => {
                // Log a timeout but don't crash
                console.log(i, e.message);
            }),
            // Make the API request and log the status that the browser sees
            page.evaluate('fetch("/api/static-content/v1/tags/ubuntu").then(resp => resp.status)').then(status => console.log(i, 'browser', status)),
        ]);
        if (resp.status() !== 200) {
            throw new Error('Unexpected status' + resp.status());
        }
    }

    console.log('Done');

    // Allow some time for final logs to flush before closing
    await new Promise(res => setTimeout(res, 500));
    await browser.close();

    server.close();
})();