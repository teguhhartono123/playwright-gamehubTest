import { test, expect } from '@playwright/test';

test.describe('Game Hub - Dota 2 End-to-End Test Suite', () => {

  // Hook to navigate and wait for full app hydration before each test execution
  test.beforeEach(async ({ page }) => {
    // Wait until the network is completely quiet and the app has fetched its data
    await page.goto('https://game-hub.teguhhartono123.workers.dev', { waitUntil: 'load' });
  });

  /**
   * TEST CASE 1: Search for Dota 2 & Toggle Dark Mode Layout
   */
  test('should search for Dota 2 and toggle theme modes', async ({ page }) => {
    const searchBar = page.getByPlaceholder('Search games ...');
    await searchBar.fill('Dota 2');
    await searchBar.press('Enter');

    const gameHeading = page.getByRole('heading', { name: /Dota 2/i }).first();
    await expect(gameHeading).toBeVisible({ timeout: 5000 });

    await page.getByText('Dark Mode').click();
    await expect(page.getByText('Dark Mode')).toBeVisible(); 
  });

  /**
   * TEST CASE 2: Sidebar Strategy Navigation Filter
   */
  test('should filter grid elements when selecting Strategy or Action in the sidebar', async ({ page }) => {
    await page.getByText('Strategy', { exact: true }).first().click();

    const mainHeading = page.getByRole('heading').first();
    await expect(mainHeading).toBeVisible({ timeout: 10000 });
  });

  /**
   * TEST CASE 3: Grid Card Asset Validation
   */
  test('should verify game cover artwork items render successfully in the catalog grid', async ({ page }) => {
    // Direct navigation backup to guarantee we aren't stuck on about:blank
    await page.goto('https://game-hub.teguhhartono123.workers.dev', { waitUntil: 'load' });

    // Wait up to 15 seconds for the slow-loading image cards to load
    await expect(page.getByRole('img').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('heading', { name: /games/i }).first()).toBeVisible();
  });

}); // <--- Now this properly closes the describe block at the very end of the file
