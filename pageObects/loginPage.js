class LoginPage{

    constructor(page)
    {
        this.page = page;
        this.username = page.locator("#txtUsername");
        this.password = page.locator("#txtPassword");
        this.loginButton = page.locator("[type='submit']");
    }

     async goto(url){
         await this.page.goto(url);
    }

    async login(username, password) {
      await  this.username.fill(username);
       await this.password.fill(password);
       await this.loginButton.click();
    }
}
module.exports={LoginPage};