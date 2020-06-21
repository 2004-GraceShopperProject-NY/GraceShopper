const router = require('express').Router();
const {Order, Product} = require('../db/models');

router.post('/:productId/:quantity', async (req, res, next) => {
  try {
    //tech don't need req.user because only user comes to this post route
    let product = await Product.findByPk(req.params.productId);
    if (req.user) {
      const order = await Order.addOrCreateOrder(req.user.id);
      if (order) {
        const item = await order.addItemToOrder(
          product.id,
          +req.params.quantity
        );
        console.log(item);
        res.json(item);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
