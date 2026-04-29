class LoginPage{

    constructor(page)
    {
        this.page = page;
        this.loginBtn=page.locator("[href='/login']")
        this.username = page.locator("[data-qa='login-email']");
        this.password = page.locator("[data-qa='login-password']");
        this.loginButton = page.locator("[data-qa='login-button']");
        this.errorMessage = page.locator(".toast-error");
        this.logoutBtn=page.locator("[href='/logout']");
        this.errorMessage = page.locator("[action='/login'] p");
        this.loggedInUser= page.locator(".shop-menu b");
        this.deleteAccountBtn= page.locator("[href='/delete_account']");
    }

    async goto(url){
        await this.page.goto(url);
    }

    async clickLoginBtn(){
        await this.loginBtn.click();
    }
    
    async clickLogoutBtn(){
        await this.logoutBtn.click();
    }

    async login(username, password) {
      await  this.username.fill(username);
       await this.password.fill(password);
       await this.loginButton.click();
    }
}
module.exports={LoginPage};