const { test: base, expect } = require('@playwright/test');
const { pageManager }     = require('../pageObects/pageManager');
const { commonAssertion } = require('../assertions/CommonAssertion');
const { commonMethods }   = require('../methods/commonMethods');
const path = require('path');

const test = base.extend({

  // Authenticated page — reuses saved login state from global-setup
  authenticatedPage: async ({ browser }, use) => {
   // const authStatePath = path.resolve(__dirname, '../testData/authState.json');
    const context = await browser.newContext();
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  // PageManager — lazy-loads any page object on demand
  pageManager: async ({ page }, use) => {
    await use(new pageManager(page));
  },

  // Individual page object fixtures (destructured in tests)
  loginPage: async ({ page }, use) => {
    const pm = new pageManager(page);
    await use(pm.getLoginPage());
  },

  contactUsPage: async ({ page }, use) => {
    const pm = new pageManager(page);
    await use(pm.getContactUsPage());
  },

  // Shared utility fixtures
  assertion: async ({ page }, use) => {
    await use(new commonAssertion(page));
  },

  commonMethods: async ({ page }, use) => {
    await use(new commonMethods(page));
  },
});

module.exports = { test, expect };
