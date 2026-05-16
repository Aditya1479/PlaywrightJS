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
 async popUpHandler(page, expect) {
  page.on('dialog', async (dialog) => { 
    expect(dialog.type()).toContain('confirm');
    expect(dialog.message()).toContain('Press OK to proceed!');
    await dialog.accept();              
  });
}
}
module.exports = { CommonMethods };