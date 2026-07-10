import { test as base } from '@playwright/test';

import { FormSetupPage } from '../pages/FormSetupPage';
import { FormBuilderPage } from '../pages/FormBuilderPage';
import { PreviewPage } from '../pages/PreviewPage';
import { IntegrationPage } from '../pages/IntegrationPage';



type Pages = {

  formSetupPage: FormSetupPage;

  formBuilderPage: FormBuilderPage;

  previewPage: PreviewPage;

  integrationPage: IntegrationPage;

};



export const test = base.extend<Pages>({


  formSetupPage: async ({page}, use) => {
    await use(
      new FormSetupPage(page)
    );
  },


  formBuilderPage: async ({page}, use) => {
    await use(
      new FormBuilderPage(page)
    );
  },


  previewPage: async ({page}, use) => {
    await use(
      new PreviewPage(page)
    );
  },


  integrationPage: async ({page}, use) => {

    await use(
      new IntegrationPage(page)
    );
  },

});

export { expect } from '@playwright/test';