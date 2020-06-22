const router = require('express').Router();
const {Order, Product} = require('../db/models');

router.post('/', async (req, res, next) => {
  try {
    //don't need req.user because only user comes to this post route
    if (req.user) {
      const order = await Order.addOrCreateOrder(req.user.id);
      if (order) {
        const item = await order.addItemToOrder(
          req.body.product.id,
          +req.body.quantity
        );
        res.json(item);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/checkout/guest', async (req, res, next) => {
  try {
    //1. create order for guest, bought => true
    const order = await Order.create({bought: true});
    order.confirmationNum = Order.createConfirmationNumber();
    await order.save();
    // 2. add productId and quantity to order & create selecteditems
    for (let productId in req.body.cart) {
      await order.addItemToOrder(productId, req.body.cart[productId]);

      //3. update quantity in products/store inventory
      const product = await Product.findByPk(productId);
      await product.update({
        quantity:
          parseInt(product.quantity) - parseInt(req.body.cart[productId])
      });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
