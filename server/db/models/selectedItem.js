const Sequelize = require('sequelize');
const db = require('../db');

Sequelize.postgres.DECIMAL.parse = function(value) {
  return parseFloat(value);
};

const SelectedItem = db.define('selectedItems', {
  date: {
    type: Sequelize.DATE
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
  }
});

module.exports = SelectedItem;
