// import { test, expect } from '@playwright/test';
// import { allure } from "allure-playwright";


// const email = 'manduu.test24@gmail.com';
// const password = 'TestUser@1'
// const PhoneNumber = '233544874957';
// const fName = 'test';
// const lName ='test2'
// const selectStu = 'Edmond Oklahoma';
  
// test('AdminDasboard', async ({ page }) => {
// //     await page.goto('https://admin.manduu.app/account/login');
// //   await page.click('Email Address or Phone Number')
// //   await page.getByPlaceholder('Email Address or Phone Number').fill(process.env.NEWADUSERNAME!);
// //   await page.getByPlaceholder('Password').fill(process.env.NEWADPASSWORD!);
// //   await page.getByRole('button', { name: 'Login' }).click();
// await page.goto('https://admin.manduu.app/app/main/dashboard');
//   await page.getByRole('link', { name: 'Session Calendar' }).click();
//   await page.getByRole('link', { name: ' Client Session' }).click();
//   await page.fill('[formcontrolname="selectedDate"]', '17 September, 2024');
//   await page.getByText('Select studio').click();
//   await page.getByText('Edmond Oklahoma').click();
//   // await page.locator('a').filter({ hasText: (fName) && (lName) }).click();
//   //const fullName = `${firstName} ${lastName}`;
//   await page.locator('a').filter({ hasText: (fName) && (lName) }).click();
  
//   await page.getByLabel('Status').selectOption('Executed');
//   await page.getByLabel('Personal coach / Trainer').selectOption('307');
//   await page.getByLabel('Client memo').fill('testing');
//   await page.getByRole('button', { name: 'Save' }).click();
//   await page.waitForTimeout(2000);
//   await allure.attachment("basic-page-screen", await page.screenshot(), {
//     contentType: "image/png",
//   });
  
  
//   });

  
