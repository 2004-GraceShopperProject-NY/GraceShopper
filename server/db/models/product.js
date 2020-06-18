const Sequelize = require('sequelize');
const db = require('../db');

Sequelize.postgres.DECIMAL.parse = function(value) {
  return parseFloat(value);
};

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 100
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: '2000'
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  }
});

module.exports = Product;
