const {test,expect}= require('@playwright/test');
const { pageManager } = require('../pageObects/pageManager');
const { commonAssertion } = require('../utils/commonAssertion');
import testData from "../utils/testData/testData.json";



test("login Test Verification " , async ({page}) => {
    const pManager = new pageManager(page);
    const loginPage = pManager.getLoginPage();
    const Assertion = new commonAssertion(page);  
    await loginPage.goto("/");
    await loginPage.login(testData.username,testData.password);
    await page.waitForLoadState('networkidle');
    await Assertion.verifyUrl(page,"/client/#/dashboard");
});

test("login Test Verification with invalid credentials" , async ({page}) => {
    const pManager = new pageManager(page);
    const loginPage = pManager.getLoginPage();
    const Assertion = new commonAssertion(page);  
    await loginPage.goto("/");
    await loginPage.login(testData.username,"aaaaaaaaaaaaaa");
    await page.waitForLoadState('networkidle');
    await Assertion.verifyUrl(page,"https://aditykunjir-trials80.orangehrmlive.com/securityAuthentication/retryLogin");
    await Assertion.isElementVisible(page,loginPage.errorMessage);
    await page.pause();
});