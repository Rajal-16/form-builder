import { test, expect } from '../fixtures/test-fixtures';



test.describe('Preview Page Tests', () => {



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







  test('should open preview page',
    async ({ previewPage }) => {



    await previewPage.addSingleLineField();



    await previewPage.openPreview();



    await previewPage.verifyPreviewPage();



  });







  test('should display form title',
    async ({ previewPage }) => {



    await previewPage.addSingleLineField();



    await previewPage.openPreview();



    await previewPage.verifyFormTitle();



  });







  test('should display single line field',
    async ({ previewPage }) => {



    await previewPage.addSingleLineField();



    await previewPage.openPreview();



    await previewPage.verifySingleLineField();



  });







  test('should enter text in single line field',
    async ({ previewPage }) => {



    await previewPage.addSingleLineField();



    await previewPage.openPreview();



    await previewPage.enterSingleLineValue(
      'John Doe'
    );



    await expect(
      previewPage.singleLineInput
    )
    .toHaveValue(
      'John Doe'
    );



  });







  test('should navigate back to builder',
    async ({
      page,
      previewPage
    }) => {



    await previewPage.addSingleLineField();



    await previewPage.openPreview();



    await previewPage.clickBack();



    await expect(page)
      .toHaveURL(
        /form-builder/
      );



  });







  test('should validate required field',
    async ({ previewPage }) => {



    await previewPage.addSingleLineField();



    await previewPage.enableRequiredField();



    await previewPage.openPreview();



    await previewPage.submitForm();



    await previewPage.verifyRequiredError();



  });







  test('should submit form successfully',
    async ({
      page,
      previewPage
    }) => {



    await previewPage.addSingleLineField();



    await previewPage.openPreview();



    await previewPage.enterSingleLineValue(
      'John Doe'
    );



    page.on(
      'dialog',
      async dialog => {



        expect(
          dialog.message()
        )
        .toBe(
          'Are you sure you want to submit your inquiry? Please review your details before proceeding.'
        );



        await dialog.accept();



      });



    await previewPage.submitForm();



    await previewPage.verifySuccess();



  });







  test('should display empty form message',
    async ({ previewPage }) => {



    await previewPage.openPreview();



    await previewPage.verifyEmptyPreview();



  });







  test('should submit another response',
    async ({
      page,
      previewPage
    }) => {



    await previewPage.addSingleLineField();



    await previewPage.openPreview();



    await previewPage.enterSingleLineValue(
      'John Doe'
    );



    page.on(
      'dialog',
      async dialog => {

        await dialog.accept();

      });



    await previewPage.submitForm();



    await previewPage.verifySuccess();



    await previewPage.submitAnotherResponse();



    await previewPage.verifyPreviewFormVisible();



  });



});