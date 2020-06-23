const faker = require('faker');

const products = [
  {
    name: 'Toilet Paper',
    quantity: 100,
    price: '1500',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/9133wpvx-uL._AC_SL1500_.jpg',
    description: 'Just got real with Scott ComfortPlus Toilet paper'
  },
  {
    name: 'Mask',
    quantity: 100,
    price: '2500',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/610PmB1Ky2L._AC_SY450_.jpg',
    description: 'Fashionable masks for a reasonable price!'
  },
  {
    name: 'Hand Sanitizer',
    quantity: 50,
    price: '850',
    imageUrl:
      'https://assets1.progressivegrocer.com/files/styles/content_sm/s3/2020-03/Hand%20Sanitizer.jpg?itok=t9yY12oR',
    description: 'DESTROY those germs!!'
  },
  {
    name: 'Clorox',
    quantity: 100,
    price: '1200',
    imageUrl: 'https://m.media-amazon.com/images/I/81YT7MiwwTL._AC_UL320_.jpg',
    description: 'Helps with disinfecting'
  },
  {
    name: 'Water',
    quantity: 100,
    price: '1000',
    imageUrl: 'https://m.media-amazon.com/images/I/91XvFZyTzbL._AC_UL320_.jpg',
    description: 'Get your ionized lifewater here! 3 bottles, 500 mL each'
  },
  {
    name: 'First Aid Kit',
    quantity: 100,
    price: '3500',
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_16903962-5ae1-426e-9981-9f41ce0e5292?wid=488&hei=488&fmt=pjpeg',
    description: 'Handy dandy first aid kit - pathto improved wellness'
  },
  {
    name: 'Catan',
    quantity: 60,
    price: '5500',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81%2Bokm4IpfL._AC_SX425_.jpg',
    description:
      'Keep you and your family entertained and strategized with Catan, the Board Game.'
  },
  {
    name: 'The Game of Life',
    quantity: 80,
    price: '3000',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/91a5uQnZf2L._AC_SX425_.jpg',
    description: 'Tired of how life is turning out? Play the Game of Life!'
  }
];

const admins = [
  {
    firstName: 'Anthony',
    lastName: 'Fauci',
    email: 'anthonyfauci@curecovid.com',
    password: 'coronaslayer',
    role: 'admin'
  },
  {
    firstName: 'Andrew',
    lastName: 'Cuomo',
    email: 'andrewcuomo@nycslayscovid.gov',
    password: 'nycslayscovid',
    role: 'admin'
  },
  {
    firstName: 'Anna',
    lastName: 'GHA',
    email: 'anna@pandemicessentials.com',
    password: '12345',
    role: 'admin'
  },
  {
    firstName: 'Connie',
    lastName: 'GHA',
    email: 'connie@pandemicessentials.com',
    password: '12345',
    role: 'admin'
  },
  {
    firstName: 'Eda',
    lastName: 'GHA',
    email: 'eda@pandemicessentials.com',
    password: '12345',
    role: 'admin'
  },
  {
    firstName: 'Jennifer',
    lastName: 'GHA',
    email: 'jennifer@pandemicessentials.com',
    password: '12345',
    role: 'admin'
  }
];

function getUserSeed() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'customer'
  };
}

// 'https://i.pinimg.com/originals/b5/88/11/b588114d93f44174d71eba2839516172.jpg',

function getMasksSeed() {
  let maskColor = faker.commerce.color();
  maskColor = maskColor[0].toUpperCase().concat(maskColor.slice(1));

  let maskImage = [
    'https://i.pinimg.com/originals/b5/88/11/b588114d93f44174d71eba2839516172.jpg',
    'https://leelinesourcing.com/wp-content/uploads/2018/07/%E5%8D%AB%E7%94%9F%E5%8F%A3%E7%BD%A9.jpg'
  ];
  return {
    name: maskColor + ' Mask',
    quantity: faker.random.number(),
    price: '2500',
    imageUrl: maskImage[Math.round(Math.random())],
    description:
      'Choose a variety of colored masks to keep you survive this pandemic'
  };
}

module.exports = {
  products,
  getUserSeed,
  getMasksSeed,
  admins
};
