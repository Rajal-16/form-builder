import { Page, Locator, expect } from '@playwright/test';

export class FormSetupPage {
  readonly page: Page;

  readonly formName: Locator;
  readonly saveNextButton: Locator;
  readonly cancelButton: Locator;

  readonly branchSelect: Locator;
  readonly sectionSelect: Locator;
  readonly buttonNameSelect: Locator;

  readonly statusPublished: Locator;
  readonly statusUnpublished: Locator;

  readonly successMessage: Locator;
  readonly confirmMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.formName = page.getByTestId('form-name');
    this.saveNextButton = page.getByTestId('save-next-button');
    this.cancelButton = page.getByTestId('cancel-button');

    this.branchSelect = page.getByTestId('branch-select');
    this.sectionSelect = page.getByTestId('section-select');
    this.buttonNameSelect = page.getByTestId('button-name-select');

    this.statusPublished = page.getByTestId('status-published');
    this.statusUnpublished = page.getByTestId('status-unpublished');

    this.successMessage = page.getByTestId('success-message');
    this.confirmMessage = page.getByTestId('confirm-message');
  }

  
  async navigate() {
    await this.page.goto('http://localhost:4200/form-setup');
  }

  async verifyPageLoaded() {
    await expect(this.formName).toBeVisible();
  }


  async enterFormName(name: string) {
    await this.formName.fill(name);
  }

  async selectBranch(branch: string) {
    await this.branchSelect.selectOption(branch);
  }

  async selectSection(section: string) {
    await this.sectionSelect.selectOption(section);
  }

  async selectButtonName(button: string) {
    await this.buttonNameSelect.selectOption(button);
  }

  async selectPublished() {
    await this.statusPublished.check();
  }

  async selectUnpublished() {
    await this.statusUnpublished.check();
  }

  async clickSaveNext() {
    await this.saveNextButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  
  async fillForm(
    formName: string,
    branch: string,
    section: string,
    buttonName: string
  ) {
    await this.enterFormName(formName);
    await this.selectBranch(branch);
    await this.selectSection(section);
    await this.selectButtonName(buttonName);
  }

  async verifyValidationMessages() {
    await expect(
      this.page.getByText('Form Name is required')
    ).toBeVisible();

    await expect(
      this.page.getByText('Branch is required')
    ).toBeVisible();

    await expect(
      this.page.getByText('Section is required')
    ).toBeVisible();
  }

  async verifyDefaultStatus() {
    await expect(this.statusUnpublished).toHaveClass(/active-radio/);
  }

  async verifyDefaultMessages() {
    await expect(this.successMessage).toHaveValue(
      'Your Inquiry Has Been Sumited Successfully!'
    );

    await expect(this.confirmMessage).toHaveValue(
      'Are you sure you want to submit your inquiry? Please review your details before proceeding.'
    );
  }

  async verifyNavigationToBuilder() {
    await this.page.waitForURL('**/form-builder');
    await expect(this.page).toHaveURL(/form-builder/);
  }

  async verifyFormReset() {
    await expect(this.formName).toHaveValue('');
  }

  async verifyPublishedSelected() {
    await expect(this.statusPublished).toBeChecked();
  }

  async verifyUnpublishedSelected() {
    await expect(this.statusUnpublished).toBeChecked();
  }

  async getBranchOptions() {
    return await this.branchSelect.locator('option').allTextContents();
  }

  async getSectionOptions() {
    return await this.sectionSelect.locator('option').allTextContents();
  }

  async getButtonOptions() {
    return await this.buttonNameSelect.locator('option').allTextContents();
  }

  async getFormDataFromLocalStorage() {
    return await this.page.evaluate(() => {
      return JSON.parse(localStorage.getItem('formSetupData') || '{}');
    });
  }
}