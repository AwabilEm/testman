
import { test, expect } from '@playwright/test';

const email = 'testmanduu4@gmail.com';
const password = '123456'
const PhoneNumber = '23364874957';
const fName = 'test';
const lName ='test2'
const selectStu = 'Edmond Oklahoma';

test('AdminDasboard', async ({ page }) => {
    await page.goto('https://admin.manduu.app/account/login');
  await page.getByPlaceholder('Email Address or Phone Number').click();
  await page.getByPlaceholder('Email Address or Phone Number').fill(process.env.NEWADUSERNAME!);
  await page.getByPlaceholder('Password').fill(process.env.NEWADPASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: ' Clients' }).click();
  await page.getByRole('link', { name: ' Client Session' }).click();
  await page.fill('[formcontrolname="selectedDate"]', '17 September, 2024');
  await page.getByText('Select studio').click();
  await page.getByText('Edmond Oklahoma').click();
  // await page.locator('a').filter({ hasText: (fName) && (lName) }).click();
  //const fullName = `${firstName} ${lastName}`;
  await page.locator('a').filter({ hasText: (fName) && (lName) }).click();
  
  await page.getByLabel('Status').selectOption('Executed');
  await page.getByLabel('Personal coach / Trainer').selectOption('307');
  await page.getByLabel('Client memo').fill('testing');
  await page.getByRole('button', { name: 'Save' }).click();
  
  
  });