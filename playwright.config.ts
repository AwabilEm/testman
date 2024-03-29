import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');
// const VIDEOS_DIR = path.join(__dirname, 'videos'); // Define the directory to save videos
// const REPORT_DIR = path.join(__dirname, 'reports'); // Define the directory to save reports

export default defineConfig({
  testDir: './tests',
  timeout: 500 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html'],
    ['dot'],
    ['list'],
    ['allure-playwright'],
  ],
  use: {
    trace: 'on-first-retry',
    // video: {
    //   mode: 'on',
    //   //   
    // },
    video: 'on',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
    },
    {
      name: 'booking sessions',
      testMatch: '**/*booking.spec.ts',
      dependencies: ['setup'],
      use: {
        storageState: STORAGE_STATE,
      },
    },
    
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // {
    //   name: 'Custom Mobile Device 1',
    //   use: {
    //     viewport: { width: 400, height: 800 },
    //     userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    //   },
    // },
    // {
    //   name: 'Custom Tablet Device 1',
    //   use: {
    //     viewport: { width: 768, height: 1024 },
    //     userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    //   },
    // },

  ],

  // Specify the directory to save the test report
  
});
