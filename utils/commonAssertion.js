const {test,expect}= require('@playwright/test');
class commonAssertion{
    constructor(page){
        this.page = page;
    }   

    async verifyUrl(page, expectedUrl){
        await expect(this.page).toHaveURL(expectedUrl);
    }
}
module.exports={commonAssertion};   