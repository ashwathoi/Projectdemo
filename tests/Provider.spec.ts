import { test, expect } from '@playwright/test';

test('Provider Dashboard', async ({ page }) => {

    await page.goto('/logged-in-successfully/');

    await expect(page).toHaveURL(
        /logged-in-successfully/
    );

    console.log('Provider is authenticated');

});