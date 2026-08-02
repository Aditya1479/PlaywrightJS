const { BasePage } = require("./BasePage");
class LoginPage extends BasePage{

    constructor(page)
    {   
        super(page);
        this.page = page;

        // Priority 2: accessibility roles (nav links/buttons have clear semantic names)
        this.loginBtn = page.getByRole('link', { name: 'Signup / Login' });
        this.logoutBtn = page.getByRole('link', { name: 'Logout' });
        this.deleteAccountBtn = page.getByRole('link', { name: 'Delete Account' });
        this.homeBtn = page.getByRole('link', { name: 'Home' });

        // Priority 1: data-qa is this site's stable test-hook attribute,
        // mapped to getByTestId() via testIdAttribute in playwright.config.js
        this.username = page.getByTestId('login-email');
        this.password = page.getByTestId('login-password');
        this.loginButton = page.getByTestId('login-button');
        this.signupNameinput = page.getByTestId('signup-name');
        this.singupEmailInput = page.getByTestId('signup-email');

        // Priority 5 (last resort): these elements carry no data-qa, id, role or label,
        // so there is no more stable locator available on this site.
        this.errorMessage = page.locator("form[action='/login'] p");
        this.signUpErrorMessage = page.locator("form[action='/signup'] p");
        this.loggedInUser = page.locator(".shop-menu b");
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
    
    async signup(name,email){
        await this.signupNameinput.fill(name);
        await this.singupEmailInput.fill(email);
    }
}
module.exports={LoginPage};