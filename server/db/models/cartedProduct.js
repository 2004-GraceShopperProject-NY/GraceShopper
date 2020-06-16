const Sequelize = require('sequelize')
const db = require('../db')

const CartedProduct = db.define('cartedProducts', {
  quantity: {
    type: Sequelize.NUMBER,
    validate: {
      min: 1
    }
  }
})

module.exports = CartedProduct
