import { Locator, Page } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly todoApp: Locator;
  readonly todoInput: Locator;
  readonly todoItems: Locator;
  readonly toggleAllCheckbox: Locator;
  readonly clearCompletedButton: Locator;
  readonly activeFilterLink: Locator;
  readonly completedFilterLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.todoApp = page.locator('.todoapp');
    this.todoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.locator('.todo-list li');
    this.toggleAllCheckbox = page.locator('.toggle-all');
    this.clearCompletedButton = page.locator('.clear-completed');
    this.activeFilterLink = page.getByRole('link', { name: 'Active' });
    this.completedFilterLink = page.getByRole('link', { name: 'Completed' });
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc/#/');
  }

  async addTodo(text: string) {
    await this.todoInput.fill(text);
    await this.todoInput.press('Enter');
  }

  async addMultipleTodos(items: string[]) {
    for (const item of items) {
      await this.addTodo(item);
    }
  }

  async toggleTodo(index: number) {
    await this.todoItems.nth(index).locator('.toggle').click();
  }

  async editTodo(index: number, newText: string) {
    // Double click to trigger editing mode in TodoMVC
    await this.todoItems.nth(index).locator('label').dblclick();
    const editInput = this.todoItems.nth(index).locator('.edit');
    await editInput.fill(newText);
    await editInput.press('Enter');
  }

  async deleteTodo(index: number) {
    // Hover is required because the destroy button (X) is hidden via CSS until hovered
    await this.todoItems.nth(index).hover();
    await this.todoItems.nth(index).locator('.destroy').click();
  }
}
