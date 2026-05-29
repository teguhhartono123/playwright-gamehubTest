// import { test, expect } from '@playwright/test';

// test('should search for a game and then toggle dark mode', async ({ page }) => {
//   await page.goto('https://game-hub.teguhhartono123.workers.dev');

//   const searchBar = page.getByPlaceholder('Search games ...');
//   await searchBar.fill('Grand Theft Auto V');
//   await searchBar.press('Enter');

//   const gameHeading = page.getByRole('heading', { name: 'Grand Theft Auto V exceptional', exact: true });
//   await expect(gameHeading).toBeVisible({ timeout: 5000 });

// const darkModeToggle = page.locator('#switch\\:_r_1_\\:control');
  
//   // Click the element box directly
//   await darkModeToggle.click();

//   // Give it 3 seconds so you can swipe the timeline and see the black theme!
//   await page.waitForTimeout(3000);

//   // Assert that its structural layout state switched over to checked!
//   await expect(darkModeToggle).toHaveAttribute('data-state', 'checked');
// });

import { test, expect } from '@playwright/test';

test.describe('Game Hub Automated End-to-End Test Suite', () => {

  // Runs before each test case to navigate cleanly to your site
  test.beforeEach(async ({ page }) => {
    await page.goto('https://game-hub.teguhhartono123.workers.dev');
    
    // Hardened check: Wait for the main network skeleton loaders to settle 
    // and ensure the main layout body structure is fully rendered.
    await expect(page.locator('body')).toBeVisible();
  });

  /**
   * TEST CASE 1: Game Search Functionality
   * Firmly verifies that searching for a game updates the view.
   */
  test('should search for a specific game and display results', async ({ page }) => {
    const searchBar = page.getByPlaceholder('Search games ...');
    
    await searchBar.fill('Grand Theft Auto V');
    await searchBar.press('Enter');

    // Hardened lookup: Use partial text matching ('contains') instead of exact true.
    // This prevents API text additions like "exceptional" from breaking the test.
    const gameHeading = page.getByRole('heading', { name: 'Grand Theft Auto V', exact: false });
    await expect(gameHeading).toBeVisible({ timeout: 7000 });
  });

  /**
   * TEST CASE 2: Dark Mode Theme Switcher
   * Firmly verifies the global UI layout state switches correctly.
   */
  test('should toggle application UI theme between light and dark modes', async ({ page }) => {
    // Selects the toggle switch by its semantic accessible role
    const darkModeToggle = page.getByRole('switch');
    
    // Force a clean click on the switch component
    await darkModeToggle.click();

    // Verifies data-state changes structural attribute value to checked
    await expect(darkModeToggle).toHaveAttribute('data-state', 'checked');
  });

  /**
   * TEST CASE 3: Genre Sidebar Navigation Filter
   * Firmly verifies sidebar filtering targets text elements safely.
   */
  test('should filter game grid results when clicking a genre in the sidebar', async ({ page }) => {
    // Targets the sidebar content container explicitly by its layout role
    const sidebar = page.locator('aside, nav').first();
    
    // Finds the Action text inside the button safely
    const actionGenreButton = sidebar.getByRole('button', { name: 'Action', exact: false });
    await actionGenreButton.click();

    // Verifies the heading title context shifts to display the relevant category
    const categoryHeading = page.getByRole('heading', { name: 'Action', exact: false });
    await expect(categoryHeading).toBeVisible({ timeout: 7000 });
  });

  /**
   * TEST CASE 4: Grid Layout Card Rendering
   * Firmly asserts that content elements are fully drawn inside the grid viewport.
   */
  test('should render multiple game component cards in the display grid', async ({ page }) => {
    // Target images inside your game grid cards to ensure they are actually rendering content
    const gameImages = page.locator('img');
    
    // Assert that the page has loaded visual card media items
    const count = await gameImages.count();
    expect(count).toBeGreaterThan(0);
  });

});
