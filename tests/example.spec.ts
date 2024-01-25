import { expect, test } from '@playwright/test';

test.describe('Canvas to blob result type check', async () => {
  test('Canvas to blob result type check @screen-all', async ({ page }) => {
    const imageType = await page.evaluate(async () => {
      const canvas = document.createElement('canvas');

      canvas.width = 100;
      canvas.height = 100;

      const getImageType = () =>
        new Promise((resolve) => {
          canvas.toBlob((ret) => {
            resolve(ret?.type);
          }, 'image/jpeg');
        });

      return await getImageType();
    });

    expect(imageType).toEqual('image/jpeg');
  });
});