import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

/**
 * Environment selection
 *
 * QA:
 * $env:ENV="qa"; npx playwright test
 *
 * DEV:
 * $env:ENV="dev"; npx playwright test
 *
 * PROD:
 * $env:ENV="prod"; npx playwright test
 */

const environment = process.env.ENV || 'qa';

dotenv.config({
  path: `.env.${environment}`,
});

console.log(`Running Environment: ${environment}`);
console.log(`Base URL: ${process.env.BASE_URL}`);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter */
  reporter: 'html',

  /* Shared settings */
  use: {
    /* Base URL comes from .env.qa / .env.dev / .env.prod */
    baseURL: process.env.BASE_URL,

    /* Run browser in headed mode */
    headless: false,

    /* Collect trace when retrying */
    trace: 'on-first-retry',

    /* Screenshot only when test fails */
    screenshot: 'only-on-failure',
  },

  /**
   * Projects
   */
  projects: [

    // =====================================================
    // AUTHENTICATION SETUP
    // =====================================================

    {
      name: 'setup',

      testMatch: /.*auth\.setup\.ts/,

      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // =====================================================
    // SUPER ADMIN - CHROMIUM
    // =====================================================

    {
      name: 'super-admin-chromium',

      testMatch: /.*super-admin\.spec\.ts/,

      dependencies: ['setup'],

      use: {
        ...devices['Desktop Chrome'],

        storageState: 'auth/super-admin.json',
      },
    },

    // =====================================================
    // ADMIN - CHROMIUM
    // =====================================================

    {
      name: 'admin-chromium',

      testMatch: /.*admin\.spec\.ts/,

      dependencies: ['setup'],

      use: {
        ...devices['Desktop Chrome'],

        storageState: 'auth/admin.json',
      },
    },

    // =====================================================
    // PROVIDER - CHROMIUM
    // =====================================================

    {
      name: 'provider-chromium',

      testMatch: /.*provider\.spec\.ts/,

      dependencies: ['setup'],

      use: {
        ...devices['Desktop Chrome'],

        storageState: 'auth/provider.json',
      },
    },

    // =====================================================
    // FIREFOX
    // =====================================================

    {
      name: 'firefox',

      use: {
        ...devices['Desktop Firefox'],
      },
    },

    // =====================================================
    // WEBKIT / SAFARI
    // =====================================================

    {
      name: 'webkit',

      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});