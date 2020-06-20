const router = require('express').Router();
const {Order} = require('../db/models');

router.post('/', async (req, res, next) => {
  try {
    //tech don't need req.user because only user comes to this post route
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

module.exports = router;
