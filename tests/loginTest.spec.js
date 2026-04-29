const {test,expect}= require('@playwright/test');
const { pageManager } = require('../pageObects/pageManager');
const { commonAssertion } = require('../utils/commonAssertion');
const {CommonMethods} = require('../pageObects/commonMethods');
import testData from "../utils/testData/testData.json";

test("login Test Verification " , async ({page}) => {

    const pManager = new pageManager(page);
    const loginPage = pManager.getLoginPage();
    const Assertion = new commonAssertion(page);  
    await loginPage.goto("/");
    await loginPage.clickLoginBtn();
    await loginPage.login(testData.userEmail,testData.password);
    await page.waitForLoadState('networkidle');
    await Assertion.verifyUrl(page,testData.expectedUrl);
    await Assertion.isElementVisible(page,loginPage.logoutBtn);
});

test("login Test Verification with invalid credentials" , async ({page}) => {
    const pManager = new pageManager(page);
    const loginPage = pManager.getLoginPage();
    const Assertion = new commonAssertion(page);  
    await loginPage.goto("/");
    await loginPage.clickLoginBtn();
    await loginPage.login(testData.incorrectEmail,testData.incorrectPassword);
    await page.waitForLoadState('networkidle');
    await Assertion.verifyUrl(page,"/login");
    await Assertion.isElementVisible(page,loginPage.errorMessage);
});

test.only("Test Case 4: Logout User", async ({ page }) => {
    const pManager = new pageManager(page);
    const loginPage = pManager.getLoginPage();
    const Assertion = new commonAssertion(page);  
    await loginPage.goto("/");
    await loginPage.clickLoginBtn();
    await loginPage.login(testData.userEmail,testData.password);
    await page.waitForLoadState('networkidle');
    await Assertion.verifyUrl(page,testData.expectedUrl);
    await Assertion.isElementVisible(page,loginPage.logoutBtn);
    const elementText= await new CommonMethods(page).getElementText(loginPage.loggedInUser);
    await Assertion.verifyText(loginPage.loggedInUser, testData.username);
    await loginPage.clickLogoutBtn();
    await Assertion.verifyUrl(page,"/login");
});
