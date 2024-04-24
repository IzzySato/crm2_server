const { describe, expect, test } = require('@jest/globals');
const { addAddress } = require('../..');

describe('Database Adddress', () => {

  test('add an address', () => {
    expect(addAddress().length).toBe(0);
  });
});