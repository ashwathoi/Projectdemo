import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import process from 'process';

setup('Super Admin Authentication', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await page.goto('/practice-test-login/');

    await loginPage.login(
        process.env.SUPER_ADMIN_USERNAME!,
        process.env.SUPER_ADMIN_PASSWORD!
    );

    await expect(page).toHaveURL(
        /logged-in-successfully/
    );

    await page.context().storageState({
        path: 'auth/super-admin.json'
    });
});


setup('Admin Authentication', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await page.goto('/practice-test-login/');

    await loginPage.login(
        process.env.ADMIN_USERNAME!,
        process.env.ADMIN_PASSWORD!
    );

    await expect(page).toHaveURL(
        /logged-in-successfully/
    );

    await page.context().storageState({
        path: 'auth/admin.json'
    });
});


setup('Provider Authentication', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await page.goto('/practice-test-login/');

    await loginPage.login(
        process.env.PROVIDER_USERNAME!,
        process.env.PROVIDER_PASSWORD!
    );

    await expect(page).toHaveURL(
        /logged-in-successfully/
    );

    await page.context().storageState({
        path: 'auth/provider.json'
    });
});