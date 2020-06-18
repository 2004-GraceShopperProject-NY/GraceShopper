const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: Date.now()
  },
  confirmationNum: {
    type: Sequelize.INTEGER
  },
  bought: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

const createConfirmationNumber = () => {
  function getRandomizer(bottom, top) {
    return function() {
      return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
    };
  }
  let rollDie = getRandomizer(1, 6);
  let results = '';
  for (let i = 0; i < 1000; i++) {
    results += rollDie() + ' ';
  }

  return results;
};

Order.addOrCreateOrder = async function(userId) {
  const order = await Order.findOne({
    where: {
      userId,
      bought: false
    }
  });
  if (order) {
    return order;
  } else {
    const newOrder = await Order.create({
      userId,
      confirmationNum: createConfirmationNumber()
    });
    return newOrder;
  }
};

Order.prototype.addItemToOrder = async function(productId) {};

module.exports = Order;
