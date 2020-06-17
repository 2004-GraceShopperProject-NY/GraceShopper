'use strict';

const db = require('../server/db');
const {User, Product, SelectedItem, Order} = require('../server/db/models');

const products = [
  {
    name: 'Toilet Paper',
    quantity: 100,
    price: 15.0,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/9133wpvx-uL._AC_SL1500_.jpg',
    description: 'Just got real with Scott ComfortPlus Toilet paper'
  },
  {
    name: 'Mask',
    quantity: 100,
    price: 25.0,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/610PmB1Ky2L._AC_SY450_.jpg',
    description: 'Fashionable masks for a reasonable price!'
  },
  {
    name: 'Hand Sanitizer',
    quantity: 50,
    price: 8.5,
    imageUrl:
      'https://assets1.progressivegrocer.com/files/styles/content_sm/s3/2020-03/Hand%20Sanitizer.jpg?itok=t9yY12oR',
    description: 'DESTROY those germs!!'
  }
];

const users = [
  {
    firstName: 'Anthony',
    lastName: 'Fauci',
    email: 'anthonyfauci@curecovid.com',
    password: 'coronaslayer',
    role: 'customer'
  },
  {
    firstName: 'Andrew',
    lastName: 'Cuomo',
    email: 'andrewcuomo@nycslayscovid.gov',
    password: 'nycslayscovid',
    role: 'admin'
  }
];

const orders = [
  {
    date: new Date(),
    confirmationNum: 10000,
    bought: false
  }
];

async function seed() {
  try {
    await db.sync({force: true});
    console.log('db synced!');

    await Promise.all(
      products.map(product => {
        return Product.create(product);
      })
    );

    await Promise.all(
      users.map(user => {
        return User.create(user);
      })
    );

    await Promise.all(
      orders.map(order => {
        return Order.create(order);
      })
    );

    const order = await Order.findByPk(1);
    const product1 = await Product.findByPk(1);
    const product2 = await Product.findByPk(2);
    await order.addProduct(product1, {
      through: {
        date: new Date(),
        quantity: 8,
        price: 5.5
      }
    });
    await order.addProduct(product2, {
      through: {
        date: new Date(),
        quantity: 5,
        price: 12.75
      }
    });

    console.log(`seeded successfully`);
  } catch (error) {
    console.log(error);
  }
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
