import { test, expect } from '../fixtures/test-fixtures';

test.describe('Form Setup Page Tests', () => {

  test.beforeEach(async ({ formSetupPage }) => {

    await formSetupPage.navigate();

    await formSetupPage.verifyPageLoaded();

  });


  test('should load form setup page', async ({ formSetupPage }) => {

    await expect(
      formSetupPage.saveNextButton
    )
    .toBeVisible();

    await expect(
      formSetupPage.cancelButton
    )
    .toBeVisible();

  });


  test('should show validation when required fields are empty', async ({ formSetupPage }) => {

    await formSetupPage.clickSaveNext();

    await formSetupPage.verifyValidationMessages();

  });


  test('should validate form name minimum length', async ({ formSetupPage }) => {

    await formSetupPage.enterFormName('ab');

    await formSetupPage.clickSaveNext();

    await expect(
      formSetupPage.page.getByText(
        'Form Name is required'
      )
    )
    .toBeVisible();

  });


  test('should fill required fields and navigate to form builder', async ({ formSetupPage }) => {

    await formSetupPage.fillForm(

      'Student Admission Form',

      'Computer Engineering',

      'Section A',

      'Submit'

    );

    await formSetupPage.verifyDefaultStatus();

    await formSetupPage.verifyDefaultMessages();

    await formSetupPage.clickSaveNext();

    await formSetupPage.verifyNavigationToBuilder();

  });


  test('should contain correct dropdown options', async ({ formSetupPage }) => {

    const branches = await formSetupPage.getBranchOptions();

    expect(branches)
      .toContain(
        'Computer Engineering'
      );

    const sections =await formSetupPage.getSectionOptions();

    expect(sections)
      .toContain(
        'Section A'
      );

    const buttons = await formSetupPage.getButtonOptions();

    expect(buttons)
      .toContain(
        'Submit'
      );

  });


  test('should reset form after cancel', async ({ formSetupPage }) => {

    await formSetupPage.enterFormName(
      'Test Form'
    );

    await formSetupPage.clickCancel();

    await formSetupPage.verifyFormReset();

  });


  test('should select form status', async ({ formSetupPage }) => {

    await formSetupPage.selectPublished();

    await formSetupPage.verifyPublishedSelected();

    await formSetupPage.selectUnpublished();

    await formSetupPage.verifyUnpublishedSelected();

  });


  test('should save form setup data in localStorage', async ({ formSetupPage }) => {


    await formSetupPage.fillForm(

      'Student Admission Form',

      'Computer Engineering',

      'Section A',

      'Submit'

    );

    await formSetupPage.clickSaveNext();

    const formData = await formSetupPage.getFormDataFromLocalStorage();

    expect(formData.formName)
      .toBe(
        'Student Admission Form'
      );

    expect(formData.branch)
      .toBe(
        'Computer Engineering'
      );

    expect(formData.section)
      .toBe(
        'Section A'
      );

    expect(formData.buttonName)
      .toBe(
        'Submit'
      );

  });

});