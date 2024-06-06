// import { test, expect } from '@playwright/test';

// import { allure } from "allure-playwright";
// //import { currentsReporter } from '@currents/playwright';



// const email = 'manduu.test24@gmail.com';
// const password = 'TestUser@1'
// const PhoneNumber = '233544874957';
// const fName = 'test';
// const lName ='automate'
// const selectStu = 'Edmond Oklahoma';
// const SelectedDate ='09/17/2024'
// let selectedTime: string | null = null;


// let CalendarSelectedDate = convertDate(SelectedDate);
// console.log(CalendarSelectedDate); // Output: "17 September, 2024"


// // Function to convert date format
// function convertDate(date: string): string {
//   const months = [
//     "January", "February", "March", "April", "May", "June", 
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const [month, day, year] = date.split('/').map(part => parseInt(part, 10));
//   return `${day} ${months[month - 1]}, ${year}`;
// }


// test('Executed first appointment', async ({page}) => {
   
//   await page.goto('https://admin.manduu.app/app/main/dashboard');
//   await page.getByRole('link', { name: 'Session Calendar' }).click();
  
//   await page.fill('[formcontrolname="selectedDate"]', CalendarSelectedDate);

//  await page.getByRole('button', { name: 'Select studio ' }).click();
//  await page.locator('.dropdown-item').getByText('Edmond Oklahoma').click();


// //  await page.locator('div.fc-event-custom-info:has-text("${selectedTime}")').locator(':has-text("${fname} ${lname}")').click();
// // //  await page.locator('div.fc-event-custom-info:has-text("07:30 AM - 09:00 AM")').locator(':has-text("${fname} ${lname}")').click();

// await page.locator(`div.fc-event-custom-info:has-text("${selectedTime}")`).locator(`:has-text("${fName} ${lName}")`).click();


// await page.locator('app-dropdown[placeholder="Type"] .p-dropdown-trigger').click();
// await page.locator('.p-dropdown-item:has-text("First Appointment")').click();

// // Click on the dropdown trigger associated with the placeholder "Status"Select the 'Executed' option from the opened dropdown menu
// await page.locator('app-dropdown[placeholder="Status"] .p-dropdown-trigger').click();
// await page.locator('.p-dropdown-item:has-text("Executed")').click();

// await page.locator('app-dropdown[placeholder="Personal coach / Trainer"] .p-dropdown-trigger').click();
// await page.locator('span[aria-label="Sparki Napier"]').click();



// await page.locator('app-text-area').filter({ hasText: 'Client Memo *' }).getByRole('textbox').fill('This whole process has been automated, to make things faster and to avoid mistakes, this sessions will be deleted after the testing: So as part of the onboarding admin is supposed to executed a user first appointment');
// await page.getByRole('button', { name: 'Save' }).click();
// await page.waitForTimeout(2000);

// await allure.attachment("basic-page-screen", await page.screenshot(), {
//   contentType: "image/png",
// });
// });
