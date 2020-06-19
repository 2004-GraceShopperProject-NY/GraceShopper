const Sequelize = require('sequelize');
const db = require('../db');
const SelectedItem = require('./selectedItem');
const Product = require('./product');
const User = require('./user');

const Order = db.define('order', {
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: Date.now()
  },
  confirmationNum: {
    type: Sequelize.BIGINT
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
  for (let i = 0; i < 10; i++) {
    results += rollDie();
  }
  return parseInt(results);
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
    const user = await User.findByPk(userId);
    const newOrder = await Order.create({
      confirmationNum: createConfirmationNumber()
    });
    await user.addOrder(newOrder);
    return newOrder;
  }
};

// add item to that order#
Order.prototype.addItemToOrder = async function(productId, orderId) {
  const item = await SelectedItem.findOne({
    where: {
      productId,
      orderId
    }
  });
  if (item) {
    await item.update({quantity: item.quantity + 1});
  } else {
    const product = await Product.findByPk(productId);
    await SelectedItem.create({
      productId,
      orderId,
      price: product.price
    });
  }
  return item;
};

module.exports = Order;
