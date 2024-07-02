'use strict';

const date = new Date();
const { ObjectId } = require('mongodb');

const jobSampleData = [
  {
    jobType: 'Home Improvments',
    note: "",
    state: "Designing",
    startDate: date,
    endDate: "",
    customerId: new ObjectId('6348acd2e1a47ca32e79f46f'),
    products: [new ObjectId('5063114bd386d8fadbd6b004')],
    companyId: new ObjectId('51e0373c6f35bd826f47e9a1')
  },
  {
    jobType: 'Kitchen Renovation',
    note: "",
    state: "Designing",
    startDate: date,
    endDate: "",
    customerId: new ObjectId('6348acd2e1a47ca32e79f46f'),
    products: [new ObjectId('5063114bd386d8fadbd6b004')],
    companyId: new ObjectId('51e0373c6f35bd826f47e9a1')
  },
  {
    jobType: 'Bathroom Renovation',
    note: "",
    state: "Construction",
    startDate: date,
    endDate: "",
    customerId: new ObjectId('6348acd2e1a47ca32e79f46f'),
    products: [new ObjectId('5063114bd386d8fadbd6b004')],
    companyId: new ObjectId('51e0373c6f35bd826f47e9a1')
  },
  {
    jobType: 'Kitchen Renovation',
    note: "",
    state: "Feasibility",
    startDate: date,
    endDate: "",
    customerId: new ObjectId('6348acd2e1a47ca32e79f46f'),
    products: [new ObjectId('5063114bd386d8fadbd6b004')],
    companyId: new ObjectId('51e0373c6f35bd826f47e9a1')
  },
];

module.exports = { jobSampleData };
