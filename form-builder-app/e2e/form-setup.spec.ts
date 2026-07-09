import { test, expect } from '@playwright/test';


test.describe('Form Setup Page Tests', () => {


  test.beforeEach(async ({ page }) => {

    await page.goto(
      'http://localhost:4200/form-setup'
    );

    await expect(
      page.getByTestId('form-name')
    ).toBeVisible();

  });


  test('should load form setup page', async ({ page }) => {


    await expect(
      page.getByTestId('save-next-button')
    ).toBeVisible();


    await expect(
      page.getByTestId('cancel-button')
    ).toBeVisible();


  });


  test('should show validation when required fields are empty', async ({ page }) => {

    await page
      .getByTestId('save-next-button')
      .click();

    await expect(
      page.getByText(
        'Form Name is required'
      )
    ).toBeVisible();

    await expect(
      page.getByText(
        'Branch is required'
      )
    ).toBeVisible();

    await expect(
      page.getByText(
        'Section is required'
      )
    ).toBeVisible();

  });


  test('should validate form name minimum length', async ({ page }) => {


    await page
      .getByTestId('form-name')
      .fill('ab');


    await page
      .getByTestId('save-next-button')
      .click();

    await expect(
      page
        .getByText(
          'Form Name is required'
        )
    )
      .toBeVisible();


  });


  test('should fill required fields and navigate to form builder', async ({ page }) => {


    await page.getByTestId('form-name')
      .fill('Student Admission Form');

    await page.getByTestId('branch-select')
      .selectOption('Computer Engineering');

    await page.getByTestId('section-select')
      .selectOption('Section A');

    await expect(page.getByTestId('status-unpublished'))
      .toHaveClass(/active-radio/);

    await page.getByTestId('button-name-select')
      .selectOption('Submit');

    await expect(page.getByTestId('success-message'))
      .toHaveValue(
        'Your Inquiry Has Been Sumited Successfully!'
      );

    await expect(page.getByTestId('confirm-message'))
      .toHaveValue(
        'Are you sure you want to submit your inquiry? Please review your details before proceeding.'
      );

    await page.getByTestId('save-next-button')
      .click();


    await page.waitForURL('**/form-builder');

    await expect(page)
      .toHaveURL(/form-builder/);

  });



  test('should contain correct dropdown options', async ({ page }) => {

    const branches =
      await page
        .getByTestId('branch-select')
        .locator('option')
        .allTextContents();


    expect(branches)
      .toContain(
        'Computer Engineering'
      );

    const sections =
      await page
        .getByTestId('section-select')
        .locator('option')
        .allTextContents();

    expect(sections)
      .toContain(
        'Section A'
      );

    const buttons =
      await page
        .getByTestId('button-name-select')
        .locator('option')
        .allTextContents();


    expect(buttons)
      .toContain(
        'Submit'
      );


  });

  test('should reset form after cancel', async ({ page }) => {


    await page
      .getByTestId('form-name')
      .fill(
        'Test Form'
      );

    await page
      .getByTestId('cancel-button')
      .click();

    await expect(
      page.getByTestId('form-name')
    )
      .toHaveValue('');

  });


  test('should select form status', async ({ page }) => {

    await page
      .getByTestId('status-published')
      .check();

    await expect(
      page.getByTestId('status-published')
    )
      .toBeChecked();

    await page
      .getByTestId('status-unpublished')
      .check();

    await expect(
      page.getByTestId('status-unpublished')
    )
      .toBeChecked();

  });

  test('should save form setup data in localStorage', async ({ page }) => {


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


  const formData = await page.evaluate(() => {
    return JSON.parse(localStorage.getItem('formSetupData') || '{}');
  });

  expect(formData.formName)
    .toBe('Student Admission Form');

  expect(formData.branch)
    .toBe('Computer Engineering');

  expect(formData.section)
    .toBe('Section A');

  expect(formData.buttonName)
    .toBe('Submit');

});

});