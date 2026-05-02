const { LoginPage } = require("../pageObects/loginPage")
const { contactUsPage } = require("../pageObects/contactUsPage");

class pageManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.contactUsPage = new contactUsPage(this.page);

    }

    getLoginPage() {
        return this.loginPage;
    }

    getContactUsPage() {
        return this.contactUsPage;
    }
}
module.exports = { pageManager };