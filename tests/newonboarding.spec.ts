import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
    // Navigate to the sign-up page
    await page.goto('https://newpwa.manduu.app/account/register');
  });


test('Onboarding', async ({ page }) => {
 // Fill in personal information
 await fillPersonalInformation(page);

 // Select the studio
 await selectStudio(page);

 // Fill in the scheduled date
 await fillScheduledDate(page);

 // Wait for time options and select a random time
 await selectRandomTime(page);

 // Click the next button
 await page.getByRole('button', { name: 'Continue' }).click();
 await handlePopups(page);

 await signMedicalConditions(page);
 await howYouHearAboutUs(page);
 await FirstAppointment(page);
 await completeProfile(page);
});

async function fillPersonalInformation(page: any) {
   

  await page.locator('man-input').filter({ hasText: 'First Name *' }).getByRole('textbox').fill('test1');
  await page.locator('man-input').filter({ hasText: 'Last Name *' }).getByRole('textbox').fill('test2');
  await page.getByRole('textbox').nth(2).fill('testmanduu2@gmail.com');
  await page.getByRole('textbox').nth(3).fill('testmanduu2@gmail.com');
  await page.getByRole('button', { name: 'Continue ' }).click();
  
//   await page.timeout(2000);

  await page.fill('input[name="dateOfBirth"]', '12/18/2007');
  await page.locator('input[type="text"]').fill('(024) 993-0053');
  await page.locator('div').filter({ hasText: /^Password$/ }).getByRole('textbox').fill('123456');
  await page.locator('div').filter({ hasText: /^Confirm Password$/ }).getByRole('textbox').fill('123456');
  
  await page.getByRole('button', { name: 'Continue' }).click();
  
  }



   //Select the studio.
async function selectStudio(page: any) {

  await page.selectOption('select[formcontrolname="studioId"]', { label: 'Edmond Oklahoma' });

}
 // Fill in the scheduled date.
async function fillScheduledDate(page: any) {
   //await page.fill('#ScheduledDate', '05/07/2024');
   await page.fill('xpath=//input[@id="ScheduledDate"]','05/07/2024')
  // await page.click('body');
  // await page.waitForTimeout(1000);
await page.click('text="Start Time"');

}
 // Select a random time from available options.
async function selectRandomTime(page: any) {
  // Define a function to check if the time dropdown is available and return all available options
  const getTimeOptions = async () => {
    const timeDropdown = await page.$('#inputGroupSelect02');
    if (!timeDropdown) return null; // Return null if dropdown is not found
    const options = await timeDropdown.$$eval('option', options => options.map(option => option.getAttribute('value')));
    return options.length > 0 ? options : null; // Return null if no options found
  };

  // Define a function to wait for the dropdown options to become available with retries
  const waitForTimeOptions = async () => {
    let attempts = 0;
    while (attempts < 5) { // Retry for a maximum of 5 attempts
      const availableTimes = await getTimeOptions();
      if (availableTimes) return availableTimes; // Return options if available
      await page.waitForTimeout(1000); // Wait for 1 second before retrying
      attempts++;
    }
    return null; // Return null if options are not available after retries
  };

  // Wait for the time dropdown options to become available
  const availableTimes = await waitForTimeOptions();

  if (availableTimes) {
    // Log out all available times
    console.log('Available times:', availableTimes);

    // Select a random index from the available times array
    const randomIndex = Math.floor(Math.random() * availableTimes.length);
    console.log('Selected time:', availableTimes[randomIndex]);

    // Select the time option from the dropdown using the random index
    await page.selectOption('#inputGroupSelect02', availableTimes[randomIndex]);
  } else {
    console.warn('No available times found after retries.');
  }



}
//Handle popups, if any.
async function handlePopups(page: any) {
  try {
    // Wait for the popup to appear with a timeout of 5 seconds
    const popup = await page.waitForSelector('.swal2-popup', { timeout: 5000 });

    // Extract the error message
    const errorMessage = await popup.$eval('.swal2-html-container', element => element.textContent);

    // Log the error message
    console.log('Error message:', errorMessage);

    // Click the OK button to dismiss the popup using page.evaluate
    await page.evaluate(() => {
      const confirmButton = document.querySelector('.swal2-confirm');
      if (confirmButton) {
        (confirmButton as HTMLButtonElement).click();
      }
    });
  } catch (error) {
    // Handle timeout or other errors
    console.log('Popup did not appear within the specified timeout or encountered an error.');
    console.error(error);
  }
}
//signing medical waiver form
async function signMedicalConditions(page: any) {
  await page.getByLabel('No').first().check();
  await page.click('input[type="radio"][name="pregnant"][value="No"]');
  await page.getByLabel('No').nth(2).check();
  await page.getByLabel('No').nth(3).check();
  await page.getByRole('button', { name: 'No, I do not have any of' }).click();

}

async function howYouHearAboutUs(page: any) {
  
 
  await page.locator('li').filter({ hasText: 'Print Magazine' }).getByRole('checkbox').check();
  await page.locator('li').filter({ hasText: 'Radio' }).getByRole('checkbox').check();
  await page.locator('li').filter({ hasText: 'TV' }).getByRole('checkbox').check();
  await page.locator('li').filter({ hasText: 'Social media' }).getByRole('checkbox').check();
  await page.getByText('Print Magazine Radio TV').click();
  await page.getByText('Google/Internet').click();
  await page.locator('li').filter({ hasText: 'Mobile Ad' }).getByRole('checkbox').check();
  await page.locator('li').filter({ hasText: 'Google/Internet' }).getByRole('checkbox').check();
  await page.locator('li').filter({ hasText: 'Direct mail' }).getByRole('checkbox').check();
  await page.locator('li').filter({ hasText: 'Email' }).getByRole('checkbox').check();
  await page.locator('li').filter({ hasText: 'Saw Studio' }).getByRole('checkbox').check();
  await page.locator('li').filter({ hasText: 'Referral' }).getByRole('checkbox').check();
  await page.getByRole('list').locator('li').filter({ hasText: 'Other' }).getByRole('checkbox').check();

  // Fill in additional information
  await page.getByRole('textbox').fill('through a movie');

  // Click the submit button
  await page.getByRole('button', { name: 'Submit' }).click();

  // Click the OK button to continue
  await page.getByRole('button', { name: 'Next' }).click();
}

async function FirstAppointment(page: any){
  await page.click('span:has-text("First Appointment")');
 // await page.click('span:has-text("Reschedule")');
  await page.getByRole('button', { name: 'Continue' }).click();
  //await page.getByRole('button', { name: 'Complete Profile' }).first().click();
}
async function  completeProfile(page: any){
  
  
  // await page.getByRole('button', { name: 'Continue' }).click();
await page.getByRole('button', { name: 'Complete Profile' }).first().click();
await page.getByRole('combobox').first().selectOption('male');
await page.locator('div').filter({ hasText: /^CountrySelect CountryUnited States of AmericaCanadaMexico$/ }).getByRole('combobox').selectOption('USA');
await page.getByRole('combobox').nth(2).selectOption('Tennessee');
await page.locator('man-input').filter({ hasText: 'City *' }).getByRole('textbox').fill('accra');
await page.locator('man-input').filter({ hasText: 'Zip Code *' }).getByRole('textbox').fill('123456');

await page.locator('man-input').filter({ hasText: 'Street *' }).getByRole('textbox').fill('accrastreest');
await page.getByRole('button', { name: 'Save' }).click();

}