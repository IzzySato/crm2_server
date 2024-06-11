const { describe, expect, test } = require('@jest/globals');
const { addAddress, addAddresses, getAddressById } = require('..');
const Address = require('../../../models/Address');
const setupDatabase = require('../../../test/setup');

setupDatabase();

describe('Address Model', () => {
  test('add a new address', async () => {
    const newAddress = {
      name: 'primary',
      line1: '123 main street',
      line2: '',
      city: 'Burnaby',
      province: 'BC',
      postcode: '123455',
      active: true,
      default: false
    };
    const { _id } = await addAddress(newAddress);
    const foundAddress = await Address.findById(_id);
    expect(foundAddress.line1).toBe('123 main street');
  });

  test('add new addresses', async () => {
    const newAddresses = [{
      name: 'primary',
      line1: '22223 main street',
      line2: '',
      city: 'Burnaby',
      province: 'BC',
      postcode: '123455',
      active: true,
      default: false
    },
    {
      name: 'primary',
      line1: '1224 robson street',
      line2: '',
      city: 'Vancouver',
      province: 'BC',
      postcode: '7880',
      active: true,
      default: false
    }];
    await addAddresses(newAddresses);
    const foundAddresses = await Address.find();
    expect(foundAddresses.length).toBe(2);
  });

  test('get an address by id', async () => {
    const newAddress = {
      name: 'primary',
      line1: '123 main street',
      line2: '',
      city: 'Burnaby',
      province: 'BC',
      postcode: '123455',
      active: true,
      default: false
    };
    const { _id } = await addAddress(newAddress);
    const address = await getAddressById(_id, false);
    expect(address._id.toString()).toBe(_id.toString());
  });
});
