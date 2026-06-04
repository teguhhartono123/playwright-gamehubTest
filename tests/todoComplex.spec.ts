import { test, expect } from '../pages/TodoFixture';

test.describe('Advanced TodoMVC E2E Workflows', () => {

  test('should assert application initialization safety', async ({ todoPage }) => {
    // Check initial visual structure
    await expect(todoPage.todoApp).toBeVisible();
    await expect(todoPage.todoItems).toHaveCount(0);
  });

  test('should gracefully handle inline text editing and updates', async ({ todoPage }) => {
    await todoPage.addTodo('Refactor framework codebase');
    
    // Perform double-click dynamic edit modification
    await todoPage.editTodo(0, 'Refactor framework code to TypeScript');
    
    // Explicit dynamic string assertion
    await expect(todoPage.todoItems.first()).toHaveText('Refactor framework code to TypeScript');
  });

  test('should support state bulk-toggling and filter application checks', async ({ todoPage }) => {
    const items = ['Task Alpha', 'Task Beta', 'Task Gamma'];
    await todoPage.addMultipleTodos(items);
    await expect(todoPage.todoItems).toHaveCount(3);

    // Bulk action: Mark everything as complete using the hidden toggle-all checkbox
    await todoPage.toggleAllCheckbox.check();

    // Verify all items inherited the structural completion styles
    const allItems = await todoPage.todoItems.all();
    for (const item of allItems) {
      await expect(item).toHaveClass('completed');
    }

    // Toggle specific item back to active
    await todoPage.toggleTodo(1); // Uncheck Task Beta

    // Click Active filter tab
    await todoPage.activeFilterLink.click();
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toHaveText('Task Beta');

    // Click Completed filter tab
    await todoPage.completedFilterLink.click();
    await expect(todoPage.todoItems).toHaveCount(2);
  });

  test('should cleanly delete items from lifecycle tracking', async ({ todoPage }) => {
    await todoPage.addTodo('Temporary item to destroy');
    await expect(todoPage.todoItems).toHaveCount(1);

    // Hover and press hidden destroy button
    await todoPage.deleteTodo(0);

    // Dynamic clean state isolation proof
    await expect(todoPage.todoItems).toHaveCount(0);
  });
});
