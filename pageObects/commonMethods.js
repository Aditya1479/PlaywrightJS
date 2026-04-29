class CommonMethods {
  constructor(page) {
    this.page = page;
  }

  async clearCookies() {
    await this.page.context().clearCookies();
  }

  async clickOnElement(locator) {
    await locator.click();
  }

  async getElementText(locator) {
    return await locator.textContent();
}
}
module.exports = { CommonMethods };