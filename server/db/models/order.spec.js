const {expect} = require('chai');
const request = require('supertest');
const db = require('..');
const app = require('../../index');
const Order = db.model('order');
const User = require('./user');
const SelectedItem = require('./selectedItem');
const Product = require('./product');

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('Class method', () => {
    beforeEach(async () => {
      await Promise.all([
        User.create({
          firstName: 'Covid',
          lastName: '19',
          email: 'covid-19@gmail.com'
        })
      ]);
    });

    describe('addOrCreateOrder', function() {
      it('should create an order if there is no current order', async function() {
        await Order.addOrCreateOrder(1);

        const createdOrder = await Order.findOne({
          where: {
            userId: 1,
            bought: false
          }
        });

        expect(createdOrder.id).to.be.equal(1);
        expect(createdOrder.userId).to.be.equal(1);
      });
    });
  });

  describe('Instance methods', function() {
    describe('addItemToOrder', function() {
      it('adds product to order if selectedItem does not already exist in cart', async function() {
        await Product.create({
          name: 'mask',
          price: '1500'
        });
        const order = await Order.create({productId: 3, quantity: 1});
        await order.addItemToOrder(1, 2);

        const item = await SelectedItem.findAll({
          where: {
            orderId: 1,
            productId: 1
          }
        });

        expect(item[0].productId).to.be.equal(1);
      });

      it('increases quantity of product', async function() {
        const product = await Product.create({
          name: 'toilet paper',
          price: '2000'
        });

        const order = await Order.create({productId: 1, quantity: 2});

        await SelectedItem.create({
          productId: product.id,
          orderId: order.id,
          quantity: 2
        });

        await order.addItemToOrder(1, 3);

        const item = await SelectedItem.findAll({
          where: {
            orderId: order.id,
            productId: 1
          }
        });
        expect(item[0].quantity).to.be.equal(5);
        expect(item[0].productId).to.be.equal(1);
      });
    });
  });
});
