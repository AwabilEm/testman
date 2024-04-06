
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Navigate to the sign-up page
    await page.goto('https://app.manduu.work/account/stafflogin');
});


test('Adminlog', async ({ page }) => {
   await page.getByPlaceholder('User name or email *').fill(process.env.OLDADUSERNAME!);
    //  const inputField = await page.getByPlaceholder('User name or email *');
    //  await inputField.fill(process.env.OLDADUSERNAME!);
   
    await page.getByPlaceholder('Password *').fill(process.env.OLDADPASSWORD!);
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('link', { name: ' Client Sessions' }).click();

 

});


// await page.goto('https://app.manduu.work/account/stafflogin');
// await page.getByPlaceholder('User name or email *').click();
// await page.getByPlaceholder('Password *').click();
// await page.getByPlaceholder('Password *').click();
// await page.getByPlaceholder('Password *').fill('Manduu.123!');
// await page.getByPlaceholder('User name or email *').click();
// await page.getByPlaceholder('User name or email *').press('Control+c');
// await page.getByPlaceholder('User name or email *').click();
// await page.getByText('Staff Log in Remember me').click();
// await page.getByText('Remember me Forgot password?').click();
// await page.getByText('Remember me Forgot password?').click();
// await page.getByPlaceholder('User name or email *').click();
// await page.getByPlaceholder('User name or email *').click();
// await page.getByPlaceholder('User name or email *').fill('admin@manduu.work');
// await page.getByRole('button', { name: 'Log in' }).click();
// await page.goto('await page.goto('https://app.manduu.work/');
// await page.goto('https://app.manduu.work/account/login');
// await page.getByRole('link', { name: 'Email activation' }).click();
// await page.getByRole('button', { name: ' Back' }).click();
// await page.getByPlaceholder('User name or email *').click();
// await page.getByPlaceholder('User name or email *').fill('admin@manduu.work');
// await page.getByPlaceholder('Password *').click();
// await page.getByPlaceholder('Password *').click();
// await page.getByPlaceholder('Password *').fill('Manduu.123!');
// await page.getByRole('link', { name: 'Staff Login' }).click();
// await page.goto('https://app.manduu.work/');
// await page.goto('https://app.manduu.work/app/main/dashboard');');
// await page.goto('https://app.manduu.work/app/main/dashboard');
// await page.goto('https://app.manduu.work/app/admin/clients');
// await page.getByRole('link', { name: ' Client Sessions' }).click();
// await page1.getByRole('link', { name: ' Client Sessions' }).click();
// await page1.getByRole('link', { name: ' Client Sessions' }).click();
// await page1.getByRole('link', { name: ' Client Sessions' }).click();
// await page2.goto('https://app.manduu.work/app/main/scheduling/client-sessions');
// await page.getByRole('link', { name: ' Clients' }).click();
// await page.goto('https://app.manduu.work/app/admin/clients');