// 1. Import from your custom fixture
import { test, expect } from '../pages/TodoFixture';

test.describe('TodoMVC Web Automation Tests (Refactored)', () => {

  // 2. Inject { todoPage } directly into the test arguments
  test('should successfully add new todo items and verify them', async ({ todoPage }) => {
    await todoPage.addTodo('Learn Playwright framework');
    await todoPage.addTodo('Write automated tests');

    await expect(todoPage.todoItems).toHaveCount(2);
    await expect(todoPage.todoItems.first()).toHaveText('Learn Playwright framework');
    await expect(todoPage.todoItems.nth(1)).toHaveText('Write automated tests');
  });

  test('should toggle and complete a todo task', async ({ todoPage }) => {
    await todoPage.addTodo('Buy groceries');
    await todoPage.toggleTodo(0);
    
    await expect(todoPage.todoItems.first()).toHaveClass('completed');
  });

});
