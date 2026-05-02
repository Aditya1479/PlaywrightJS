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

test("Test Case 4: Logout User", async ({ page }) => {
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
    await Assertion.verifyText(loginPage.loggedInUser, elementText);
    await loginPage.clickLogoutBtn();
    await Assertion.verifyUrl(page,"/login");
});

test("Register User with existing email",async({ page }) => {
    const pManager = new pageManager(page);
    const loginPage = pManager.getLoginPage();
    const Assertion = new commonAssertion(page);  
    await loginPage.goto("/");
    await loginPage.clickLoginBtn();
    await loginPage.signup(testData.username, testData.userEmail);
    const elementText= await new CommonMethods(page).getElementText(loginPage.signupNameinput);
    await Assertion.verifyText(loginPage.signupNameinput, elementText);
});

test.only("Test Case 6: Contact Us Form", async ({ page }) => {
    const pManager = new pageManager(page);
    const loginPage = pManager.getLoginPage();
    const contactUsPage=pManager.getContactUsPage();
    const Assertion = new commonAssertion(page);
    await loginPage.goto("/");  
    await loginPage.clickLoginBtn();
    await loginPage.login(testData.userEmail,testData.password);
    await contactUsPage.gotoContactUsPage();
    await Assertion.verifyUrl(page,"/contact_us");
    await Assertion.verifyText(contactUsPage.getInToucHeader, contactUsPage.getInTouchText);
    await contactUsPage.fillContactUsForm(testData.username, testData.userEmail, testData.subject, testData.message);  
    await contactUsPage.uploadFile("D:\\playwright_js\\utils\\testData\\testUploadfile.txt");
    await new CommonMethods(page).popUpHandler(page,expect)
    await new CommonMethods(page).clickOnElement(contactUsPage.submitButton);
    await Assertion.isElementVisible(page, contactUsPage.successMessageLocator, {timeout: 10000});
    await Assertion.verifyText(contactUsPage.successMessageLocator, contactUsPage.successMessageText,  {timeout: 10000});
   await page.locator(contactUsPage.homeBtn).click();
   // await new CommonMethods(page).clickOnElement(contactUsPage.homeBtn);
    await Assertion.verifyUrl(page,"/");

})