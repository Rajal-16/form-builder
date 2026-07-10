import { Page, Locator, expect } from '@playwright/test';

export class FormBuilderPage {

  readonly page: Page;

  readonly formBuilderHeading: Locator;
  readonly customElementsTitle: Locator;
  readonly addFieldTitle: Locator;
  readonly paletteLabel: Locator;
  readonly paletteSearch: Locator;
  readonly clearSearch: Locator;
  readonly fieldCard: Locator;
  readonly fieldLabelInput: Locator;
  readonly placeholderInput: Locator;
  readonly fieldCardHeader: Locator;
  readonly requiredSwitch: Locator;
  readonly requiredCheckbox: Locator;
  readonly requiredBadge: Locator;
  readonly duplicateField: Locator;
  readonly deleteField: Locator;
  readonly fieldMenuButton: Locator;
  readonly menuShow: Locator;
  readonly menuDescription: Locator;
  readonly menuValidation: Locator;
  readonly descriptionTextarea: Locator;
  readonly validationSection: Locator;
  readonly dropdownOption: Locator;
  readonly addOptionButton: Locator;
  readonly removeOption: Locator;
  readonly previewButton: Locator;
  readonly cancelButton: Locator;
  readonly emptyBuilderMessage: Locator;


  constructor(page: Page) {

    this.page = page;

    this.formBuilderHeading = page.getByTestId('form-builder-heading');

    this.customElementsTitle = page.getByTestId('custom-elements-title');

    this.addFieldTitle = page.getByTestId('add-field-title');

    this.paletteLabel = page.getByTestId('palette-label');

    this.paletteSearch = page.getByTestId('palette-search');

    this.clearSearch = page.getByTestId('clear-search');

    this.fieldCard = page.getByTestId('field-card');

    this.fieldLabelInput = page.getByTestId('field-label-input');

    this.placeholderInput = page.getByTestId('placeholder-input');

    this.fieldCardHeader = page.getByTestId('field-card-header');

    this.requiredSwitch = page.getByTestId('required-switch');

    this.requiredCheckbox = page.getByTestId('required-checkbox');

    this.requiredBadge = page.getByTestId('required-badge');

    this.duplicateField = page.getByTestId('duplicate-field');

    this.deleteField = page.getByTestId('delete-field');

    this.fieldMenuButton = page.getByTestId('field-menu-button');

    this.menuShow = page.getByTestId('menu-show');

    this.menuDescription = page.getByTestId('menu-description');

    this.menuValidation = page.getByTestId('menu-validation');

    this.descriptionTextarea = page.getByTestId('description-textarea');

    this.validationSection = page.getByTestId('validation-section');

    this.dropdownOption = page.getByTestId('dropdown-option');

    this.addOptionButton = page.getByTestId('add-option-button');

    this.removeOption = page.getByTestId('remove-option');

    this.previewButton = page.getByTestId('preview-button');

    this.cancelButton = page.getByTestId('cancel-button');

    this.emptyBuilderMessage = page.getByTestId('empty-builder-message');

  }


  async addPaletteElement(element:string) {

    await this.paletteLabel
      .filter({hasText: element})
      .click();

  }


  async searchPaletteElement(value:string) {

    await this.paletteSearch.fill(value);

  }


  async clearPaletteSearch() {

    await this.clearSearch.click();

  }


  async updateFieldLabel(value:string) {

    await this.fieldLabelInput.fill(value);

  }


  async updatePlaceholder(value:string) {

    await this.placeholderInput.fill(value);

  }


  async expandCollapseField() {

    await this.fieldCardHeader.click();

  }


  async enableRequired() {

    await this.requiredSwitch.click();

  }


  async duplicateCurrentField() {

    await this.duplicateField.click();

  }


  async deleteCurrentField() {

    await this.deleteField.click();

  }


  async openFieldMenu() {

    await this.fieldMenuButton.click();

  }


  async openDescriptionMenu() {

    await this.menuDescription.click();

  }


  async openValidationMenu() {

    await this.menuValidation.click();

  }


  async addDropdownOption() {

    await this.addOptionButton.click();

  }


  async removeDropdownOption() {

    await this.removeOption.click();

  }


  async clickPreview() {

    await this.previewButton.click();

  }


  async clickCancel() {

    await this.cancelButton.click();

  }


  async getPreviewFormStorage() {

    return await this.page.evaluate(()=>{

      return localStorage.getItem('previewForm');

    });

  }


  async verifyPageLoaded() {

    await expect(
      this.formBuilderHeading
    ).toBeVisible();


    await expect(
      this.customElementsTitle
    ).toBeVisible();


    await expect(
      this.addFieldTitle
    ).toBeVisible();

  }


  async verifyPaletteElement(element:string) {

    await expect(
      this.paletteLabel
      .filter({hasText:element})
    )
    .toBeVisible();

  }


  async verifyElementNotVisible(element:string) {

    await expect(
      this.paletteLabel
      .filter({hasText:element})
    )
    .not
    .toBeVisible();

  }


  async verifyPreviewNavigation() {

    await expect(this.page)
      .toHaveURL(/preview/);

  }

}