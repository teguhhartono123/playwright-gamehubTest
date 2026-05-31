import { test, expect } from '@playwright/test';

test('should search for a game and then toggle dark mode', async ({ page }) => {
  await page.goto('https://game-hub.teguhhartono123.workers.dev');

  const searchBar = page.getByPlaceholder('Search games ...');
  await searchBar.fill('Grand Theft Auto V');
  await searchBar.press('Enter');

  const gameHeading = page.getByRole('heading', { name: 'Grand Theft Auto V exceptional', exact: true });
  await expect(gameHeading).toBeVisible({ timeout: 5000 });

const darkModeToggle = page.locator('#switch\\:_r_1_\\:control');
  
  // Click the element box directly
  await darkModeToggle.click();

  // Give it 3 seconds so you can swipe the timeline and see the black theme!
  await page.waitForTimeout(3000);

  // Assert that its structural layout state switched over to checked!
  await expect(darkModeToggle).toHaveAttribute('data-state', 'checked');
});

// import { test, expect } from '@playwright/test';

// test.describe('Game Hub Automated End-to-End Test Suite', () => {

//   test.beforeEach(async ({ page }) => {
//     await page.goto('https://game-hub.teguhhartono123.workers.dev');
//     await expect(page.locator('body')).toBeVisible();
//   });

//   /**
//    * TEST CASE 1: Game Search Functionality
//    * Fixed: Uses .first() to completely bypass the multi-element strict mode error.
//    */
//   test('should search for a specific game and display results', async ({ page }) => {
//     const searchBar = page.getByPlaceholder('Search games ...');
//     await searchBar.fill('Grand Theft Auto V');
//     await searchBar.press('Enter');

//     const gameHeading = page.getByRole('heading', { name: 'Grand Theft Auto V', exact: false }).first();
//     await expect(gameHeading).toBeVisible({ timeout: 7000 });
//   });

//   /**
//    * TEST CASE 2: Dark Mode Theme Switcher
//    * Fixed: Targets the actual interaction wrapper element rather than a hidden state node.
//    */
//   test('should toggle application UI theme between light and dark modes', async ({ page }) => {
//     // Chakra UI switch containers carry the class or label matching 'switch'
//     const darkModeToggle = page.locator('.chakra-switch, [role="switch"]').first();
//     await darkModeToggle.click();
    
//     // Check state safely on the switch track wrapper or attribute container
//     await expect(darkModeToggle).toBeVisible();
//   });

//   /**
//    * TEST CASE 3: Genre Sidebar Navigation Filter
//    * Fixed: Looks for the main viewport category heading and applies .first() to resolve strict violations.
//    */
//   test('should filter game grid results when clicking a genre in the sidebar', async ({ page }) => {
//     const sidebar = page.locator('aside, nav, .chakra-stack').first();
//     const actionGenreButton = sidebar.getByRole('button', { name: 'Action', exact: false });
//     await actionGenreButton.click();

//     // Avoids strict violations if 'Action' is present in both sidebar and main heading
//     const categoryHeading = page.getByRole('heading', { name: 'Action', exact: false }).first();
//     await expect(categoryHeading).toBeVisible({ timeout: 7000 });
//   });

//   /**
//    * TEST CASE 4: Grid Layout Card Rendering
//    * Unchanged: Already passing successfully.
//    */
//   test('should render multiple game component cards in the display grid', async ({ page }) => {
//     const gameImages = page.locator('img');
//     const count = await gameImages.count();
//     expect(count).toBeGreaterThan(0);
//   });

// });
