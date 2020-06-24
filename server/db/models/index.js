const User = require('./user');
const SelectedItem = require('./selectedItem');
const Product = require('./product');
const Order = require('./order');

User.hasMany(Order);
Product.belongsToMany(Order, {through: SelectedItem});
Order.belongsToMany(Product, {through: SelectedItem});

module.exports = {
  User,
  SelectedItem,
  Product,
  Order
};
