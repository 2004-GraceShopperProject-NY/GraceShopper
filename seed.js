const {User, Product} = require('./server/db/models');

const products = [
  {
    name: 'Toilet Paper',
    quantity: 100,
    price: '15.00',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/9133wpvx-uL._AC_SL1500_.jpg',
    description: 'Just got real with Scott ComfortPlus Toilet paper'
  },
  {
    name: 'Mask',
    quantity: 100,
    price: '25.00',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/610PmB1Ky2L._AC_SY450_.jpg',
    description: 'Fashionable masks for a reasonable price!'
  },
  {
    name: 'Hand Sanitizer',
    quantity: 50,
    price: '8.50',
    imageUrl:
      'https://assets1.progressivegrocer.com/files/styles/content_sm/s3/2020-03/Hand%20Sanitizer.jpg?itok=t9yY12oR',
    description: 'DESTROY those germs!!'
  }
];

const seed = () => {};

module.exports = seed;
