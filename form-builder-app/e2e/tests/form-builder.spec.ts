import { test, expect } from '../fixtures/test-fixtures';

test.describe('Form Builder Tests', () => {

  test.beforeEach(async ({
    page,
    formSetupPage
  }) => {

    await formSetupPage.navigate();

    await formSetupPage.fillForm(

      'Student Admission Form',

      'Computer Engineering',

      'Section A',

      'Submit'

    );

    await formSetupPage.clickSaveNext();

    await page.waitForURL(
      '**/form-builder'
    );

  });


  test('should load form builder page', async ({ formBuilderPage }) => {

    await formBuilderPage.verifyPageLoaded();

  });


  test('should show all palette elements', async ({ formBuilderPage }) => {

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

    for (const element of elements) {

      await formBuilderPage.verifyPaletteElement(
        element
      );

    }

  });


  test('should search palette elements', async ({ formBuilderPage }) => {

    await formBuilderPage.searchPaletteElement(
      'Dropdown'
    );

    await formBuilderPage.verifyPaletteElement(
      'Dropdown'
    );

    await formBuilderPage.verifyElementNotVisible(
      'Single Line'
    );

  });

  test('should clear search text', async ({ formBuilderPage }) => {

    await formBuilderPage.searchPaletteElement(
      'Dropdown'
    );

    await formBuilderPage.clearPaletteSearch();

    await expect(
      formBuilderPage.paletteSearch
    )
    .toHaveValue('');

  });


  test('should add single line field', async ({ formBuilderPage }) => {

    await formBuilderPage.addPaletteElement(
      'Single Line'
    );

    await expect(
      formBuilderPage.fieldCard
    )
    .toHaveCount(1);

  });


  test('should expand and collapse field', async ({ formBuilderPage }) => {

    await formBuilderPage.addPaletteElement(
      'Single Line'
    );

    await expect(
      formBuilderPage.fieldLabelInput
    )
    .toBeVisible();

    await formBuilderPage.expandCollapseField();

    await expect(
      formBuilderPage.fieldLabelInput
    )
    .not
    .toBeVisible();

  });


  test('should update field label', async ({ formBuilderPage }) => {

    await formBuilderPage.addPaletteElement(
      'Single Line'
    );

    await formBuilderPage.updateFieldLabel(
      'Full Name'
    );

    await expect(
      formBuilderPage.fieldLabelInput
    )
    .toHaveValue(
      'Full Name'
    );

  });


  test('should update placeholder', async ({ formBuilderPage }) => {

    await formBuilderPage.addPaletteElement(
      'Single Line'
    );

    await formBuilderPage.updatePlaceholder(
      'Enter Name'
    );

    await expect(
      formBuilderPage.placeholderInput
    )
    .toHaveValue(
      'Enter Name'
    );

  });


  test('should enable required checkbox', async ({ formBuilderPage }) => {

    await formBuilderPage.addPaletteElement(
      'Single Line'
    );

    await formBuilderPage.enableRequired();

    await expect(
      formBuilderPage.requiredCheckbox
    )
    .toBeChecked();

    await expect(
      formBuilderPage.requiredBadge
    )
    .toBeVisible();

  });


  test('should duplicate field', async ({ formBuilderPage }) => {

    await formBuilderPage.addPaletteElement(
      'Single Line'
    );

    await formBuilderPage.duplicateCurrentField();

    await expect(
      formBuilderPage.fieldCard
    )
    .toHaveCount(2);

  });


  test('should delete field', async ({ formBuilderPage }) => {

    await formBuilderPage.addPaletteElement(
      'Single Line'
    );

    await formBuilderPage.deleteCurrentField();

    await expect(
      formBuilderPage.emptyBuilderMessage
    )
    .toBeVisible();

  });


  test('should open field menu', async ({ formBuilderPage }) => {

    await formBuilderPage.addPaletteElement(
      'Single Line'
    );

    await formBuilderPage.openFieldMenu();

    await expect(
      formBuilderPage.menuShow
    )
    .toBeVisible();

    await expect(
      formBuilderPage.menuDescription
    )
    .toBeVisible();

    await expect(
      formBuilderPage.menuValidation
    )
    .toBeVisible();

  });


  test('should show description field', async ({ formBuilderPage }) => {

    await formBuilderPage.addPaletteElement(
      'Single Line'
    );

    await formBuilderPage.openFieldMenu();

    await formBuilderPage.openDescriptionMenu();

    await expect(
      formBuilderPage.descriptionTextarea
    )
    .toBeVisible();

  });


  test('should add dropdown options', async ({ formBuilderPage }) => {

    await formBuilderPage.addPaletteElement(
      'Dropdown'
    );

    await expect(
      formBuilderPage.dropdownOption
    )
    .toBeVisible();

    await formBuilderPage.addDropdownOption();

    await expect(
      formBuilderPage.dropdownOption
    )
    .toHaveCount(2);

  });


  test('should remove dropdown option', async ({ formBuilderPage }) => {

    await formBuilderPage.addPaletteElement(
      'Dropdown'
    );

    await expect(
      formBuilderPage.dropdownOption
    )
    .toHaveCount(1);

    await formBuilderPage.removeDropdownOption();

    await expect(
      formBuilderPage.dropdownOption
    )
    .toHaveCount(0);

  });


  test('should enable validation option', async ({ formBuilderPage }) => {

    await formBuilderPage.addPaletteElement(
      'Single Line'
    );

    await formBuilderPage.openFieldMenu();

    await formBuilderPage.openValidationMenu();

    await expect(
      formBuilderPage.validationSection
    )
    .toBeVisible();

  });


  test('should preview form', async ({ formBuilderPage }) => {

    await formBuilderPage.clickPreview();

    await formBuilderPage.verifyPreviewNavigation();

  });


  test('should cancel empty builder', async ({ page, formBuilderPage }) => {

    page.on(
      'dialog',
      async dialog => {

        expect(
          dialog.message()
        )
        .toBe(
          'No field is selected'
        );

        await dialog.accept();

      });

    await formBuilderPage.clickCancel();

  });


  test('should store selected fields in localStorage', async ({ formBuilderPage }) => {

    await formBuilderPage.addPaletteElement(
      'Single Line'
    );

    await formBuilderPage.clickPreview();

    const stored = await formBuilderPage.getPreviewFormStorage();

    expect(stored)
      .not
      .toBeNull();

  });

});