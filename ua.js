const { webkit } = require('@playwright/test');
 
(async () => {
  // Launch the Webkit browser
  const browser = await webkit.launch();
 
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
  });
  
  // Create a new page in the browser context and navigate to target URL
  const page = await context.newPage();
  await page.goto('https://httpbin.io/user-agent');    
  
  // Get the entire page content
  const pageContent = await page.content();
  console.log(pageContent);
 
  // Close the browser
  await browser.close();
})();
