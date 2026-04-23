const {test,expect}= require('@playwright/test');
const { pageManager } = require('../pageObects/pageManager');

test("login Test Verification " , async ({page}) => {
    const pManager = new pageManager(page);

    const loginPage = pManager.getLoginPage();

    await loginPage.goto("https://aditykunjir-trials80.orangehrmlive.com/auth/login");
    await loginPage.login("admin","Aditya@3098");
});