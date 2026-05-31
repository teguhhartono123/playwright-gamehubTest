import {test, expect} from '@playwright/test';

    
    test('should search on goole by clicking the search button', async ({ page }) =>{
        await page.goto('https://www.google.com');

        const searchInput = page.locator('textarea[name="q"], input[name="q"]');
        await searchInput.fill('Playwright Automation');

        const searchButton = page.getByRole('button', { name: 'Google Search', exact: false}).first();
        await searchButton.click();

        await  expect(page.locator('#search')).toBeVisible({ timeout: 5000 });

    });
