import { Page, Locator, expect } from '@playwright/test';

export class PreviewPage {

  readonly page: Page;

  readonly previewTitle: Locator;
  readonly singleLineInput: Locator;
  readonly backButton: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly fieldError: Locator;
  readonly emptyPreviewMessage: Locator;
  readonly submitAnother: Locator;
  readonly previewForm: Locator;
  readonly paletteLabel: Locator;
  readonly previewButton: Locator;
  readonly requiredSwitch: Locator;



  constructor(page: Page) {

    this.page = page;

    this.paletteLabel = page.getByTestId('palette-label');

    this.previewButton = page.getByTestId('preview-button');

    this.requiredSwitch = page.getByTestId('required-switch');

    this.previewTitle = page.getByTestId('preview-title');

    this.singleLineInput = page.getByTestId('single-line-input');

    this.backButton = page.getByTestId('back-button');

    this.submitButton = page.getByTestId('submit-button');

    this.successMessage = page.getByTestId('success-message');

    this.fieldError = page.getByTestId('field-error');

    this.emptyPreviewMessage = page.getByTestId('empty-preview-message');

    this.submitAnother = page.getByTestId('submit-another');

    this.previewForm = page.getByTestId('preview-form');

  }


  async addSingleLineField(){

    await this.paletteLabel
      .filter({
        hasText:'Single Line'
      })
      .click();

  }


  async enableRequiredField(){

    await this.requiredSwitch.click();

  }


  async openPreview(){

    await this.previewButton.click();


    await this.page.waitForURL(
      '**/preview'
    );

  }


  async enterSingleLineValue(value:string){

    await this.singleLineInput.fill(value);

  }


  async clickBack(){

    await this.backButton.click();

  }


  async submitForm(){

    await this.submitButton.click();

  }


  async submitAnotherResponse(){

    await this.submitAnother.click();

  }


  async verifyPreviewPage(){

    await expect(this.page)
      .toHaveURL(/preview/);


    await expect(
      this.previewTitle
    )
    .toBeVisible();

  }


  async verifyFormTitle(){

    await expect(
      this.previewTitle
    )
    .toContainText(
      'Student Admission Form'
    );

  }


  async verifySingleLineField(){

    await expect(
      this.singleLineInput
    )
    .toBeVisible();

  }


  async verifySuccess(){

    await expect(
      this.successMessage
    )
    .toBeVisible();

  }


  async verifyRequiredError(){

    await expect(
      this.fieldError
    )
    .toBeVisible();

  }


  async verifyEmptyPreview(){

    await expect(
      this.emptyPreviewMessage
    )
    .toBeVisible();

  }


  async verifyPreviewFormVisible(){

    await expect(
      this.previewForm
    )
    .toBeVisible();

  }

}