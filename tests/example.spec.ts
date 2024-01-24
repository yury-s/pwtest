import { test, expect } from '@playwright/test';


test("Check printing test.step", async ({page}) => {;
  test.step("Step 0", async () => {
    //...
  });
  await test.step("Step 1", async () => {
      //...
  });
  await test.step("Step 2", async () => {
      //...
  });
  await test.step("Step 3", async () => {
      //...
  });
});


test("2 Check printing test.step", async ({page}) => {;
  await test.step("Step 1", async () => {
      //...
      await test.step("Step 1", async () => {
        //...
      });
  });
  await test.step("Step 2", async () => {
      //...
  });
  await test.step("Step 3", async () => {
      //...
  });
});
