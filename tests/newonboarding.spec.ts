import { test, expect } from '@playwright/test';

// test.beforeEach(async ({ page }) => {
//     // Navigate to the sign-up page
//     await page.goto('https://newpwa.manduu.app/account/register');
//   });
// test.beforeEach(async ({ page }) => {
//     // Navigate to the sign-up page
//     await page.goto('https://newpwa.manduu.app/account/register');
//   });

const email = 'testmanduu4@gmail.com';
const password = '123456'
const PhoneNumber = '23364874957';
const fName = 'test';
const lName ='test2'
const selectStu = 'Edmond Oklahoma';
const email = 'testmanduu4@gmail.com';
const password = '123456'
const PhoneNumber = '23364874957';
const fName = 'test';
const lName ='test2'
const selectStu = 'Edmond Oklahoma';

test('Onboarding', async ({ page }) => {
  await page.goto('https://newpwa.manduu.app/account/register');
  await page.goto('https://newpwa.manduu.app/account/register');
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
await page.waitForTimeout(2000);


});
test('LoginToCompleteOnboard', async ({ page }) => {
    
  await page.goto('https://newpwa.manduu.app/account/login');
  await page.getByPlaceholder('Username Or Email *').fill(email);
  await page.getByPlaceholder('Password *').fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
 
  await addCard(page)
  await signContract(page)
  
  
     });


     

async function fillPersonalInformation(page: any) {
   

  await page.locator('man-input').filter({ hasText: 'First Name *' }).getByRole('textbox').fill(fName);
  await page.locator('man-input').filter({ hasText: 'Last Name *' }).getByRole('textbox').fill(lName);
  await page.getByRole('textbox').nth(2).fill(email);
  await page.getByRole('textbox').nth(3).fill(email);
  await page.locator('man-input').filter({ hasText: 'First Name *' }).getByRole('textbox').fill(fName);
  await page.locator('man-input').filter({ hasText: 'Last Name *' }).getByRole('textbox').fill(lName);
  await page.getByRole('textbox').nth(2).fill(email);
  await page.getByRole('textbox').nth(3).fill(email);
  await page.getByRole('button', { name: 'Continue ' }).click();
  
//   await page.timeout(2000);

  await page.fill('input[name="dateOfBirth"]', '12/20/2007');
  await page.locator('input[type="text"]').fill(PhoneNumber);
  await page.locator('div').filter({ hasText: /^Password$/ }).getByRole('textbox').fill(password);
  await page.locator('div').filter({ hasText: /^Confirm Password$/ }).getByRole('textbox').fill(password);
  await page.locator('input[type="text"]').fill(PhoneNumber);
  await page.locator('div').filter({ hasText: /^Password$/ }).getByRole('textbox').fill(password);
  await page.locator('div').filter({ hasText: /^Confirm Password$/ }).getByRole('textbox').fill(password);
  
  await page.getByRole('button', { name: 'Continue' }).click();
  
   

  }


   //Select the studio.
async function selectStudio(page: any) {

  await page.selectOption('select[formcontrolname="studioId"]', { label: selectStu });
  await page.selectOption('select[formcontrolname="studioId"]', { label: selectStu });
  //await page.locator('app-session-appointment div').filter({ hasText: 'Select Studio-- Select Studio' }).getByRole('combobox').selectOption('47');

}
 // Fill in the scheduled date.
async function fillScheduledDate(page: any) {
   //await page.fill('#ScheduledDate', '05/07/2024');
   await page.fill('xpath=//input[@id="ScheduledDate"]','09/17/2024')
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

 //signature-pad-canvas
await page.click('.signature-pad-canvas');

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
// async function Confirm(page: any){
  
//   await page.getByRole('button', { name: 'First Appointment' }).click();
//   await page.getByRole('button', { name: 'Continue' }).click();
   
//   };
  
  async function addCard(page:any) {
    await page.getByRole('button', { name: 'Add Card' }).click();
    
    await page.getByTitle('Add Your Card').locator('input[type="text"]').fill('TESTER CARD');
    
    await page.locator('#cc-number').first().fill('4916186141125817');
    
    await page.locator('#cc-exp-date').fill('06 / 2026');
    
    await page.locator('#cc-number').nth(1).fill('546');
    await page.getByRole('button', { name: 'Authorize' }).click();
  
  }
  
       async function signContract(page:any){
        await page.getByRole('button', { name: 'Sign Contract' }).click();
    await page.locator('div').filter({ hasText: /^Fit 8 Plan \(Manduu Oklahoma\)$/ }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByTitle('Sign Contract').locator('canvas').click({
      position: {
        x: 109,
        y: 56
      }
    });
    await page.getByTitle('Sign Contract').locator('canvas').click({
      position: {
        x: 152,
        y: 54
      }
    });
    
  
    await page.getByRole('button', { name: 'Sign Here' }).first().click();
    await page.getByRole('button', { name: 'Sign Here' }).nth(1).click();
    await page.getByRole('button', { name: 'Sign Here' }).nth(2).click();
    await page.getByRole('button', { name: 'Sign Here' }).nth(3).click();
    await page.getByRole('button', { name: 'Sign Here' }).nth(4).click();
    await page.getByRole('button', { name: ' Sign' }).click();
    await page.getByRole('button', { name: 'Complete Onboarding' }).click();
    await page.goto('https://newpwa.manduu.app/app/client/dashboard');
  
  
  
       }
// async function Confirm(page: any){
  
//   await page.getByRole('button', { name: 'First Appointment' }).click();
//   await page.getByRole('button', { name: 'Continue' }).click();
   
//   };
  
  async function addCard(page:any) {
    await page.getByRole('button', { name: 'Add Card' }).click();
    
    await page.getByTitle('Add Your Card').locator('input[type="text"]').fill('TESTER CARD');
    
    await page.locator('#cc-number').first().fill('4916186141125817');
    
    await page.locator('#cc-exp-date').fill('06 / 2026');
    
    await page.locator('#cc-number').nth(1).fill('546');
    await page.getByRole('button', { name: 'Authorize' }).click();
  
  }
  
       async function signContract(page:any){
        await page.getByRole('button', { name: 'Sign Contract' }).click();
    await page.locator('div').filter({ hasText: /^Fit 8 Plan \(Manduu Oklahoma\)$/ }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByTitle('Sign Contract').locator('canvas').click({
      position: {
        x: 109,
        y: 56
      }
    });
    await page.getByTitle('Sign Contract').locator('canvas').click({
      position: {
        x: 152,
        y: 54
      }
    });
    
  
    await page.getByRole('button', { name: 'Sign Here' }).first().click();
    await page.getByRole('button', { name: 'Sign Here' }).nth(1).click();
    await page.getByRole('button', { name: 'Sign Here' }).nth(2).click();
    await page.getByRole('button', { name: 'Sign Here' }).nth(3).click();
    await page.getByRole('button', { name: 'Sign Here' }).nth(4).click();
    await page.getByRole('button', { name: ' Sign' }).click();
    await page.getByRole('button', { name: 'Complete Onboarding' }).click();
    await page.goto('https://newpwa.manduu.app/app/client/dashboard');
  
  
  
       }
const imgPath ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASUAAAB3CAYAAABFVlY/AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAh1QAAIdUBBJy0nQAAKVpJREFUeF7tnQmYHVW17w1efd6L913wIk6RIUZI6ABJJ4EYlCCDqFxAkEEcUFScLqgXvYxiBJmUQRRBccQBAogQMAIiUwgQZcYYpgBCgAQwzCAg0/v9KqvO69N9+pw6p8/pLrr3//vWV1Wrdu3aVXvXqrXXXnvtVyQMPWbMmPGa9ddf/+D11lvvUWjZuuuuOzlOJZQIM2fOXIF6mjVx4sTPczhqOTchYRgCQbQljf1p6CXoxUmTJm0dpxJKBH4Wo6mfZdDN7K8c7ISE4YWpU6e+EaG0MASS9Ax/4s3jdEKJQL1sS/08az1RZ58KdkLC8AKNe+seAsnG7p94YpxOKBGol+9Cj1NHz7M9Y/Lkya+KUwkJwwajaODfURhBT7L/d7YPJ5tSOUH9nEv93MHWrvZNG2ywwf+NUwkJwwM07hVp3HMhNSS7cLPZ3jdp0qSxkSShRKBurqKO5kHL2P8nmtJqcSohoTl0d3dPoyEdXzbjpPYkynUnpKb0Exr6HLZ3TJgw4Q2RJKE8GEXd3AadTT3dHnW2U5xLSGgONJ6TaEjPTZkyZe1glQIxmrOUsj0/ceLET7F/KXTz2muv/e+RJKEkQCv6N+rp3mhLl7NVu/1qnE5IKA4a0yo0nruhi21YwS4Fck2Jsj2GgNqW7U0c/5FTyQemZKB+1qZuHqKOZkKnhVD6dpxOSCgOGs6HoH9COryVCnYnKdf10JIQSk/R2A+K0wklAvWzGfXzD7YbU0ffC6H0M06tsDxFQkJB0HhmQQ93dXW9NVilgd00GrZdgbuhPaAX6MbtEKcTSgTqaVfqZ9k666yjX9m+7CuU5nD86kiSMBLBB0tbWH8fGsMpbI9mu2m9RmHXjXT3kO4Cp3IEuzSgXCtCl0J/o5w/Zas7QHecTigRqJtDoKunT5/+79TRJ6ivF6A/lc0kkDBIWH311fO5YQ+yfRHKnQ2fhvd7GsmYSFqFHh64+wSrVKDsCqW50BLKeC3bm8aOHZt8X0oI6mYOdPKOO+74ygkTJryf+nqG49tSfY1Q0ABOgPSiVRA9AOnA9mgcK6RmoTG9NpJXAF8P3Be7u7tL6YxomSnfZZCCU+fJ78ephJKBurmFOjrc/dDY9ex28nSaAzfSQOW/JxdAbH81bdq016Eyv4rjlTg+Uz6kYNrbWdxxmV23V3F+IXQfjej1wS4VetiUfDaF7nZ';

