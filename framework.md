playwright-framework/
├── tests/
│   ├── loginTest.spec.js
│   ├── contactUs.spec.js
│   └── product.spec.js
├── pageObjects/
│   ├── BasePage.js          ← all pages extend this
│   ├── LoginPage.js
│   ├── ContactUsPage.js
│   └── PageManager.js
├── fixtures/
│   └── index.js             ← custom fixtures (interview gold)
├── utils/
│   ├── CommonMethods.js
│   └── CommonAssertion.js
├── helpers/
│   ├── APIHelper.js         ← API login shortcut
│   └── DataGenerator.js     ← dynamic test data
├── testData/
│   └── testData.json
├── .env                     ← secrets, never committed
├── global-setup.js          ← login once, reuse state
└── playwright.config.js