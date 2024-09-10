const REQUIRED_FIELDS = {
  ADDRESS: [
    { name: 'line1', type: 'string' },
    { name: 'city', type: 'string' },
    { name: 'province', type: 'string' },
  ],
  USER: [
    { name: 'firstName', type: 'string' },
    { name: 'lastName', type: 'string' },
    { name: 'email', type: 'string' },
  ],
  CUSTOMER: [
    { name: 'firstName', type: 'string' },
    { name: 'lastName', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'phone', type: 'string' }
  ],
  JOB: [
    { name: 'jobType', type: 'string' },
    { name: 'state', type: 'string' },
  ],
  PRODUCT: [
    { name: 'name', type: 'string' },
    { name: 'sku', type: 'string' },
  ]
};

module.exports = {
  REQUIRED_FIELDS,
};