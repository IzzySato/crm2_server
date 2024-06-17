const { describe, expect, test } = require('@jest/globals');
const { setup } = require('../../../test/setup');
const { ObjectId } = require('mongodb');
const { addCustomer, getCustomerById } = require('..');

describe('Customer Model', () => {
  beforeAll(setup.beforeAll);
  afterAll(setup.afterAll);

  const customer = {
    firstName: 'Alice',
    lastName: 'Brown',
    email: 'alice.brown@mail.com',
    phone: '123-567-2345',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f')
  };

  // test('get customer by id', async () => {
  //   const result = await getCustomerById('');
  // });

  test('add a customer', async () => {
    const result = await addCustomer(customer);
    console.log(result);
    expect(result[0].firstName).toBe(customer.firstName);
    expect(result[0].lastName).toBe(customer.lastName);
  });
});