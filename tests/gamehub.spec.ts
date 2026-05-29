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
