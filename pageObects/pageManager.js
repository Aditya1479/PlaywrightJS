const { LoginPage } = require("../pageObects/loginPage")

class pageManager{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
    }

     getLoginPage(){
        return this.loginPage;
    }
}
module.exports = {pageManager};