'use strict';

const address  = {
  name: 'primary',
  line1: '11 main street',
  line2: '',
  city: 'Burnaby',
  province: 'BC',
  postcode: '123455',
  active: true,
  default: false,
};

const addresses = [
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

module.exports = {
  address,
  addresses
};