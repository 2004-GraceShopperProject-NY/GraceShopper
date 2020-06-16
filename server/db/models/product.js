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
    default: 100
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    default: '20.00'
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  }
});

module.exports = Product;
