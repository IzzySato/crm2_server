const { describe, expect, test } = require('@jest/globals');
const { addAddress, getAddressById } = require('..');
const { setup } = require('../../../test/setup');
const Address = require('../../../models/Address');

describe('Test Address Database Functions', () => {
  beforeAll(setup.beforeAll);
  afterAll(setup.afterAll);

  const newAddress = {
    name: 'primary',
    line1: '11 main street',
    line2: '',
    city: 'Burnaby',
    province: 'BC',
    postcode: '123455',
    active: true,
    default: false,
  };

  test('add a new address', async () => {
    const result = await addAddress(newAddress);
    expect(result[0].line1).toBe(newAddress.line1);
  });

  test('add new addresses', async () => {
    const newAddresses = [
      {
        name: 'primary',
        line1: '22223 main street',
        line2: '',
        city: 'Burnaby',
        province: 'BC',
        postcode: '123455',
        active: true,
        default: false,
      },
      {
        name: 'primary',
        line1: '1224 robson street',
        line2: '',
        city: 'Vancouver',
        province: 'BC',
        postcode: '7880',
        active: true,
        default: false,
      },
    ];
    const result = await addAddress(newAddresses);
    expect(result.length).toBe(2);
  });

  test('get an address by id', async () => {
    const { _id } = await Address.create(newAddress);
    const result = await getAddressById(_id);
    expect(result.line1).toBe('11 main street');
  });
});

