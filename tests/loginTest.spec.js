const { test, expect } = require('../fixtures/index.js');
import testData from "../utils/testData/testData.json";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto('/');
  await loginPage.clickLoginBtn();
});

test("login Test Verification " , async ({page,loginPage,assertion}) => {
    await loginPage.login(process.env.LOGIN_EMAIL, process.env.LOGIN_PASSWORD);
    //await page.waitForLoadState('networkidle');
    await assertion.verifyUrl(page,testData.expectedUrl);
    await assertion.isElementVisible(page,loginPage.logoutBtn);
});

test("login Test Verification with invalid credentials" , async ({page,loginPage,assertion}) => {
    await loginPage.login(process.env.INCORRECT_EMAIL, process.env.INCORRECT_PASSWORD);
    //await page.waitForLoadState('networkidle');
    await assertion.verifyUrl(page,"/login");
    await assertion.isElementVisible(page,loginPage.errorMessage);
});

test("Test Case 4: Logout User", async ({ page, loginPage, assertion,commonMethods }) => {
    await loginPage.login(process.env.LOGIN_EMAIL, process.env.LOGIN_PASSWORD);
    await assertion.verifyUrl(page,testData.expectedUrl);
    await assertion.isElementVisible(page,loginPage.logoutBtn);
    const elementText= await commonMethods.getElementText(loginPage.loggedInUser);
    await assertion.verifyText(loginPage.loggedInUser, elementText);
    await loginPage.clickLogoutBtn();
    await assertion.verifyUrl(page,"/login");
});

test("Register User with existing email",async({ page, loginPage, assertion, commonMethods }) => {
    await loginPage.signup(process.env.LOGIN_USERNAME, process.env.LOGIN_EMAIL);
    const elementText= await commonMethods.getElementText(loginPage.signupNameinput);
    await assertion.verifyText(loginPage.signupNameinput, elementText);
});

test("Test Case 6: Contact Us Form", async ({ page, loginPage, contactUsPage, assertion, commonMethods }) => {

    await loginPage.login(process.env.LOGIN_EMAIL, process.env.LOGIN_PASSWORD);
    await contactUsPage.gotoContactUsPage();
    await assertion.verifyUrl(page,"/contact_us");
    await assertion.verifyText(contactUsPage.getInToucHeader, contactUsPage.getInTouchText);
    await contactUsPage.fillContactUsForm(process.env.LOGIN_USERNAME, process.env.LOGIN_EMAIL, testData.subject, testData.message);
    await contactUsPage.uploadFile("D:\\playwright_js\\utils\\testData\\testUploadfile.txt");
    await commonMethods.popUpHandler(page,expect)
    await commonMethods.clickOnElement(contactUsPage.submitButton);
    await assertion.isElementVisible(page, contactUsPage.successMessageLocator, {timeout: 10000});
    await assertion.verifyText(contactUsPage.successMessageLocator, contactUsPage.successMessageText,  {timeout: 10000});
   await loginPage.homeBtn.click();
   // await new CommonMethods(page).clickOnElement(loginPage.homeBtn);
    await assertion.verifyUrl(page,"/");

})