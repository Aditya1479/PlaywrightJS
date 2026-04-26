const {test,expect}= require('@playwright/test');
const { pageManager } = require('../pageObects/pageManager');
const { commonAssertion } = require('../utils/commonAssertion');

test("login Test Verification " , async ({page}) => {
    const pManager = new pageManager(page);
    const loginPage = pManager.getLoginPage();
    const Assertion = new commonAssertion(page);  
    await loginPage.goto("/");
    await loginPage.login("admin","Aditya@3098");
    await page.waitForLoadState('networkidle');
    await Assertion.verifyUrl(page,"/client/#/dashboard");
    
});