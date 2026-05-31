import { test, expect } from '@playwright/test';

test.describe('TodoMVC Web Automation Tests', () => {

  test.beforeEach(async ({ page }) => {
    // 1. Open the requested TodoMVC demo website
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    
    // 2. Hardened Assertion: Make sure the main app layout wrapper is visible
    await expect(page.locator('.todoapp')).toBeVisible();
  });

  test('should successfully add new todo items and verify them', async ({ page }) => {
    // Locate the main input text field using its placeholder text
    const todoInput = page.getByPlaceholder('What needs to be done?');

    // Add Item 1
    await todoInput.fill('Learn Playwright framework');
    await todoInput.press('Enter');

    // Add Item 2
    await todoInput.fill('Write automated tests');
    await todoInput.press('Enter');

    // Assert that the list contains exactly 2 items
    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(2);

    // Verify the specific text content inside the items
    await expect(todoItems.first()).toHaveText('Learn Playwright framework');
    await expect(todoItems.nth(1)).toHaveText('Write automated tests');
  });

  test('should toggle and complete a todo task', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');

    // Add a quick item to toggle
    await todoInput.fill('Buy groceries');
    await todoInput.press('Enter');

    // Locate the round checkbox next to the added todo item and click it
    const firstTodoCheckbox = page.locator('.todo-list li .toggle').first();
    await firstTodoCheckbox.click();

    // Assert that the list item structural state changes to 'completed'
    const firstTodoItem = page.locator('.todo-list li').first();
    await expect(firstTodoItem).toHaveClass('completed');
  });

});
