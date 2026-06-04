import { test as baseTest } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

// Declare the type of your custom fixtures
type MyFixtures = {
  todoPage: TodoPage;
};

// Extend base test to cleanly inject the configured page object model automatically
export const test = baseTest.extend<MyFixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    // Yield control over to the executed test file
    await use(todoPage);
  },
});

export { expect } from '@playwright/test';
