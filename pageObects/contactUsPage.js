
class contactUsPage {
    constructor(page) {
        this.page = page;

        // Priority 2: accessibility roles
        this.contactUsLink = page.getByRole('link', { name: 'Contact us' });
        this.getInToucHeader = page.getByRole('heading', { name: 'Get In Touch' });
        this.getInTouchText = "Get In Touch";

        // Priority 1: data-qa mapped to getByTestId() via testIdAttribute config
        this.nameInput = page.getByTestId('name');
        this.emailInput = page.getByTestId('email');
        this.exportsInput = page.getByTestId('subject');
        this.messageInput = page.getByTestId('message');
        this.submitButton = page.getByTestId('submit-button');

        // Priority 5 (last resort): no data-qa/id/role/label exists for these
        this.uploadfileButton = page.locator("input[name='upload_file']");
        this.successMessageLocator = page.locator(".status.alert-success");
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