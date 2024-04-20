// import { test, expect } from '@playwright/test';

// const email = 'testmanduu2@gmail.com';
// const password = '123456'

// test('LoginToCompleteOnboard', async ({ page }) => {
    
//     await page.goto('https://newpwa.manduu.app/account/login');
//     await page.getByPlaceholder('Username Or Email *').fill(email);
//     await page.getByPlaceholder('Password *').fill(password);
//     await page.getByRole('button', { name: 'Log In' }).click();
//     // await page.goto('https://newpwa.manduu.app/app/client/onboarding');
//     // await page.getByRole('button', { name: 'First Appointment' }).click();
//     // await page.getByRole('button', { name: 'Continue' }).click();
//     // await page.goto('https://newpwa.manduu.app/app/client/onboarding');
    
//     await signContract(page)
//     await addCard(page)
    
    
    
//        });
// async function addCard(page:any) {
//     await page.getByRole('button', { name: 'Add Card' }).click();
    
//     await page.getByTitle('Add Your Card').locator('input[type="text"]').fill('TESTER CARD');
    
//     await page.locator('#cc-number').first().fill('6456 4564 56456');
    
//     await page.locator('#cc-exp-date').fill('06 / 2026');
    
//     await page.locator('#cc-number').nth(1).fill('546');
//     await page.getByRole('button', { name: 'Authorize' }).click();

// }

//        async function signContract(page:any){
//         await page.getByRole('button', { name: 'Sign Contract' }).click();
//     await page.locator('div').filter({ hasText: /^Fit 8 Plan \(Manduu Oklahoma\)$/ }).click();
//     await page.getByRole('button', { name: 'Continue' }).click();
//     await page.getByTitle('Sign Contract').locator('canvas').click({
//       position: {
//         x: 109,
//         y: 56
//       }
//     });
//     await page.getByTitle('Sign Contract').locator('canvas').click({
//       position: {
//         x: 152,
//         y: 54
//       }
//     });
//     await draw(page);

//     await page.getByRole('button', { name: 'Sign Here' }).first().click();
//     await page.getByRole('button', { name: 'Sign Here' }).nth(1).click();
//     await page.getByRole('button', { name: 'Sign Here' }).nth(2).click();
//     await page.getByRole('button', { name: 'Sign Here' }).nth(3).click();
//     await page.getByRole('button', { name: 'Sign Here' }).nth(4).click();
//     await page.getByRole('button', { name: ' Sign' }).click();
//     await page.getByRole('button', { name: 'Complete Onboarding' }).click();
//     await page.goto('https://newpwa.manduu.app/app/client/dashboard');



//        }

//        async function draw(page:any) {
//         // Locate the canvas element by its title attribute
// const canvas = await page.getByTitle('Sign Contract').locator('canvas');

// // Get the bounding box of the canvas element
// const canvasBox = await canvas.boundingBox();

// // Calculate the start and end points for drawing the line
// const startX = canvasBox.x + 10; // Adjust these values as needed
// const startY = canvasBox.y + 10; // Adjust these values as needed
// const endX = canvasBox.x + canvasBox.width - 10; // Adjust these values as needed
// const endY = canvasBox.y + canvasBox.height - 10; // Adjust these values as needed

// // Press down the mouse button at the starting point within the canvas
// await canvas.move({ x: startX, y: startY });
// await canvas.down();

// // Move the mouse to the ending point within the canvas while holding down the mouse button to draw the line
// await canvas.move({ x: endX, y: endY });

// // Release the mouse button to stop drawing the line
// await canvas.up();

//        }