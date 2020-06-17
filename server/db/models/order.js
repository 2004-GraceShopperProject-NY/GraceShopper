const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE
  },
  confirmationNum: {
    type: Sequelize.INTEGER
  },
  bought: {
    type: Sequelize.BOOLEAN,
    default: false
  }
});

module.exports = Order;
