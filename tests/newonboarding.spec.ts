import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Navigate to the sign-up page
    await page.goto('https://newpwa.manduu.app/account/register');
  });


test('Onboarding', async ({ page }) => {
 // Fill in personal information
 await fillPersonalInformation(page);
 // fill personal medicals
 await signMedicalConditions(page);
 // Select the studio
 await selectStudio(page);

 // Fill in the scheduled date
 await fillScheduledDate(page);

 // Wait for time options and select a random time
 await selectRandomTime(page);

 // Click the next button
 await handlePopups(page);
 await completeProfile(page);
 await CompleteClientInfo(page);
 await howYouHearAboutUs(page);
 
 await SignWaiver(page);
 
 await FirstAppointment(page);

});

async function fillPersonalInformation(page: any) {
   

  await page.locator('man-input').filter({ hasText: 'First Name *' }).getByRole('textbox').fill('Test');
  await page.locator('man-input').filter({ hasText: 'Last Name *' }).getByRole('textbox').fill('Test');
  await page.getByRole('textbox').nth(2).fill('testmanduu5@gmail.com');
  await page.getByRole('textbox').nth(3).fill('testmanduu5@gmail.com');
  await page.getByRole('button', { name: 'Continue ' }).click();
  
//   await page.timeout(2000);

  await page.fill('input[name="dateOfBirth"]', '10/7/1990');
  await page.locator('input[type="text"]').fill('(800) 4125564');
  await page.locator('div').filter({ hasText: /^Password$/ }).getByRole('textbox').fill('Test1234');
  await page.locator('div').filter({ hasText: /^Confirm Password$/ }).getByRole('textbox').fill('Test1234');
  
  await page.getByRole('button', { name: 'Continue' }).click();
  
   

  }



   //Select the studio.
async function selectStudio(page: any) {

  await page.selectOption('select[formcontrolname="studioId"]', { label: 'Edmond Oklahoma' });
  //await page.locator('app-session-appointment div').filter({ hasText: 'Select Studio-- Select Studio' }).getByRole('combobox').selectOption('47');

}
 // Fill in the scheduled date.
async function fillScheduledDate(page: any) {
   //await page.fill('#ScheduledDate', '07/10/2024');
   await page.fill('xpath=//input[@id="ScheduledDate"]','07/10/2024')
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

  await page.getByRole('button', { name: 'Continue' }).click();
   // Click the OK button to continue
   await page.getByRole('button', { name: 'Next' }).click();


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

async function signMedicalConditions(page: any) {
  // Sign that the user does not have any medical conditions
  await page.getByLabel('No').first().check();
  
  // Sign that the user is not pregnant
  await page.click('input[type="radio"][name="pregnant"][value="No"]');

  // Sign that the user does not have any other medical conditions
  await page.getByLabel('No').nth(2).check();
  await page.getByLabel('No').nth(3).check();
  await page.getByRole('button', { name: 'No, I do not have any of' }).click();

}

async function howYouHearAboutUs(page: any) {
  
  // Select how the user heard about Manduu (e.g., Print Magazine, Radio, TV, etc.)
  // await page.click('input[type="checkbox"][name="howDidYouHearAboutUs"][value="Print Magazine"]');
  //await page.getByRole('button', { name: 'Complete question' }).first().click();
  await page.getByRole('button', { name: 'Complete question' }).click()
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
  // await page.getByRole('textbox').fill('through a movie');
 await page. getByTitle('How did you hear about us?').getByRole('textbox').fill('through a movie');

  // Click the submit button
  await page.getByRole('button', { name: 'Submit' }).click();

  // Click the OK button to continue
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
// await page.locator('div').filter({ hasText: /^CountrySelect CountryUnited States of AmericaCanadaMexico$/ }).getByRole('combobox').selectOption('USA');
await page.locator('div').filter({ hasText: /^CountrySelect CountryUnited States of AmericaCanadaMexico$/ }).getByRole('combobox').selectOption('United States of America');
await page.getByRole('combobox').nth(2).selectOption('Tennessee');
await page.locator('man-input').filter({ hasText: 'City *' }).getByRole('textbox').fill('accra');
await page.locator('man-input').filter({ hasText: 'Zip Code *' }).getByRole('textbox').fill('123456');

await page.locator('man-input').filter({ hasText: 'Street *' }).getByRole('textbox').fill('accrastreest');
await page.getByRole('button', { name: 'Save' }).click();




//test

}
async function  CompleteClientInfo(page: any){
  
 
  await page.getByRole('button', { name: 'Complete Client Info' }).click();
  await page.locator('div').filter({ hasText: /^Heigh\(Feet\)Selected Inch4567$/ }).getByRole('combobox').selectOption('5');
  await page.locator('div').filter({ hasText: /^Heigh\(Inches\)Selected Height01234567891011$/ }).getByRole('combobox').selectOption('7');
  await page.locator('man-input').filter({ hasText: 'Enter Full Name *' }).getByRole('textbox').fill('test');
  await page.locator('man-input').filter({ hasText: 'Lastname *' }).getByRole('textbox').fill('mand');
  await page.locator('div').filter({ hasText: /^Phone Number$/ }).getByRole('textbox').fill('(054) 433-3333');
  await page.getByRole('button', { name: 'Save' }).click();

}

async function SignWaiver(page:any) {
  
await page.getByRole('button', { name: 'Sign', exact: true }).click();
// await page.locator('class=".signature-pad-canvas').setInputFiles('upLoadFiles\sign.png');
// await page.locator('.signature-pad-canvas').setInputFiles('upLoadFiles\img1.png');

 //signature-pad-canvas
await page.click('.signature-pad-canvas');
// await page.click('signature-pad[_ngcontent-ng-c3875943098]');

await page.locator('input[name="table1q1"]').nth(1).check();
await page.locator('input[name="table1q2"]').nth(1).check();
await page.locator('input[name="table1q3"]').nth(1).check();
await page.locator('input[name="table1q4"]').nth(1).check();
await page.getByRole('button', { name: 'Sign Here' }).click();
await page.locator('input[name="table2q1"]').nth(1).check();
await page.locator('input[name="table2q2"]').nth(1).check();
await page.locator('input[name="table2q3"]').nth(1).check();
await page.locator('input[name="table2q4"]').nth(1).check();
await page.locator('input[name="table2q5"]').nth(1).check();
await page.locator('input[name="table2q6"]').nth(1).check();
await page.locator('input[name="table2q7"]').nth(1).check();
await page.locator('input[name="table2q8"]').nth(1).check();
await page.getByRole('button', { name: 'Click To Sign' }).first().click();
await page.locator('input[name="table3q1"]').nth(1).check();
await page.locator('input[name="table3q2"]').nth(1).check();
await page.locator('input[name="table3q3"]').nth(1).check();
await page.locator('input[name="table3q4"]').nth(1).check();
await page.getByRole('button', { name: 'Click To Sign' }).nth(1).click();
await page.locator('div').filter({ hasText: /^Draw SignatureClick To Sign$/ }).getByRole('button').click();
await page.getByRole('button', { name: ' Sign' }).click();
  
}


const imgPath ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASUAAAB3CAYAAABFVlY/AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAh1QAAIdUBBJy0nQAAKVpJREFUeF7tnQmYHVW17w1efd6L913wIk6RIUZI6ABJJ4EYlCCDqFxAkEEcUFScLqgXvYxiBJmUQRRBccQBAogQMAIiUwgQZcYYpgBCgAQwzCAg0/v9KqvO69N9+pw6p8/pLrr3//vWV1Wrdu3aVXvXqrXXXnvtVyQMPWbMmPGa9ddf/+D11lvvUWjZuuuuOzlOJZQIM2fOXIF6mjVx4sTPczhqOTchYRgCQbQljf1p6CXoxUmTJm0dpxJKBH4Wo6mfZdDN7K8c7ISE4YWpU6e+EaG0MASS9Ax/4s3jdEKJQL1sS/08az1RZ58KdkLC8AKNe+seAsnG7p94YpxOKBGol+9Cj1NHz7M9Y/Lkya+KUwkJwwajaODfURhBT7L/d7YPJ5tSOUH9nEv93MHWrvZNG2ywwf+NUwkJwwM07hVp3HMhNSS7cLPZ3jdp0qSxkSShRKBurqKO5kHL2P8nmtJqcSohoTl0d3dPoyEdXzbjpPYkynUnpKb0Exr6HLZ3TJgw4Q2RJKE8GEXd3AadTT3dHnW2U5xLSGgONJ6TaEjPTZkyZe1glQIxmrOUsj0/ceLET7F/KXTz2muv/e+RJKEkQCv6N+rp3mhLl7NVu/1qnE5IKA4a0yo0nruhi21YwS4Fck2Jsj2GgNqW7U0c/5FTyQemZKB+1qZuHqKOZkKnhVD6dpxOSCgOGs6HoH9COryVCnYnKdf10JIQSk/R2A+K0wklAvWzGfXzD7YbU0ffC6H0M06tsDxFQkJB0HhmQQ93dXW9NVilgd00GrZdgbuhPaAX6MbtEKcTSgTqaVfqZ9k666yjX9m+7CuU5nD86kiSMBLBB0tbWH8fGsMpbI9mu2m9RmHXjXT3kO4Cp3IEuzSgXCtCl0J/o5w/Zas7QHecTigRqJtDoKunT5/+79TRJ6ivF6A/lc0kkDBIWH311fO5YQ+yfRHKnQ2fhvd7GsmYSFqFHh64+wSrVKDsCqW50BLKeC3bm8aOHZt8X0oI6mYOdPKOO+74ygkTJryf+nqG49tSfY1Q0ABOgPSiVRA9AOnA9mgcK6RmoTG9NpJXAF8P3Be7u7tL6YxomSnfZZCCU+fJ78ephJKBurmFOjrc/dDY9ex28nSaAzfSQOW/JxdAbH81bdq016Eyv4rjlTg+Uz6kYNrbWdxxmV23V3F+IXQfjej1wS4VetiUfDaF7nZ';

