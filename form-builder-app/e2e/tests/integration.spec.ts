import { test, expect } from '../fixtures/test-fixtures';



test.describe('Integration Page Tests', () => {



  test.beforeEach(async ({
    page,
    formSetupPage,
    formBuilderPage,
    integrationPage
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



    await formBuilderPage.addPaletteElement(
      'Single Line'
    );



    await integrationPage.publishFromBuilder();



  });







  test('should load integration page',
    async ({ integrationPage }) => {



    await integrationPage.verifyPageLoaded();



  });







  test('should display form url',
    async ({ integrationPage }) => {



    await integrationPage.verifyFormUrl();



  });







  test('should display embed code',
    async ({ integrationPage }) => {



    await integrationPage.verifyEmbedCode();



  });







  test('should display QR code',
    async ({ integrationPage }) => {



    await integrationPage.verifyQRCode();



  });

  test('should copy form link',
    async ({
      page,
      integrationPage
    }) => {

    page.on(
      'dialog',
      async dialog => {

        expect(
          dialog.message()
        )
        .toBe(
          'form link copied sucessfully'
        );

        await dialog.accept();

      });

    await integrationPage.copyFormLink();

  });


  test('should copy embed code',
    async ({
      page,
      integrationPage
    }) => {

    page.on(
      'dialog',
      async dialog => {

        expect(
          dialog.message()
        )
        .toBe(
          'form link copied sucessfully'
        );

        await dialog.accept();

      });

    await integrationPage.copyEmbedCode();

  });


  test('should click download button',
    async ({
      page,
      integrationPage
    }) => {

    page.on(
      'dialog',
      async dialog => {

        expect(
          dialog.message()
        )
        .toBe(
          'form link copied sucessfully'
        );

        await dialog.accept();

      });

    await integrationPage.download();

  });


  test('should cancel integration page',
    async ({
      page,
      integrationPage
    }) => {

    page.on(
      'dialog',
      async dialog => {

        expect(
          dialog.message()
        )
        .toBe(
          'are you sure you want to cancel this form ?'
        );

        await dialog.accept();

      });

    await integrationPage.cancel();

    await integrationPage.verifyUrl(
      /form-setup/
    );

  });


  test('should publish form successfully',
    async ({
      page,
      integrationPage
    }) => {

    page.on(
      'dialog',
      async dialog => {

        expect(
          dialog.message()
        )
        .toBe(
          'form publish sucessfully..'
        );

        await dialog.accept();

      });

    await integrationPage.publishForm();

    await integrationPage.verifyUrl(
      /form-setup/
    );

  });

});