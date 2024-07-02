'use strict';
const { ObjectId } = require('mongodb');
const date = new Date();

const productSampleData = [
  {
    name: '1x4 Fir Floor',
    sku: '14FF',
    categoryTags: [],
    description: '1"X4" Fir Floor T&G VG Clear R/L (6 PER BNDL)',
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f'),
  },
  {
    name: '1/4 Acrylic 4x8 Clear EX F2 Optix',
    sku: '655578',
    categoryTags: [],
    description: '1/4" Acrylic 4x8 Clear EX F2 Optix',
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f'),
  },
  {
    name: 'Barrier Warning Orange 4X50',
    sku: '99986',
    categoryTags: [],
    description: 'Barrier Warning Orange',
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f'),
  },
  {
    name: 'Catch Basin Locking Outlet 3"&4" Universal',
    sku: '113455',
    categoryTags: [],
    description: 'Catch Basin Locking Outlet 3"&4" Universal',
    companyId: new ObjectId('6348acd2e1a47ca32e79f46f'),
    deletedAt: date
  },
];

module.exports = {
  productSampleData,
};
