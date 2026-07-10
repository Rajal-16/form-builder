import { Page, Locator, expect } from '@playwright/test';


export class IntegrationPage {


  readonly page: Page;


  // Integration page elements

  readonly integrationHeading: Locator;

  readonly leftPanel: Locator;

  readonly rightPanel: Locator;


  readonly formUrl: Locator;

  readonly embedCode: Locator;

  readonly qrCode: Locator;


  readonly copyLinkButton: Locator;

  readonly copyCodeButton: Locator;

  readonly downloadButton: Locator;


  readonly cancelButton: Locator;

  readonly publishFormButton: Locator;



  // Builder element

  readonly publishButton: Locator;



  constructor(page: Page) {


    this.page = page;



    this.integrationHeading =
      page.getByTestId('integration-heading');


    this.leftPanel =
      page.getByTestId('left-panel');


    this.rightPanel =
      page.getByTestId('right-panel');



    this.formUrl =
      page.getByTestId('form-url');


    this.embedCode =
      page.getByTestId('embed-code');


    this.qrCode =
      page.getByTestId('qr-code');



    this.copyLinkButton =
      page.getByTestId('copy-link-button');


    this.copyCodeButton =
      page.getByTestId('copy-code-button');


    this.downloadButton =
      page.getByTestId('download-button');



    this.cancelButton =
      page.getByTestId('cancel-button');


    this.publishFormButton =
      page.getByTestId('publish-form-button');



    this.publishButton =
      page.getByTestId('publish-button');

  }





  // ==========================
  // Builder Actions
  // ==========================


  async publishFromBuilder(){


    await this.publishButton.click();


    await this.page.waitForURL(
      '**/integration/**'
    );


  }





  // ==========================
  // Integration Actions
  // ==========================


  async copyFormLink(){


    await this.copyLinkButton.click();


  }



  async copyEmbedCode(){


    await this.copyCodeButton.click();


  }



  async download(){


    await this.downloadButton.click();


  }



  async cancel(){


    await this.cancelButton.click();


  }



  async publishForm(){


    await this.publishFormButton.click();


  }





  // ==========================
  // Assertions
  // ==========================



  async verifyPageLoaded(){


    await expect(
      this.integrationHeading
    )
    .toBeVisible();



    await expect(
      this.leftPanel
    )
    .toBeVisible();



    await expect(
      this.rightPanel
    )
    .toBeVisible();


  }





  async verifyFormUrl(){


    await expect(
      this.formUrl
    )
    .toContainText(
      'http://localhost:4200/form/'
    );


  }





  async verifyEmbedCode(){


    await expect(
      this.embedCode
    )
    .toContainText(
      '<iframe'
    );


  }





  async verifyQRCode(){


    await expect(
      this.qrCode
    )
    .toBeVisible();


  }





  async verifyUrl(url:RegExp){


    await expect(
      this.page
    )
    .toHaveURL(url);


  }



}