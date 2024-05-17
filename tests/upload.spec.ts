import {expect, test} from '@playwright/test';

test('send a file', async ({ page }) => {
    await page.goto(`http://localhost:3000`, { timeout: 30000 });
    
    const status = await page.evaluate(async () => {
      const url = '/upload';
      const fileName = 'file.txt';
      const fileContent = 'file content';
      const formData = new FormData();
      const newFile = new File([fileContent], fileName);
      formData.append('file', newFile, fileName);
      
      const response = await window
        .fetch(url, {
          method: 'POST',
          credentials: 'include',
          body: formData,
        })
        .then(async response => {
          if (response.status < 200 || response.status > 299) {
            const error = `Error calling POST ${url}: ${response.status}`;
            console.error(error);
            throw new Error(error);
          }
  
          return response.text().then(text => {
            const json = text ? JSON.parse(text) : text;
            return { status: response.status, body: json };
          });
        });
      return response.status;
    });
    expect(status).toBe(200);
  });
  