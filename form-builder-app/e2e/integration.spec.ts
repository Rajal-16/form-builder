import { test, expect } from '@playwright/test';

test.describe('Integration Page Tests', () => {

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

    await page
      .getByTestId('palette-label')
      .filter({ hasText: 'Single Line' })
      .click();

    await page.getByTestId('publish-button')
      .click();

    await page.waitForURL('**/integration/**');
  });

  test('should load integration page', async ({ page }) => {

    await expect(
      page.getByTestId('integration-heading')
    ).toBeVisible();

    await expect(
      page.getByTestId('left-panel')
    ).toBeVisible();

    await expect(
      page.getByTestId('right-panel')
    ).toBeVisible();

  });

  test('should display form url', async ({ page }) => {

    await expect(
      page.getByTestId('form-url')
    ).toContainText('http://localhost:4200/form/');

  });

  test('should display embed code', async ({ page }) => {

    await expect(
      page.getByTestId('embed-code')
    ).toContainText('<iframe');

  });

  test('should display QR code', async ({ page }) => {

    await expect(
      page.getByTestId('qr-code')
    ).toBeVisible();

  });

  test('should copy form link', async ({ page }) => {

    page.on('dialog', async dialog => {

      expect(dialog.message())
        .toBe('form link copied sucessfully');

      await dialog.accept();

    });

    await page
      .getByTestId('copy-link-button')
      .click();

  });

  test('should copy embed code', async ({ page }) => {

    page.on('dialog', async dialog => {

      expect(dialog.message())
        .toBe('form link copied sucessfully');

      await dialog.accept();

    });

    await page
      .getByTestId('copy-code-button')
      .click();

  });

  test('should click download button', async ({ page }) => {

    page.on('dialog', async dialog => {

      expect(dialog.message())
        .toBe('form link copied sucessfully');

      await dialog.accept();

    });

    await page
      .getByTestId('download-button')
      .click();

  });

  test('should cancel integration page', async ({ page }) => {

    page.on('dialog', async dialog => {

      expect(dialog.message())
        .toBe('are you sure you want to cancel this form ?');

      await dialog.accept();

    });

    await page
      .getByTestId('cancel-button')
      .click();

    await expect(page)
      .toHaveURL(/form-setup/);

  });

  test('should publish form successfully', async ({ page }) => {

    page.on('dialog', async dialog => {

      expect(dialog.message())
        .toBe('form publish sucessfully..');

      await dialog.accept();

    });

    await page
      .getByTestId('publish-form-button')
      .click();

    await expect(page)
      .toHaveURL(/form-setup/);

  });

});