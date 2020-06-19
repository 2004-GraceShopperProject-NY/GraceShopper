const {expect} = require('chai');
const request = require('supertest');
const db = require('..');
const app = require('../../index');
const Order = db.model('order');
const User = require('./user');

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

  // describe ('Instance methods', function () {

  // })
});
