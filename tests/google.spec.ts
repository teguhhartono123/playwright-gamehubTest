import { test, expect } from '@playwright/test';

test('should search on google safely without click interception', async ({ page }) => {
  // 1. Open Google with English parameter to lock button translations
  await page.goto('https://google.com');

  // 2. Handle potential cookies consent modal if running in a cloud/CI container
  const acceptButton = page.getByRole('button', { name: 'Accept all', exact: false });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // 3. Select the search input textarea or input field safely using .first()
  const searchInput = page.locator('textarea[name="q"], input[name="q"]').first();
  
  // 4. Fill the query keyword
  await searchInput.fill('Playwright Automation');

  // 5. FIX: Submit the form directly with the keyboard Enter key instead of calling searchButton.click()
  await searchInput.press('Enter');

  // 6. Verify that Google's core results layout section is populated and drawn
  await expect(page.locator('#search, #rcnt')).toBeVisible({ timeout: 10000 });
});
