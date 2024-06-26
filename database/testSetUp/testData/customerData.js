'use strict';

const date = new Date();
const { ObjectId } = require('mongodb');

const customers = [
  {
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@mail.com',
    phone: '1235672345',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f'),
    deletedAt: date
  },
  {
    firstName: 'Liam',
    lastName: 'Johnson',
    email: 'liam.johnson@mail.com',
    phone: '7782452345',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f')
  },
  {
    firstName: 'Noah',
    lastName: 'Brown',
    email: 'noah.brown@mail.com',
    phone: '1239902345',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f')
  },
  {
    firstName: 'Oliver',
    lastName: 'Jones',
    email: 'oliver.jones@mail.com',
    phone: '1235678765',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f'),
    deletedAt: date
  },
  {
    firstName: 'Michael',
    lastName: 'Garcia',
    email: 'michael.garcia@mail.com',
    phone: '1235672887',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f')
  },
  {
    firstName: 'Leo',
    lastName: 'Davis',
    email: 'leo.davis@mail.com',
    phone: '1230982345',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f'),
    deletedAt: date
  },
  {
    firstName: 'Levi',
    lastName: 'Lopez',
    email: 'levi.lopez@mail.com',
    phone: '9905672345',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f')
  },
  {
    firstName: 'Daniel',
    lastName: 'Thomas',
    email: 'daniel.thomas@mail.com',
    phone: '1235672223',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f'),
    deletedAt: date
  },
  {
    firstName: 'Mary',
    lastName: 'Moore',
    email: 'mary.moore@mail.com',
    phone: '1778672345',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f')
  },
  {
    firstName: 'Jennifer',
    lastName: 'Jackson',
    email: 'jennifer.jackson@mail.com',
    phone: '1235672009',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f')
  },
  {
    firstName: 'Barbara',
    lastName: 'Martin',
    email: 'b.martin@mail.com',
    phone: '1235672112',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f')
  },
  {
    firstName: 'Susan',
    lastName: 'Walker',
    email: 'susan.w@mail.com',
    phone: '1125672345',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f')
  },
  {
    firstName: 'Karen',
    lastName: 'Young',
    email: 'k.young@mail.com',
    phone: '1111672345',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f')
  },
  {
    firstName: 'Sarah',
    lastName: 'Hill',
    email: 'sarah.hill@mail.com',
    phone: '1235672000',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f')
  },
  {
    firstName: 'Thomas',
    lastName: 'Green',
    email: 't.green@mail.com',
    phone: '0005672345',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f')
  },
  {
    firstName: 'Richard',
    lastName: 'Adams',
    email: 'r.adams@mail.com',
    phone: '1299972345',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f')
  },
  {
    firstName: 'William',
    lastName: 'Nelson',
    email: 'w.nelson@mail.com',
    phone: '1235672333',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f')
  },
  {
    firstName: 'John',
    lastName: 'Baker',
    email: 'john.b@mail.com',
    phone: '1225672345',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f')
  },
  {
    firstName: 'Karen',
    lastName: 'Rivera',
    email: 'k.rivera@mail.com',
    phone: '8885672345',
    addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
    tags: [],
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f')
  },
];

const customer = {
  firstName: 'Alice',
  lastName: 'Brown',
  email: 'alice.brown@mail.com',
  phone: '1235672345',
  addresses: [new ObjectId('5063114bd386d8fadbd6b004')],
  tags: [],
  companyId: new ObjectId('6348acd2e1a47ca32e79f46f')
};

module.exports = {
  customers,
  customer
};