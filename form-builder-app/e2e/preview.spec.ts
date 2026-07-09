import { test, expect } from '@playwright/test';

test.describe('Preview Page Tests', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:4200/form-setup');

    await page.getByTestId('form-name')
      .fill('Student Admission Form');

    await page.getByTestId('branch-select')
      .selectOption('Computer Engineering');

    await page.getByTestId('section-select')
      .selectOption('Section A');

    await page.getByTestId('button-name-select')
      .selectOption('Submit');

    await page.getByTestId('save-next-button')
      .click();

    await page.waitForURL('**/form-builder');
  });


  test('should open preview page', async ({ page }) => {

    await page
      .getByTestId('palette-label')
      .filter({ hasText: 'Single Line' })
      .click();

    await page
      .getByTestId('preview-button')
      .click();

    await page.waitForURL('**/preview');

    await expect(page)
      .toHaveURL(/preview/);

    await expect(
      page.getByTestId('preview-title')
    ).toBeVisible();

  });


  test('should display form title', async ({ page }) => {

    await page
      .getByTestId('palette-label')
      .filter({ hasText: 'Single Line' })
      .click();

    await page
      .getByTestId('preview-button')
      .click();

    await expect(
      page.getByTestId('preview-title')
    )
    .toContainText('Student Admission Form');

  });


  test('should display single line field', async ({ page }) => {

    await page
      .getByTestId('palette-label')
      .filter({ hasText: 'Single Line' })
      .click();

    await page
      .getByTestId('preview-button')
      .click();

    await expect(
      page.getByTestId('single-line-input')
    )
    .toBeVisible();

  });


  test('should enter text in single line field', async ({ page }) => {

    await page
      .getByTestId('palette-label')
      .filter({ hasText: 'Single Line' })
      .click();

    await page
      .getByTestId('preview-button')
      .click();

    const input =
      page.getByTestId('single-line-input');

    await input.fill('John Doe');

    await expect(input)
      .toHaveValue('John Doe');

  });


  test('should navigate back to builder', async ({ page }) => {

    await page
      .getByTestId('palette-label')
      .filter({ hasText: 'Single Line' })
      .click();

    await page
      .getByTestId('preview-button')
      .click();

    await page
      .getByTestId('back-button')
      .click();

    await expect(page)
      .toHaveURL(/form-builder/);

  });


  test('should validate required field', async ({ page }) => {

    await page
      .getByTestId('palette-label')
      .filter({ hasText: 'Single Line' })
      .click();

    await page
      .getByTestId('required-switch')
      .click();

    await page
      .getByTestId('preview-button')
      .click();

    await page
      .getByTestId('submit-button')
      .click();

    await expect(
      page.getByTestId('field-error')
    )
    .toBeVisible();

  });


  test('should submit form successfully', async ({ page }) => {

    await page
      .getByTestId('palette-label')
      .filter({ hasText: 'Single Line' })
      .click();

    await page
      .getByTestId('preview-button')
      .click();

    await page
      .getByTestId('single-line-input')
      .fill('John Doe');

    page.on('dialog', async dialog => {
  expect(dialog.message()).toBe(
    'Are you sure you want to submit your inquiry? Please review your details before proceeding.'
  );

  await dialog.accept();
});

await page
  .getByTestId('submit-button')
  .click();

await expect(
  page.getByTestId('success-message')
).toBeVisible();

  });


  test('should display empty form message', async ({ page }) => {

   
    await page.goto('http://localhost:4200/form-setup');

    await page.getByTestId('form-name')
      .fill('Student Admission Form');

    await page.getByTestId('branch-select')
      .selectOption('Computer Engineering');

    await page.getByTestId('section-select')
      .selectOption('Section A');

    await page.getByTestId('button-name-select')
      .selectOption('Submit');

    await page.getByTestId('save-next-button')
      .click();

    await page.getByTestId('preview-button')
      .click();

    await expect(
      page.getByTestId('empty-preview-message')
    )
    .toBeVisible();

  });


  test('should submit another response', async ({ page }) => {

    await page
      .getByTestId('palette-label')
      .filter({ hasText: 'Single Line' })
      .click();

    await page
      .getByTestId('preview-button')
      .click();

    await page
      .getByTestId('single-line-input')
      .fill('John Doe');

   page.on('dialog', async dialog => {
  await dialog.accept();
});

await page
  .getByTestId('submit-button')
  .click();

await expect(
  page.getByTestId('success-message')
).toBeVisible();

await page
  .getByTestId('submit-another')
  .click();

    await expect(
      page.getByTestId('preview-form')
    )
    .toBeVisible();

  });

});