'use strict';

const { ObjectId } = require('mongodb');

const company = {
  businessName: 'test company name',
  logoImg: null,
  addressIds: [new ObjectId('51e0373c6f35bd826f47e9a1')],
  phone: '123-456-2456',
  tradeType: ['concrete']
};

module.exports = {
  company
};