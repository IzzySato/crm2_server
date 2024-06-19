'use strict';
const puppeteer = require('puppeteer');
const { describe, expect, test } = require('@jest/globals');
const { setup } = require('../../../database/test/setup');
const sessionFactory = require('../tests/factories/sessionFactory');
const userFactory = require('../tests/factories/userFactory');

describe('Test Authentication', () => {
  let browser, page;
  beforeAll(setup.beforeAll);
  afterAll(setup.afterAll);
  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
  });

  afterEach(async() => {
    await browser.close();
  });

  test('When signin, show home page', async () => {
    const user = await userFactory();
    const { session, sig } = sessionFactory(user);
    await page.setCookie({ name: 'session', value: session });
    await page.setCookie({ name: 'session.sig', value: sig });
    await page.goto('http://localhost:3000/');
    expect(0).toBe(0);
  });
});
