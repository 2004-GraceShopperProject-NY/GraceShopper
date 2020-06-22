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

Order.createConfirmationNumber = () => {
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
    const newOrder = await Order.create();
    newOrder.confirmationNum = Order.createConfirmationNumber();
    await newOrder.save();
    await user.addOrder(newOrder);
    return newOrder;
  }
};

// add item to that order#
Order.prototype.addItemToOrder = async function(productId, quantity) {
  //guest would not have an item in selectedItem
  const item = await SelectedItem.findOne({
    where: {
      productId,
      orderId: this.id
    }
  });
  if (item) {
    return item.update({quantity: item.quantity + quantity});
  } else {
    //guest goes here
    const product = await Product.findByPk(productId);
    return SelectedItem.create({
      productId,
      orderId: this.id,
      price: product.price,
      quantity
    });
  }
};

Order.prototype.updateItems = async function(productId, quantity) {
  const item = await SelectedItem.findOne({
    where: {
      productId,
      orderId: this.id
    }
  });
  if (item) {
    return item.update({quantity});
  }
};

module.exports = Order;
