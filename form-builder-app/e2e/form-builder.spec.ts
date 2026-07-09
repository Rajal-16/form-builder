import { test, expect } from '@playwright/test';

test.describe('Form Builder Tests', () => {

 test.beforeEach(async ({ page }) => {

  await page.goto(
    'http://localhost:4200/form-setup'
  );

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

});


  test('should load form builder page', async ({page})=>{

    await expect(
      page.getByTestId('form-builder-heading')
    )
    .toBeVisible();

    await expect(
      page.getByTestId('custom-elements-title')
    )
    .toBeVisible();

    await expect(
      page.getByTestId('add-field-title')
    )
    .toBeVisible();

  });


  test('should show all palette elements', async ({page})=>{

    const elements = [
      'Single Line',
      'Paragraph',
      'Checkbox',
      'Dropdown',
      'Radio Button',
      'Date Picker',
      'Time Picker',
      'Upload File',
      'Rating Star',
      'Image',
      'Terms & Conditions',
      'Rating Number'
    ];

    for(const element of elements){

      await expect(
        page
        .getByTestId('palette-label')
        .filter({hasText: element})
      )
      .toBeVisible();

    }

  });

  test('should search palette elements', async ({page})=>{


    const search =
      page.getByTestId('palette-search');


    await search.fill(
      'Dropdown'
    );


    await expect(
      page
      .getByTestId('palette-label')
      .filter({hasText:'Dropdown'})
    )
    .toBeVisible();

    await expect(
      page
      .getByTestId('palette-label')
      .filter({hasText:'Single Line'})
    )
    .not
    .toBeVisible();


  });

  test('should clear search text', async ({page})=>{

    const search =
      page.getByTestId('palette-search');

    await search.fill(
      'Dropdown'
    );

    await page
    .getByTestId('clear-search')
    .click();

    await expect(search)
    .toHaveValue('');

  });


  test('should add single line field', async ({page})=>{

    await page
    .getByTestId('palette-label')
    .filter({hasText:'Single Line'})
    .click();

    await expect(
      page.getByTestId('field-card')
    )
    .toHaveCount(1);

  });


  test('should expand and collapse field', async ({page})=>{

    await page
    .getByTestId('palette-label')
    .filter({hasText:'Single Line'})
    .click();

    await expect(
      page.getByTestId('field-label-input')
    )
    .toBeVisible();

    await page
    .getByTestId('field-card-header')
    .click();

    await expect(
      page.getByTestId('field-label-input')
    )
    .not
    .toBeVisible();

  });


  test('should update field label', async ({page})=>{

    await page
    .getByTestId('palette-label')
    .filter({hasText:'Single Line'})
    .click();

    const label =
      page.getByTestId('field-label-input');

    await label.fill(
      'Full Name'
    );

    await expect(label)
    .toHaveValue(
      'Full Name'
    );

  });


  test('should update placeholder', async ({page})=>{

    await page
    .getByTestId('palette-label')
    .filter({hasText:'Single Line'})
    .click();

    const placeholder =
      page.getByTestId('placeholder-input');

    await placeholder.fill(
      'Enter Name'
    );

    await expect(placeholder)
    .toHaveValue(
      'Enter Name'
    );

  });


  test('should enable required checkbox', async ({page})=>{

    await page
    .getByTestId('palette-label')
    .filter({hasText:'Single Line'})
    .click();

    await page
    .getByTestId('required-switch')
    .click();

    await expect(
      page.getByTestId('required-checkbox')
    )
    .toBeChecked();

    await expect(
      page.getByTestId('required-badge')
    )
    .toBeVisible();

  });


  test('should duplicate field', async ({page})=>{

    await page
    .getByTestId('palette-label')
    .filter({hasText:'Single Line'})
    .click();

    await page
    .getByTestId('duplicate-field')
    .click();

    await expect(
      page.getByTestId('field-card')
    )
    .toHaveCount(2);
  });


  test('should delete field', async ({page})=>{

    await page
    .getByTestId('palette-label')
    .filter({hasText:'Single Line'})
    .click();

    await page
    .getByTestId('delete-field')
    .click();

    await expect(
      page.getByTestId('empty-builder-message')
    )
    .toBeVisible();

  });


  test('should open field menu', async ({page})=>{

    await page
    .getByTestId('palette-label')
    .filter({hasText:'Single Line'})
    .click();

    await page
    .getByTestId('field-menu-button')
    .click();

    await expect(
      page.getByTestId('menu-show')
    )
    .toBeVisible();

    await expect(
      page.getByTestId('menu-description')
    )
    .toBeVisible();

    await expect(
      page.getByTestId('menu-validation')
    )
    .toBeVisible();

  });


  test('should show description field', async ({page})=>{

    await page
    .getByTestId('palette-label')
    .filter({hasText:'Single Line'})
    .click();

    await page
    .getByTestId('field-menu-button')
    .click();

    await page
    .getByTestId('menu-description')
    .click();

    await expect(
      page.getByTestId('description-textarea')
    )
    .toBeVisible();

  });


  test('should add dropdown options', async ({page})=>{

    await page
    .getByTestId('palette-label')
    .filter({hasText:'Dropdown'})
    .click();

    await expect(
      page.getByTestId('dropdown-option')
    )
    .toBeVisible();

    await page
    .getByTestId('add-option-button')
    .click();

    await expect(
      page.getByTestId('dropdown-option')
    )
    .toHaveCount(2);

  });


  test('should remove dropdown option', async ({page})=>{

    await page
    .getByTestId('palette-label')
    .filter({hasText:'Dropdown'})
    .click();

    await expect(
      page.getByTestId('dropdown-option')
    )
    .toHaveCount(1);

    await page
    .getByTestId('remove-option')
    .click();

    await expect(
      page.getByTestId('dropdown-option')
    )
    .toHaveCount(0);

  });


  test('should enable validation option', async ({page})=>{

    await page
    .getByTestId('palette-label')
    .filter({hasText:'Single Line'})
    .click();

    await page
    .getByTestId('field-menu-button')
    .click();

    await page
    .getByTestId('menu-validation')
    .click();

    await expect(
      page.getByTestId('validation-section')
    )
    .toBeVisible();

  });


  test('should preview form', async ({page})=>{

    await page
    .getByTestId('preview-button')
    .click();

    await expect(page)
    .toHaveURL(
      /preview/
    );

  });


  test('should cancel empty builder', async ({page})=>{

    page.on('dialog', async dialog=>{

      expect(dialog.message())
      .toBe(
        'No field is selected'
      );

      await dialog.accept();

    });

    await page
    .getByTestId('cancel-button')
    .click();

  });



  test('should store selected fields in localStorage', async ({ page }) => {


  await page
    .getByTestId('palette-label')
    .filter({ hasText: 'Single Line' })
    .click();


  await page
    .getByTestId('preview-button')
    .click();


  const stored = await page.evaluate(() => {
    return localStorage.getItem('previewForm');
  });

  expect(stored).not.toBeNull();

});

});