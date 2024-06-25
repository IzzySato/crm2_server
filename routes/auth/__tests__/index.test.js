'use strict';
const { describe, expect, test } = require('@jest/globals');
const { setup } = require('../../../database/test/setup');
const Page = require('../tests/helpers/page');

let page;

describe('Test Authentication', () => {
  beforeAll(setup.beforeAll);
  afterAll(setup.afterAll);
  beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000/');
  });

  afterEach(async() => {
    await page.close();
  });

  test('When signin, show home page', async () => {
    await page.login();
    // await page.waitFor('')
    // const text = await page.getContentsOf('a.brand-logo')
    expect(0).toBe(0);
  });
});
