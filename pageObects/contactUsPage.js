
class contactUsPage {
    constructor(page) {
        this.page = page;
        this.contactUsLink = page.locator("[href='/contact_us']");
        this.getInToucHeader = page.locator(".contact-form h2");
        this.getInTouchText = "Get In Touch";
        this.nameInput = page.locator("[data-qa='name']");
        this.emailInput = page.locator("[data-qa='email']")
        this.exportsInput = page.locator("[data-qa='subject']");
        this.messageInput = page.locator("[data-qa='message']");
        this.uploadfileButton = page.locator("[name='upload_file']");
        this.submitButton = page.locator("[data-qa='submit-button']");
        this.successMessageLocator = page.locator(".status");
        this.successMessageText = "Success! Your details have been submitted successfully."
    }

    async gotoContactUsPage() {
        await this.contactUsLink.click();
    }

    async fillContactUsForm(name, email, subject, message) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.exportsInput.fill(subject);
        await this.messageInput.fill(message);
    }

    async uploadFile(filePath) {
        await this.uploadfileButton.setInputFiles(filePath);
    }
}
module.exports = { contactUsPage };