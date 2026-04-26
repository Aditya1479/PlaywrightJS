const {test,expect}= require('@playwright/test');
class commonAssertion{
    constructor(page){
        this.page = page;
    }   

    async verifyUrl(page, expectedUrl){
        await expect(this.page).toHaveURL(expectedUrl);
    }

    async isElementVisible(page,locator){
        await expect(locator).toBeVisible({timeout:5000});
    }
}
module.exports={commonAssertion};   